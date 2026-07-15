# Handoff: Vyella® Website Redesign (v3 — "calm, colorful, clean")

## Overview

Vyella is a Dubai/UAE studio making hyper-realistic **handmade dessert candles**. This package is a redesign of the full marketing + light-commerce site, moving from the previous loud "sticker / neo-brutalist" look to a **calm, colorful-but-clean** aesthetic (inspired by the calm-yet-colorful feel of shop.waggish.ae) **while keeping Vyella's brand identity** (hot pink + forest green, dessert-candle voice, EN/AR bilingual).

The site is **bilingual (English + Arabic, full RTL)** and **multi-currency (AED / USD / EGP)**.

> ### ⭐ Latest revision (current)
>
> - **Logo is now a real image**, not type. The wordmark in the nav, hero, and footer is the supplied Vyella logo PNG (with the flame accent + ®). Use `src/assets/vyella-logo.png` on light backgrounds and `src/assets/vyella-logo-cream.png` on the dark footer. **Bagel Fat One is no longer used** for the live wordmark (kept in the font bundle for reference only).
> - **Real product photography** is now wired in — 12 hero-on-white product shots in `src/assets/prod-*.png` (replacing the old `products.jpg` montage).
> - **Catalogue = 12 products, flat 50 AED each, single size (3 oz / 85 g, ~15–20 hr burn).** Prices/sizes are intentionally uniform; the studio prices per line, not per size. (Per-product sizes can be reintroduced later via the `sizes` array / a per-product field.)
> - **Founded 2026** — hero eyebrow reads `EST. 2026`, stats band reframed as a fresh launch.
> - **Online studio, no physical address.** Based in **Dubai, UAE**; ships across **all the UAE + Egypt**. Contact/footer/FAQ/announcement copy and the JSON-LD reflect this.

## About the Design Files

The files in `src/` are a **design reference built in HTML/CSS + React-via-Babel** — a working prototype that shows the intended look, layout, copy, and interactions. **They are not meant to be shipped as-is.** The task is to **recreate this design in the target codebase** (e.g. a real Next.js/React, Vue, Shopify/Liquid, or whatever the team uses), following that codebase's established patterns, component library, i18n, and data layer. If there is no codebase yet, pick the framework that best fits a content + light-commerce site (Next.js or a Shopify theme are both reasonable) and implement the design there.

The prototype renders React from CDN with in-browser Babel (fine for a mock, **not** for production). In a real build: precompile, split into real components, and replace the hard-coded `content.js` object with a CMS / i18n source.

## Fidelity

**High-fidelity.** Colors, typography, spacing, radii, shadows, and interactions are final and intentional. Recreate them precisely using the tokens in `src/colors_and_type.css`. All exact values are also listed under **Design Tokens** below.

---

## The two directions (A / B)

