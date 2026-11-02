from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import logging
from datetime import datetime, timezone, timedelta
from typing import Annotated, List, Literal, Optional

import bcrypt
import jwt
import stripe
from bson import ObjectId
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request, Response
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

from catalog import PRODUCTS, DONATION_TIERS, CURRENCY

client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]
stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
JWT_ALGORITHM = "HS256"
TAX_MODE = "calc_only"

app = FastAPI()
api = APIRouter(prefix="/api")
logger = logging.getLogger("hawaa")
logging.basicConfig(level=logging.INFO)

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]


def now():
    return datetime.now(timezone.utc)


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    @classmethod
    def from_mongo(cls, doc):
        return cls.model_validate(doc)

    def to_mongo(self):
        d = self.model_dump(by_alias=True, exclude={"id"})
        return d


class EnquiryIn(BaseModel):
    company: str = Field(min_length=1, max_length=200)
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)
    employees: Optional[str] = Field(default="", max_length=40)
    package: Optional[str] = Field(default="", max_length=60)
    message: Optional[str] = Field(default="", max_length=3000)


class Enquiry(BaseDocument, EnquiryIn):
    status: Literal["new", "contacted", "in_progress", "closed"] = "new"
    created_at: datetime = Field(default_factory=now)


class EnquiryStatus(BaseModel):
    status: Literal["new", "contacted", "in_progress", "closed"]


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class CartItem(BaseModel):
    lookup_key: str
    quantity: int = Field(1, ge=1, le=50)


class CheckoutIn(BaseModel):
    items: List[CartItem] = Field(min_length=1, max_length=10)
    origin_url: str


class DonationIn(BaseModel):
    tier: Optional[int] = None
    custom_amount: Optional[float] = Field(default=None, ge=5, le=10000)
    origin_url: str


# ---------- auth ----------
def hash_password(p):
    return bcrypt.hashpw(p.encode(), bcrypt.gensalt()).decode()


def verify_password(p, h):
    return bcrypt.checkpw(p.encode(), h.encode())


def make_token(uid, email, kind, delta):
    payload = {"sub": uid, "email": email, "type": kind, "exp": now() + delta}
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


def set_auth_cookies(resp: Response, uid, email):
    resp.set_cookie("access_token", make_token(uid, email, "access", timedelta(minutes=15)),
                    httponly=True, secure=True, samesite="none", max_age=900, path="/")
    resp.set_cookie("refresh_token", make_token(uid, email, "refresh", timedelta(days=7)),
                    httponly=True, secure=True, samesite="none", max_age=604800, path="/")


async def current_admin(request: Request):
    token = request.cookies.get("access_token")
    auth = request.headers.get("Authorization", "")
    if not token and auth.startswith("Bearer "):
        token = auth[7:]
    if not token:
        raise HTTPException(401, "Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid token")
    if payload.get("type") != "access":
        raise HTTPException(401, "Invalid token type")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user or user.get("role") != "admin":
        raise HTTPException(403, "Admins only")
    return {"id": str(user["_id"]), "email": user["email"], "name": user.get("name"), "role": user["role"]}


@api.post("/auth/login")
async def login(body: LoginIn, request: Request, response: Response):
    email = body.email.lower()
    ident = f"{request.client.host if request.client else 'x'}:{email}"
    att = await db.login_attempts.find_one({"identifier": ident})
    if att and att.get("count", 0) >= 5 and att.get("locked_until") and att["locked_until"].replace(tzinfo=timezone.utc) > now():
        raise HTTPException(429, "Too many attempts. Try again in 15 minutes.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password_hash"]):
        count = (att or {}).get("count", 0) + 1
        upd = {"count": count}
        if count >= 5:
            upd["locked_until"] = now() + timedelta(minutes=15)
        await db.login_attempts.update_one({"identifier": ident}, {"$set": upd}, upsert=True)
        raise HTTPException(401, "Invalid email or password")
    await db.login_attempts.delete_many({"identifier": ident})
    uid = str(user["_id"])
    set_auth_cookies(response, uid, email)
    return {"id": uid, "email": email, "name": user.get("name"), "role": user.get("role")}


@api.get("/auth/me")
async def me(admin=Depends(current_admin)):
    return admin


@api.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/", secure=True, samesite="none")
    response.delete_cookie("refresh_token", path="/", secure=True, samesite="none")
    return {"ok": True}


@api.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(401, "No refresh token")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid refresh token")
    if payload.get("type") != "refresh":
        raise HTTPException(401, "Invalid token type")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(401, "User not found")
    set_auth_cookies(response, str(user["_id"]), user["email"])
    return {"ok": True}


# ---------- enquiries ----------
@api.get("/")
async def root():
    return {"message": "Hawaa API"}


@api.post("/enquiries")
async def create_enquiry(body: EnquiryIn):
    enq = Enquiry(**body.model_dump())
    res = await db.enquiries.insert_one(enq.to_mongo())
    return {"id": str(res.inserted_id), "ok": True}


@api.get("/admin/enquiries")
async def list_enquiries(admin=Depends(current_admin)):
    docs = await db.enquiries.find().sort("created_at", -1).to_list(1000)
    return [Enquiry.from_mongo(d).model_dump() for d in docs]


@api.patch("/admin/enquiries/{eid}")
async def update_enquiry(eid: str, body: EnquiryStatus, admin=Depends(current_admin)):
    if not ObjectId.is_valid(eid):
        raise HTTPException(404, "Not found")
    res = await db.enquiries.update_one({"_id": ObjectId(eid)}, {"$set": {"status": body.status}})
    if res.matched_count == 0:
        raise HTTPException(404, "Not found")
    return {"ok": True}


