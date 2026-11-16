# Hawaa — PRD

## Original problem statement
Hawaa. Tackling period poverty. Corporates sponsor cotton organic menstrual products for female employees and support women and girls in vulnerable neighborhoods. Color palette is off white, baby pink and baby blue. Soft marshmallow clouds representing the cotton products. Pretty blue skies with pink.

User choices: landing page + corporate sponsorship enquiry form (DB), admin view of enquiries, shop page (buy one, gift one), open donations button. Sections: Mission, how it works, corporate packages, community impact, contact. No real figures/logo yet; partnering with Sponsor area left open until partners are confirmed.

## Architecture
- FastAPI (server.py, catalog.py, setup_stripe.py) + MongoDB (enquiries, users, login_attempts, payment_transactions)
- Stripe claimable sandbox (Flow A, NL account, EUR). Tax mode: Stripe calculates only (automatic tax on shop; donations untaxed)
- JWT admin auth (httpOnly cookies, seeded admin, no public signup, brute-force lockout)
- React + framer-motion + lenis; Fraunces (SOFT axis) + Figtree; images generated & stored in /public/images

## Personas
- Corporate HR/CSR lead (sponsorship), individual buyer (BOGO shop), donor, Hawaa admin

## Implemented (2026-11-02)
- Landing: kinetic masked hero with mouse/scroll-parallax 3D clouds, editorial marquee, scroll-lit manifesto, vision/mission, stats bento (NL 25%/21%, Amsterdam 14% vs 27%), how it works (clip-path reveal), product spotlight, 3 corporate packages (price on request), 4-phase roadmap + €15–20k target, funding block (sponsor area left open), founder quote, enquiry form
- Shop /shop: 3 BOGO products, cart (localStorage per browser), Stripe checkout
- Donate dialog (global nav + footer): €10/25/50/100 tiers or custom (min €5)
- Payment success/cancel pages with status polling
- Admin /admin: enquiries table with status updates, orders & donations table
- Cotton Cluster SVG mark (asymmetric scalloped cloud, centered heart) + favicon + icon family (favicon.ico, apple-touch-icon 180, 192/512 PNG, 128px signature PNG, 1024px full-bleed social square, /icon-preview.html)

## Placeholders
- Product prices (€8.95/€7.95/€15.95), pack contents, package tiers & names, email hallo@hawaa.world

## Backlog
- P1: email notification to admin on new enquiry; CSV export
- P1: real figures/impact counter once pilot runs
- P2: NL language toggle, partner logo wall, sponsor portal