The prototype ships with a floating **"LOOK" switcher** (bottom-right) that toggles `data-dir` on `<html>` between two finished directions. **Decide with the client which one to ship, then drop the switcher** (it's purely a presentation device — the `DirSwitch` component in `app.jsx` and the `.dirswitch` styles).

- **`data-dir="a"` · STUDIO** — editorial / near-monochrome. Backgrounds alternate cream/white; pink & green appear only as small accents (eyebrows, links, primary button, one dark feature band). The most minimal, "boutique" option.
- **`data-dir="b"` · PATISSERIE** _(default)_ — warm cream with **soft pink/green tinted section bands** and a touch more color energy. Closest to the colorful-calm reference.

Everything below is shared by both directions unless noted. The only differences are background tones, heading weight (A=500, B=600), and card border/shadow treatment — all expressed as CSS variables overridden under `html[data-dir="a"]` / `html[data-dir="b"]` in `colors_and_type.css`.

---

## Screens / Views

The app is a hash-router (`app.jsx`):

- `#/` and `#/shop` → **Home** (one long page; `#/shop` just scrolls to the shop section)
- `#/candle/:id` → **Product detail (PDP)**
- `#/customise` → **Customise builder**
- In-page anchors: `#about`, `#process`, `#contact`, etc.

### Global chrome (`TopBar` + `Footer`)

- **Announcement bar**: full-width dark (`--vy-ink`) marquee, JetBrains Mono 11.5px, uppercase, 0.16em tracking, scrolls ~48s linear (reverses in RTL). Copy from `content.announce`.
- **Utility bar**: 40px tall, 3-col grid — left: social icons; center: mono tagline (hidden < 760px); right: currency segmented control (AED/USD/EGP) + language toggle (`العربية` / `EN`). Hairline bottom border `--line-soft`.
- **Nav**: 72px tall, translucent blurred background (`backdrop-filter: blur(10px)` over the page bg), hairline bottom border. Left burger on mobile. Center/left **logo image** (`assets/vyella-logo.png`, `.nav__logo-img` height 30px / 26px mobile) linking home. Links in Jost 500 15px with an animated pink underline on hover. Right: pink "reserve" pill button. Sticky (whole `.topbar` is `position: sticky; top: 0`).
- **Footer**: dark (`--vy-ink`). 3 cols (brand / shop / studio). **Cream logo image** (`assets/vyella-logo-cream.png`, `.footer__logo-img` height 46px), Caveat tagline 24px, mono blurb, social icons, link columns (Jost 15px, 80% cream), hairline divider, mono copyright row (`© 2026 VYELLA®`).

### Home → Hero (`Hero`)

- Centered, cream background, ~72px/96px vertical padding.
- Eyebrow "EST. 2026 · DUBAI, UAE" (mono, soft).
- **Logo image** (`assets/vyella-logo.png`, `.hero__logo-img` height `clamp(62px, 11.5vw, 156px)`, width auto) centered. The PNG already includes the ® and flame accent.
- Slogan: two clauses, Jost 500 lowercase `clamp(20px,2.8vw,32px)` — clause 1 pink (`too pretty to burn.`), clause 2 green (`burn it anyway.`).
- Sub-paragraph: Jost 18px, muted, max-width 520px.
- Two CTAs: primary pink "shop the candles" + outline "design your own".
- **Hero photo**: `min(900px,100%)`, 16:9, `--radius-xl` (30px), soft large shadow, no border. Holds a drop-in image. (One small "hand poured" pill bottom-right; the second sticker is intentionally hidden for calm.)

### Home → Trust strip (`Trust`)

- Quiet horizontal band (white in A / `--tint-cream` in B), hairline top+bottom. 4 items: pink line-icon + Jost 16px lowercase title + 12.5px muted body. Collapses 4→2→1 col.

### Home → About (`About`)

- 2-col grid (0.92fr media / 1.08fr text), 72px gap. Media is a 4:5 rounded image (`--radius-lg`, soft shadow) with a small "made by hand" pink pill tag top-right. Text: eyebrow, `about__title` (Jost, `clamp(30px,3.8vw,52px)`, lowercase, weight follows direction), 18px muted body, dark "our story" button.

### Home → Shop (`Products` + `ProductCard` + `CustomBanner`)

- Centered section header ("the shop" / "handmade candles, made to order.").
- **Tabs** (pills, 1px border, active = solid ink): new arrivals / best sellers / shop by scent. When "shop by scent" is active, a row of **scent-family chips** appears (all / sweet & creamy / warm & spiced / fruity & fresh / rich & decadent).
- **Product grid**: 4 cols → 3 → 2 → 2 (440px), 26px gap. There are **12 products, all 50 AED**.
- **Product card**: `--card-bg` white, `--card-radius` (22px), border/shadow per direction; hover = lift 6px + bigger shadow. 1:1 **product photo on white, `object-fit: contain`** (real PNG shots; the image-slot `::part(frame)` and the media box are set to `#fff` so the white-background shots are seamless), with a small flag tag ("new" lime / "bestseller" tangerine) top-start. Body: name (Jost 600 19px) + price (right, flat `AED 50`), scent line (muted 14px), and a mono "VIEW CANDLE →" affordance that turns pink + nudges on hover. Whole card is a button → `#/candle/:id`.
- "shop all candles" ink button below.
- **Customise banner**: the one bold feature block. Background = `--band-feature` (ink in A / green in B), `--radius-xl`, soft shadow, 56px padding, 2-col. Left: eyebrow + title (light) + body + pink "start customising" button. Right: 3 translucent step cards (`01/02/03`, mono number in pink-light, Jost label, muted body).

### Home → Process (`Process`)

- Light section (white in A / `--tint-green` band in B). Centered header "how it's made" / "four steps, by hand."
- 4 white step cards (hairline, soft shadow, hover lift). Each: a round tinted icon chip (48px), mono step number, Jost 600 lowercase name (22px), muted body. (In B the icon chips cycle pink/green/butter/green tints.)

### Home → Stats (`Stats`) — the dark feature band

- Background `--band-feature` (ink in A / green in B), cream text. Centered header (light tone). 4 big numbers in Jost 600 `clamp(44px,5.4vw,76px)` colored **pink-light**, with mono uppercase labels. Reframed for a 2026 launch: **400+ candles poured · 350+ happy clients · 1.2M+ views · 5.0★ rating** (eyebrow "SINCE 2026", title "fresh out of the studio.").

### Home → Press (`Press`)

- Slim band, hairline top+bottom. Mono eyebrow "as featured in", then a centered row of outlet names in Jost 500 at 38% opacity → 90% on hover.

### Home → FAQ (`FAQ`)

- Section (white in A / `--tint-pink` band in B), max-width 800px. Centered header "FAQ" / "good to know."
- Accordion of white cards (hairline, soft shadow): question button (Jost 600 18px) with a round +/− icon chip (pink tint → solid pink when open). Answer expands via `max-height` transition, 15.5px muted. One open at a time (state: `open` index, click toggles to `-1`).

### Home → Instagram (`Instagram`)

- Header row: left = eyebrow + title "see us on the 'gram."; right = sub + pink "follow @vyella.co" button.
- 6-col grid (→3 on mobile) of 1:1 rounded tiles (soft shadow), each links to IG with a dark hover overlay + IG glyph.

### Home → Contact (`Contact`)

- Light section (white in A / `--tint-green` band in B). Centered header "come say hi."
- 2-col grid: left = 2×2 **info cards** (BASED IN → Dubai, UAE · online studio, no walk-ins · ships UAE & Egypt / online hours / phone+WhatsApp / email+social), white with hairline + soft shadow, each with a round tinted icon chip. Right = a **stylized SVG map** (soft tint rectangles + dashed roads) labelled DUBAI / ALL UAE / + EGYPT with a "based in dubai" pin badge and a caption pill. _(There is no physical storefront — it's an online studio; in production you can drop the map or keep it as a shipping-coverage graphic.)_

### Product detail (`ProductPage`)

- "← back to shop" link.
- 2-col grid (64px gap): left = sticky 1:1 product photo (`--radius-xl`, soft shadow) with flag tag + a 3-item trust row beneath; right = info column:
  - scent-family eyebrow (pink), name (Jost, `clamp(36px,4.6vw,56px)`), scent line (muted), price (Jost 600 28px, flat `AED 50`), description.
  - **Scent notes**: 3 small bordered cards (top / heart / base) — mono key + Jost 600 value.
  - **Size**: a single option (Classic · 3 oz / 85 g · 15–20 hr) rendered as one selectable card. (The selector loops the `sizes` array, so adding more sizes per product later “just works.”)
  - **Buy row**: qty stepper (pill, −/+) + full-width pink "reserve through this page · {total}" button that deep-links to **WhatsApp** with a prefilled localized message. Note line below.
  - **Customise toggle**: dashed→solid card with a checkbox; when on, shows a hint and flags the WhatsApp message as customised.
- **Related**: "you may also like" → 3 product cards (same family, padded out).

### Customise builder (`CustomisePage`)

- "← back" link + centered header "your candle, your way." + sub.
- 3 steps, each a labeled group of option cards (mono number + Jost title):
  1. **size** — a single card (Classic · 3 oz / 85 g).
  2. **scent** — 4 cards (sweet/warm/fruity/rich).
  3. **look** — 4 cards (classic dessert / minimal & soft / bold & colourful / surprise me).
  - Selected card = pink border + pink-tint fill + inset ring.
- **Summary bar**: dark, "estimated from {price}" (pink-light) + pink "start your custom candle" WhatsApp button.

---

## Interactions & Behavior

- **Routing**: hash-based. `#/` & `#/shop` render Home; `#/candle/:id` PDP; `#/customise` builder. `go()` handles route vs in-page-anchor (smooth-scrolls, offsets for the sticky header).
- **Language toggle**: flips `lang` between `en`/`ar`, sets `document.documentElement.lang` + `dir`, persists to `localStorage["vy-lang"]`. RTL is full (icons mirror via `transform: scaleX(-1)`; Arabic font stacks swap in).
- **Currency**: AED base; `USD ×0.272`, `EGP ×13.6`, rounded per `content.currency.round`; Arabic-Indic digits in AR. Persists to `localStorage["vy-cur"]`.
- **Direction (A/B)**: `localStorage["vy-dir"]` (default `b`); sets `data-dir` on `<html>`. **Remove before shipping** once a direction is chosen.
- **Hovers**: buttons lift 2px (+ tinted shadow on primary); cards lift 6px; nav links grow a pink underline; product "view" affordance nudges.
- **Accordion**: `max-height` + padding transition (~320ms ease).
- **Marquee**: 48s linear infinite, reverses in RTL.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` kills the marquee + smooth scroll.
- **Reserve / customise CTAs** open `wa.me` links with prefilled, localized order text (no cart/checkout — orders are confirmed over WhatsApp).
- **Responsive**: grids collapse at 1080 / 920 / 900 / 880 / 780 / 760 / 700 / 520 / 480 / 460 / 440px (see media queries). Nav becomes a burger drawer < 900px.

## State Management

Local React state only (prototype):

- App: `lang`, `cur`, `dir`, current `hash`. All three preferences persisted to localStorage.
- Products section: `tab` (new/best/scent), `family` filter.
- PDP: `sizeKey`, `qty`, `custom` (bool).
- Customise: `size`, `scent`, `look`.
- FAQ: `open` index.
- Nav: `mobile` (drawer open).

In a real build, replace `content.js` with your CMS/i18n + product API; lang/currency belong in app-level context or the URL/locale.

---

## Design Tokens

_(full source in `src/colors_and_type.css`)_

**Brand colors**

- Pink (signature): `#FF5EB9` · pink-soft `#FD8CD7` · pink-light `#FDA9F9` · pink-rose `#E36C81`
- Green (signature): `#006F51`
- Lime `#BEF400` · burgundy `#670920` · blue `#0F1FED` · gold `#DFBD00` · tangerine `#FFBE00` · yellow `#F6EB00`

**Neutrals**

- ink `#1B1A18` · cream `#FBF6EB` · cream-warm `#F3ECDC` · paper `#FFFFFF`
- fg-muted `#6A6862` · fg-soft `#9C988E`

**Soft tints (backgrounds — the "colorful but calm" layer)**

- tint-pink `#FDEEF6` · tint-pink-2 `#FBE3F0` · tint-green `#ECF3EE` · tint-green-2 `#E0EDE4` · tint-cream `#F6F0E2` · tint-butter `#FBF3DC`

**Lines & shadows**

- line `rgba(27,26,24,.10)` · line-soft `rgba(27,26,24,.07)` · line-strong `rgba(27,26,24,.22)`
- shadow-sm `0 1px 2px rgba(27,26,24,.04), 0 4px 14px -8px rgba(27,26,24,.14)`
- shadow-md `0 2px 6px rgba(27,26,24,.05), 0 18px 40px -22px rgba(27,26,24,.22)`
- shadow-lg `0 30px 70px -34px rgba(27,26,24,.30)`

**Type** — see `FONTS.md`. Scale: d1 `clamp(56,8vw,132)` · d2 `clamp(40,5vw,92)` · h1 `clamp(34,4vw,60)` · h2 `clamp(28,3.2vw,46)` · h3 24 · h4 19 · lead 21 · body 17 · small 14 · eyebrow 12 (px). Eyebrows are JetBrains Mono, uppercase, 0.22em tracking, pink.

**Radius**: xs 6 · sm 10 · md 16 · lg 22 · xl 30 · pill 999 (px)
**Spacing scale**: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 (px)
**Section padding**: 112px desktop / 68px mobile. Content max-width: 1200 (`.wrap`) / 1320 (`.wrap-wide`), 32px side gutters (20px mobile).

**Per-direction overrides** (set on `html[data-dir]`): `--page-bg`, `--band-a/-b/-feature/-soft-pink/-soft-green`, `--card-bg/-border/-shadow/-shadow-hover`, `--head-weight`, `--head-transform`, `--media-bg`, `--tag-bg/-color`.

---

## Assets

- **Logo** (provided by client): `src/assets/vyella-logo.png` (dark, for light backgrounds — nav & hero) and `src/assets/vyella-logo-cream.png` (cream, for the dark footer). Both are trimmed to the glyph bounding box; aspect ~2.42:1; the PNG already contains the ® and flame accent, so **don't** add a separate ® span.
- **Product photography** (real, client-supplied): 12 hero-on-white PNGs — `prod-croissant`, `prod-cookie`, `prod-raspberry-cheesecake`, `prod-guava-sorbet`, `prod-french-toast`, `prod-choc-waffle`, `prod-tiramisu-parfait`, `prod-strawberry-cake`, `prod-biscoff-cheesecake`, `prod-ube-parfait`, `prod-iced-coffee`, `prod-matcha` (`.png`, ~1024×1536). Each product's `img` field in `content.js` points at its file. Displayed `object-fit: contain` on white. The IG grid reuses 6 of these.
- `src/assets/hero-berry-bliss.jpg`, `about-waffle.jpeg` — hero + about lifestyle imagery (drop-in slots). `products.jpg` is no longer referenced (legacy).
- Icons are inline SVG (single source in `lib.jsx` → `Icon`), all `currentColor`, 2.2 stroke. No icon-font dependency.
- The contact "map" is a stylized inline SVG (`sections.jsx` → `StylizedMap`) — decorative; there is no physical store.
- `image-slot.js` is the prototype's drag-to-drop image placeholder web component; **in production replace each `<image-slot>` with a plain `<img>`/`<picture>`** pointing at the same asset.
- **Fonts**: all bundled + documented in `FONTS.md` and `fonts/` (self-hosted woff2, EN + AR). The live wordmark is now an image, so Bagel Fat One is reference-only.

## Files

```
design_handoff_vyella_v3/
├── README.md            ← this file
├── FONTS.md             ← every font, EN + AR, new + old, with licenses
├── fonts/
│   ├── fonts.css        ← @font-face for all families/weights (Latin + Arabic)
│   └── files/*.woff2    ← 34 self-hosted font binaries
└── src/
    ├── index.html       ← entry (CDN React + Babel; meta/SEO/JSON-LD)
    ├── colors_and_type.css ← design tokens + base type + A/B theme vars
    ├── styles.css       ← all component styles (calm, both directions)
    ├── content.js       ← bilingual content + product catalogue + currency
    ├── lib.jsx          ← helpers, Icon set, Btn/Sticker/SectionHead/Price
    ├── home.jsx         ← Hero, About, Products, ProductCard, CustomBanner
    ├── sections.jsx     ← Process, Trust, Stats, Press, FAQ, Instagram, Contact, Footer
    ├── product.jsx      ← ProductPage (PDP) + CustomisePage
    ├── app.jsx          ← TopBar, hash router, A/B DirSwitch, mount
    ├── image-slot.js    ← prototype-only image drop component
    └── assets/
        ├── vyella-logo.png / vyella-logo-cream.png  ← client logo (dark / cream)
        ├── prod-*.png       ← 12 real product shots (on white)
        └── hero-berry-bliss.jpg, about-waffle.jpeg    ← lifestyle imagery
```

To preview the prototype: serve the `src/` folder over http (e.g. `npx serve src`) and open `index.html` — it needs http(s), not `file://`, for the module/CDN loads.

# Vyella