@api.get("/admin/payments")
async def list_payments(admin=Depends(current_admin)):
    docs = await db.payment_transactions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


# ---------- shop & payments ----------
@api.get("/shop/products")
async def shop_products():
    return [{k: p[k] for k in ("lookup_key", "name", "amount", "description", "image", "tint")} for p in PRODUCTS]


def create_session(kwargs, taxed):
    if taxed and TAX_MODE == "calc_only":
        try:
            return stripe.checkout.Session.create(**kwargs, automatic_tax={"enabled": True}, billing_address_collection="required")
        except stripe.error.InvalidRequestError as e:
            logger.warning("automatic tax unavailable, falling back: %s", e.user_message)
    return stripe.checkout.Session.create(**kwargs)


async def record(session, kind, amount, meta):
    await db.payment_transactions.insert_one({
        "session_id": session.id, "kind": kind, "amount": amount, "currency": CURRENCY,
        "meta": meta, "status": "initiated", "payment_status": "pending",
        "created_at": now(), "updated_at": now(),
    })


def urls(origin):
    return dict(success_url=f"{origin}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=f"{origin}/payment/cancel")


@api.post("/payments/checkout")
async def checkout(body: CheckoutIn):
    valid = {p["lookup_key"]: p for p in PRODUCTS}
    line_items, total = [], 0
    for it in body.items:
        if it.lookup_key not in valid:
            raise HTTPException(400, "Unknown product")
        prices = stripe.Price.list(lookup_keys=[it.lookup_key], active=True, limit=1).data
        if not prices:
            raise HTTPException(500, f"Price not found: {it.lookup_key}")
        line_items.append({"price": prices[0].id, "quantity": it.quantity})
        total += prices[0].unit_amount * it.quantity
    meta = {"items": ",".join(f"{i.lookup_key}x{i.quantity}" for i in body.items), "type": "shop"}
    session = create_session(dict(line_items=line_items, mode="payment", metadata=meta,
                                  shipping_address_collection={"allowed_countries": ["NL", "BE", "DE"]},
                                  **urls(body.origin_url)), taxed=True)
    await record(session, "shop", total / 100.0, meta)
    return {"checkout_url": session.url, "session_id": session.id}


@api.post("/payments/donate")
async def donate(body: DonationIn):
    meta = {"type": "donation"}
    if body.tier is not None:
        if body.tier not in DONATION_TIERS:
            raise HTTPException(400, "Unknown tier")
        price = stripe.Price.list(lookup_keys=[f"donation_{body.tier // 100}"], active=True, limit=1).data
        if not price:
            raise HTTPException(500, "Donation price missing")
        items, cents = [{"price": price[0].id, "quantity": 1}], body.tier
    elif body.custom_amount is not None:
        cents = int(round(body.custom_amount * 100))
        items = [{"price_data": {"currency": CURRENCY, "unit_amount": cents,
                                 "product_data": {"name": "Donation to Hawaa"}}, "quantity": 1}]
    else:
        raise HTTPException(400, "Choose an amount")
    session = create_session(dict(line_items=items, mode="payment", metadata=meta, submit_type="donate",
                                  **urls(body.origin_url)), taxed=False)
    await record(session, "donation", cents / 100.0, meta)
    return {"checkout_url": session.url, "session_id": session.id}


@api.get("/payments/status/{session_id}")
async def payment_status(session_id: str):
    rec = await db.payment_transactions.find_one({"session_id": session_id})
    if not rec:
        raise HTTPException(404, "Transaction not found")
    if rec.get("payment_status") != "paid":
        try:
            s = stripe.checkout.Session.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                await db.payment_transactions.update_one(
                    {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                    {"$set": {"status": "completed", "payment_status": "paid",
                              "stripe_payment_intent_id": s.payment_intent, "updated_at": now()}})
                rec = await db.payment_transactions.find_one({"session_id": session_id})
        except stripe.error.StripeError:
            pass
    return {"session_id": rec["session_id"], "status": rec["status"], "payment_status": rec["payment_status"], "kind": rec.get("kind")}


@api.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(payload, request.headers.get("stripe-signature", ""), STRIPE_WEBHOOK_SECRET)
    except (stripe.error.SignatureVerificationError, ValueError):
        raise HTTPException(400, "Invalid signature")
    obj, t = event["data"]["object"], event["type"]
    if t == "checkout.session.completed":
        await db.payment_transactions.update_one(
            {"session_id": obj["id"], "payment_status": {"$ne": "paid"}},
            {"$set": {"status": "completed", "payment_status": obj.get("payment_status", "paid"),
                      "stripe_payment_intent_id": obj.get("payment_intent"), "updated_at": now()}})
    elif t == "checkout.session.expired":
        await db.payment_transactions.update_one({"session_id": obj["id"]},
            {"$set": {"status": "expired", "payment_status": "expired", "updated_at": now()}})
    elif t == "charge.refunded":
        await db.payment_transactions.update_one({"stripe_payment_intent_id": obj.get("payment_intent")},
            {"$set": {"status": "refunded", "payment_status": "refunded", "updated_at": now()}})
    return {"status": "ok"}


app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    email = os.environ["ADMIN_EMAIL"].lower()
    if await db.users.find_one({"email": email}) is None:
        await db.users.insert_one({"email": email, "password_hash": hash_password(os.environ["ADMIN_PASSWORD"]),
                                   "name": "Hawaa Admin", "role": "admin", "created_at": now()})


@app.on_event("shutdown")
async def shutdown():
    client.close()
