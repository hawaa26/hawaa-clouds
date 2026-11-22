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
- Cloud & Heart SVG mark (original soft cumulus cloud, heart centered) + favicon + icon family (favicon.ico, apple-touch-icon 180, 192/512 PNG, 128px signature PNG, 1024px full-bleed social square, /icon-preview.html)

## Placeholders
- Product prices (€8.95/€7.95/€15.95), pack contents, package tiers & names, email hallo@hawaa.world

## Export kit (added 2026-11-16)
- /brand.html — brand kit page (logo variants, colors, fonts, icon downloads, usage rules)
- /social-pack.html — 6 social graphics with captions + download buttons + /hawaa-social-pack.zip
- /social-raw.html — editable HTML source of the graphics; /app/exports mirrors the final files
- /icon-preview.html — icon family preview

## 2026-11-22 updates v7
- Logo replaced with user's uploaded artwork (arch + wordmark + CONSCIOUS CARE) everywhere: menu, footer, favicon, icons, social square, brand kit.
- Baby blue unified to #CFE6F7 everywhere; Blush accent changed to #E8F3FB (soft baby blue from Open Heaven card); rose #C56B97; deep sky #3F5E8A.
- 'Open Heaven' package renamed 'Above the Clouds'.
- 'soft as a cloud' highlight removed from hero; only 'For every woman.' stays accented.
- Founder quote merged into Mission section (name meaning + niece story together); separate Founder section removed.
- Packages section now states: individuals can also buy products (/shop) or donate directly (opens donate dialog).

## 2026-11-22 updates v6
- Logo replaced with the user's uploaded Hawaa artwork (arch + wordmark + CONSCIOUS CARE). Used in menu, footer, favicon and full icon family (arch art only inside icons); original file kept at /logo-hawaa.jpeg.
- Baby blue unified to #CFE6F7 everywhere (removed #D9ECF9 and duplicate swatch); Deep Sky is the single dark accent.
- Brand kit updated: shows uploaded full logo, app icon, social square; wordmark card removed (custom lettering); colors/fonts/usage rules refreshed.

## 2026-11-22 updates v5
- Ink color replaced: #46516B → #3F5E8A (Deep Sky, softer muted blue, no longer near-black); Mist #8A93A5 → #8FA0B8. Footer/CTA dark is now Deep Sky.
- 'The Hawaa solution' removed; section now says 'The given must be quality — organic, chlorine-free and gentle.'
- Stat chips (25%/21%/40%) removed from packages; only the 40% copy remains. Page even shorter.
- Packages: Sunrise / Blush Sky / Open Heaven with 'Price on request', features mention 40%.

## 2026-11-22 updates v4
- Page shortened further: stats bento (Challenge section) and community photo removed; mission collapsed to manifesto + 2-line intro; stats kept as 3 inline chips in packages (25% / 21% / 40%); Founder kept as one short line.
- Section paddings trimmed (py-28/40 → py-24/32, marquee py-6).
- Home now: Hero → Marquee → Mission → How it works → Product → Packages (with stats) → Founder → Contact.

## 2026-11-22 updates v3
- Colors: warm brown replaced with pastel palette only — Pearl #FAF8F6 bg, Moonless Sky #46516B ink, Mist #8A93A5 body, Rose #C56B97, Sky Deep #5A8FAE. All browns gone.
- Brand kit updated (Pearl, Moonless Sky, Mist names + DM Serif Display/Outfit fonts + code download note).
- Social pack + ZIP re-exported in pastel palette; all '100%' mentions removed from graphics/captions.

## 2026-11-22 updates v2
- Stats bento trimmed to 3 cards (25% / 21% / 40%); cotton photo & Amsterdam card removed.
- Community photo removed from How it works (replaced with quote card).
- Contact email now a real mailto link: hallo@hawaa.world. KVK 42226651 added to footer.
- '100%' removed from organic cotton mentions.
- Name meaning expanded: Hawaa = life/Eve AND heaven, sky, air (weightless comfort) — in mission manifesto.
- 40% copy: donated as products to women in vulnerable communities.
- Fonts changed Fraunces+Figtree → DM Serif Display + Outfit (no more wiggly letters). Kept /fonts.html for other options.
- Colors: purple-ish ink #241E3A replaced with warm brown #4A3628; soft gray #5A5470 → #8A7A6C; rose #B83A6F → #C4558F; deep blue #2F6FA6 → #3D6E8F. Pastel palette only.

## 2026-11-22 updates
- Removed floating/parallax CSS clouds everywhere; hero keeps only the pink-sky photo (logo cloud kept).
- Removed Roadmap and Impact sections from Home; 40% community give-back now stated in Packages + stats bento.
- Buy-one-gift-one replaced by 40% model (eenmanszaak): 40% of every sale and sponsorship goes to vulnerable communities & neighbourhoods. Copy updated in hero, marquee, how-it-works, packages, footer, shop link, stats, social pack.
- Packages renamed Seedling/Cumulus/Open Sky → Sunrise / Blush Sky / Open Heaven.
- Fonts exploration page at /fonts.html (6 pairings).

## Backlog
- P1: email notification to admin on new enquiry; CSV export
- P1: real figures/impact counter once pilot runs
- P2: NL language toggle, partner logo wall, sponsor portal
