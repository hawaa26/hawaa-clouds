import os
from pathlib import Path
from dotenv import load_dotenv
import stripe
from catalog import PRODUCTS, DONATION_TIERS, CURRENCY

load_dotenv(Path(__file__).parent / ".env")
stripe.api_key = os.environ["STRIPE_SECRET_KEY"]

ENTRIES = [
    {**p, "prices": [{"lookup_key": p["lookup_key"], "amount": p["amount"]}]} for p in PRODUCTS
] + [{
    "emergent_product_id": "hawaa_donation",
    "name": "Donation to Hawaa",
    "tax_code": None,
    "prices": [{"lookup_key": f"donation_{a // 100}", "amount": a} for a in DONATION_TIERS],
}]


def get_or_create_product(entry):
    for p in stripe.Product.list(active=True).auto_paging_iter():
        if p.to_dict().get("metadata", {}).get("emergent_product_id") == entry["emergent_product_id"]:
            return p
    kwargs = dict(name=entry["name"], metadata={"managed_by": "emergent", "emergent_product_id": entry["emergent_product_id"]})
    if entry.get("tax_code"):
        kwargs["tax_code"] = entry["tax_code"]
    return stripe.Product.create(**kwargs)


for entry in ENTRIES:
    product = get_or_create_product(entry)
    for p in entry["prices"]:
        existing = stripe.Price.list(lookup_keys=[p["lookup_key"]], active=True, limit=1).data
        if existing and (existing[0].unit_amount != p["amount"] or existing[0].currency != CURRENCY):
            stripe.Price.modify(existing[0].id, active=False)
            existing = []
        if not existing:
            stripe.Price.create(product=product.id, unit_amount=p["amount"], currency=CURRENCY,
                                lookup_key=p["lookup_key"], transfer_lookup_key=True)
        print("ok", p["lookup_key"])
