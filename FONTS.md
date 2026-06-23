# Vyella — Fonts

Every typeface used across the redesign (**v3**) *and* the previous build (**v2 / old version**) is included here, for both **English (Latin)** and **Arabic** scripts. All are free Google Fonts — licensed **SIL Open Font License 1.1** (or **Apache 2.0** for JetBrains Mono) — so they can be self-hosted and shipped commercially with no fee.

The actual font binaries are in **`fonts/files/`** (`.woff2`), and **`fonts/fonts.css`** contains ready-to-use `@font-face` rules pointing at them (Latin + Arabic subsets, all weights). Just `<link>` or `@import` that one file and you're done — no Google CDN needed.

```html
<link rel="stylesheet" href="fonts/fonts.css" />
```

---

## What each font is for

| Font | Script | Role | Weights bundled |
|---|---|---|---|
| **Bagel Fat One** | Latin | **Wordmark only** — the "vyella" logo (hero, nav, footer). The one chunky display face. | 400 |
| **Jost** | Latin | Headings, body, UI, buttons — everything that isn't the logo. | 300, 400, 500, 600, 700 |
| **Caveat** | Latin | Script accent — the footer tagline flourish (used sparingly). | 400, 500, 600, 700 |
| **JetBrains Mono** | Latin | Mono labels — eyebrows, batch/meta text, the announcement bar. | 400, 500, 700 |
| **Cairo** | Arabic | Arabic headings + body + UI (the Arabic counterpart to Jost). | 400, 500, 600, 700, 800, 900 |
| **Lalezar** | Arabic | Arabic **wordmark only** — the chunky logo equivalent in RTL. | 400 |
| **Cairo Play** | Arabic | Arabic script accent (counterpart to Caveat). | 500, 700, 900 |
| **Sigmar** | Latin | *From the old version only* — was the display-alt face. Not used in v3, included on request. | 400 |

> In v3 the chunky display face is deliberately limited to the **wordmark**. All other headings switched to **Jost** (Latin) / **Cairo** (Arabic) for the calm, professional look. The bundle still includes the old display-alt (**Sigmar**) so nothing from the previous build is lost.

---

## Font stacks (as used in the CSS variables)

```css
--font-display:  "Bagel Fat One", "Arial Black", system-ui, sans-serif; /* wordmark only */
--font-head:     "Jost", "Futura", "Helvetica Neue", system-ui, sans-serif;
--font-body:     "Jost", "Futura", "Helvetica Neue", system-ui, sans-serif;
--font-script:   "Caveat", "Brush Script MT", cursive;
--font-mono:     "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;

/* Arabic (applied under html[dir="rtl"]) */
/* wordmark      → "Lalezar"   */
/* headings/body → "Cairo"     */
/* script accent → "Cairo Play"*/
```

---

## Original Google Fonts links (if you ever want to re-pull or grab more weights/subsets)

- Bagel Fat One — https://fonts.google.com/specimen/Bagel+Fat+One
- Jost — https://fonts.google.com/specimen/Jost
- Caveat — https://fonts.google.com/specimen/Caveat
- JetBrains Mono — https://fonts.google.com/specimen/JetBrains+Mono
- Cairo — https://fonts.google.com/specimen/Cairo
- Lalezar — https://fonts.google.com/specimen/Lalezar
- Cairo Play — https://fonts.google.com/specimen/Cairo+Play
- Sigmar — https://fonts.google.com/specimen/Sigmar

CDN one-liner equivalent to the bundled `fonts.css` (Latin only; the bundled file also has Arabic subsets):

```
https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Jost:wght@300;400;500;600;700&family=Caveat:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Cairo:wght@400;500;600;700;800;900&family=Lalezar&family=Cairo+Play:wght@500;700;900&family=Sigmar&display=swap
```

## Notes on subsets
- Latin fonts bundle the **latin** subset (covers the English copy on the site).
- Arabic fonts bundle **arabic + latin** subsets (so mixed AR/EN strings render correctly).
- If you need extended Latin accents, Cyrillic, Vietnamese, etc., re-pull from the links above — `fonts.css` already keys each `@font-face` by `unicode-range`, so adding subsets is just appending more blocks.
