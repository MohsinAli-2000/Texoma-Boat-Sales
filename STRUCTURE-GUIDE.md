# Texoma Boat House — Build & Structure Guide

A practical reference for building **new pages** that match this codebase 1:1.
Read this before writing any HTML/CSS/JS. The golden rule: **reuse existing
classes and patterns first; only add new CSS when nothing fits, and when you do,
prefix it `tbh-` and place it in the correct CSS region (see §5).**

This site is plain static HTML on Bootstrap 4 + jQuery. No build step, no
framework, no CSS variables file (a few `var(--x, #fallback)` are used inline
with fallbacks, so the fallback is what actually renders). Every page links the
**same** CDN block, the **same** `style.css`, and the **same** `script.js`.

---

## 1. Every page is built from 4 fixed blocks

In this exact order, every page is:

```
<head>      → identical CDN + meta block (only <title> / <meta description> change)
<header>    → desktop nav   (identical on every page)
<div>       → inventory mega-menu   (identical on every page)
... PAGE CONTENT ...   ← the only part that changes
<footer>    → footer   (identical on every page)
<script>    → identical CDN script block + script.js
```

To make a new page: **copy an existing page, keep blocks 1/2/3 and the footer +
script block byte-for-byte, and replace only the page-content region** between
the `<!-- xxx page starts here -->` / `<!-- xxx page ends here -->` comments.

---

## 2. The `<head>` block (copy verbatim)

Order is always: Bootstrap → Owl Carousel (2 files) → Fancybox → Font Awesome →
`style.css`. `style.css` is **always last** so it overrides the libraries.

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="PAGE-SPECIFIC DESCRIPTION">
    <meta name="author" content="Texoma Boat House">
    <title>PAGE NAME | Texoma Boat House</title>

    <!-- ======= Bootstrap CSS ======= -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <!-- ======= Owl Carousel CSS ======= -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
        referrerpolicy="no-referrer">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"
        referrerpolicy="no-referrer">

    <!-- ======= Fancybox CSS ======= -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- ======= Custom Styles ======= -->
    <link rel="stylesheet" href="./assets/css/style.css">
</head>
```

## 3. The `<script>` block (copy verbatim, bottom of `<body>`)

Order is fixed: jQuery → Bootstrap bundle → Owl Carousel → Fancybox →
`script.js`. jQuery **must** come first (everything depends on it).

```html
    <!-- ======= Script Dependencies ======= -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
        referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"></script>
    <script src="./assets/js/script.js"></script>
</body>
</html>
```

## 4. Header + mega-menu + footer (shared, copy verbatim)

These three blocks are **identical** on every page. Copy them from any existing
page. The only thing that differs is which `href`s are wired up (e.g. on
`events.html` the nav links point to real files; on `home.html` many are still
`javascript:void(0)`). When building a new page, point links to real pages where
they exist, otherwise use `javascript:void(0)` as the placeholder.

Structure summary (full markup: copy from `events.html`, which has the most
links wired):

- **`<header class="desktopNav">`** → `.desktopNavContainer` holding:
  - `.desktopNavMenuList` — `Inventory` (`.toggleInventoryMenu`), `Service`,
    `Our World` (`.toggleResourcesMenu` → contains `.resourcesMegaMenu` dropdown).
  - `.desktopNavLogo` — centered absolutely-positioned logo.
  - `.phoneAndSearchWrap` — phone block + `.searchWrapper` (input + icon).
- **`<div class="inventoryMegaMenu">`** → full-width fixed panel (hidden by
  default, toggled by JS) with link columns + two brand cards + `.closeInventoryIcon`.
- **`<footer class="calFooter">`** → Bootstrap `.row.no-gutters`:
  - `.col-lg-8` → `.calFooterLinks` (contact + Boats column + Company column).
  - `.col-lg-4` → `.calFooterNewsletter` (dark email signup + social icons).
  - `.calFooterBottom` → copyright bar.

> There is currently **no mobile hamburger nav** in the markup — the nav is
> desktop-oriented. Don't invent one unless asked; match what exists.

---

## 5. `style.css` is organized in strict regions — respect the order

`style.css` is a single file read top-to-bottom. Add new rules to the **correct
region**, never randomly at the end. The regions, in file order:

The file is split in two halves: **all base CSS first, all responsive CSS last.**

| Order | Region (marked by a `/* ==== */` comment banner) | What lives here |
|-------|--------------------------------------------------|-----------------|
| 1 | `1. common css starts here` | Reset, `@font-face`, typography, buttons, `.tbh-section` / `.tbh-shell`, global helpers |
| 2 | `2. desktop nav css starts here` | `.tbh-nav*` |
| 3 | `3. mega menu css starts here` | `.tbh-megaMenu*`, `.tbh-dropdown`, `.tbh-mobileMenu*` |
| 4 | `4. FOOTER css starts here` | `.tbh-footer*` |
| 5 | `5. home page css starts here` | All `home.html` styles |
| 6...N | one banner per page - `SERVICE PAGE`, `BRAND PAGE`, `PARTS PAGE`, `ABOUT PAGE`, `FINANCING PAGE`, `CONTACT PAGE`, `SELL / TRADE PAGE`, `PRO SHOP PAGE`, `CREW PAGE`, `TEAM BIO PAGE`, `BLOG PAGE`, `FAQ PAGE`, ... | that page's base classes only - **no `@media` in here** |
| LAST | `RESPONSIVE` banner | **every** `@media` rule in the whole site (see 6) |

**Rule:** a page's base CSS goes in **one contiguous labeled block** with a clear
`/* ---- section name ---- */` sub-comment. A new page -> add a new labeled region
at the **end of the base half**, i.e. immediately *before* the `RESPONSIVE`
banner, using the same comment-banner style.
Its `@media` rules do **not** live with it - they go into the single shared
responsive block at the very bottom of the file (see 6).

> Class prefix: every new class in this project is prefixed `tbh-`.
> Never introduce a second prefix.

---

## 6. Responsive CSS - ONE query per breakpoint, all at the bottom

**All responsive CSS for the entire site lives in a single block at the very
bottom of `style.css`, under the `RESPONSIVE` comment banner.** No `@media`
rule is written anywhere else in the file.

### 6.1 The breakpoint ladder (the only breakpoints allowed)

Desktop-first `max-width`, ordered largest -> smallest:

```
1600 - 1500 - 1440 - 1350 - 1200 - 991 - 768 - 576 - 400
```

`1200 / 991 / 768 / 576` are the workhorses. Reach for the others only when a
layout genuinely breaks there.

### 6.2 Never write the same breakpoint twice

> **A breakpoint is opened ONCE for the whole stylesheet.** If
> `@media (max-width: 576px) { ... }` already exists, **add your selectors inside
> that existing block** - do **not** open a second `576px` block further down.

This is the most important CSS rule in the project. It replaces the older
per-page `@media` groups: those get merged into this one shared ladder.

**Shape of the whole responsive half of the file:**

```css
/* =================================================================
   RESPONSIVE - one block per breakpoint, largest -> smallest
   ================================================================= */

@media (max-width: 1200px) {
    /* ---- Global ---- */
    .tbh-h1 { font-size: 48px; line-height: 56px; }
    .tbh-section { padding: 80px 0; }

    /* ---- Home page ---- */
    .tbh-welcome-row { grid-template-columns: 1fr 1fr; gap: 48px; }

    /* ---- Service page ---- */
    .tbh-svc-intro-row { gap: 64px; }

    /* ---- <your new page> ---- */
}

@media (max-width: 991px) {
    /* ---- Global ---- */
    /* ---- Home page ---- */
    /* ---- Service page ---- */
    /* ---- <your new page> ---- */
}

@media (max-width: 768px) { /* same page order */ }
@media (max-width: 576px) { /* same page order */ }
```

**Inside each breakpoint block** keep the same page order every time, each group
introduced by a `/* ---- Page name ---- */` sub-comment:

```
Global - Home - Service - Brand - Parts - About - Financing - Contact -
Sell/Trade - Pro Shop - Brand MasterCraft - Crew - Team Bio - Blog -
Blog Details - FAQ - <new pages appended here>
```

**To add a new page's responsive CSS:** for each breakpoint the page needs,
scroll to that *existing* `@media` block and append a `/* ---- Page name ---- */`
group at its end. Only if the page needs a breakpoint that has never been opened
(e.g. `1440px`) do you create that block - once, in ladder order - and put
everything for it there.

### 6.3 Conventions across breakpoints

- Section padding steps down: `100px -> 80px (<=1200) -> 64px (<=991) -> 48px (<=576)`.
- Headings step down: `.tbh-h1 64 -> 48 (<=1200) -> 40 (<=991) -> 32 (<=576)`;
  `.tbh-h2 40 -> 32 (<=991) -> 26 (<=576)`.
- Grids collapse `4 -> 3 (<=1200) -> 2 (<=991) -> 1 (<=576)` - and when the grid
  is built with Bootstrap columns (see 8.1) most of this happens for free with
  `col-6 col-md-4 col-lg-3`, so nothing has to be written here at all.
- Desktop nav hides and the burger + off-canvas drawer appear at `<=991`.
- Large side gaps shrink before columns collapse (`120px -> 64px -> 40px`).
- Overlapping / negative-margin cards reset to a positive margin at `<=991`.

---

## 7. The design system (reuse these — do not reinvent)

**Colors** (used as literals, sometimes via `var(--x, #fallback)`):
- Blackish `#191919` (dark sections, text) · Gold `#B08830` (buttons, accents) ·
  ADA Gold `#906F27` (gold text/links) · grays `#D9D9D9` `#E6E6E6` `#FAFAFA` ·
  white `#FFF`.

**Font:** Montserrat everywhere (`@import` at top of CSS). Acumin Pro is declared
via `@font-face` but Montserrat is the working font.

**Buttons** (in common region): `.yellowBtn` (gold fill), `.whiteBtn` (outline,
inverts on hover), `.blackBtn` (dark). All uppercase, 800 weight, 4px radius.

**Headings:**
| Class | Size | Use |
|-------|------|-----|
| `.headerHeading` | 80px white, centered | hero H1 |
| `.tbh-page-title` | 48px dark | plain page titles |
| `.mainHeading` / `.mainHeadingWhite` | 40px (dark / white centered) | section H2 |
| `.tbh-contact-heading` | 80px dark | contact hero |
| `.backLinkTitle` | 24px | card titles |

**Body text:** `.blackPara` (16px dark), `.whitePara` (16px white centered),
`.lgBlackPara` (24px). `.goldColor` recolors any text to `#906F27`.
Spacer helper: `.marginYaxis40` (40px top/bottom). Button wrapper: `.btnWrap`
(48px top margin).

**Cursor - always `pointer` on icons and images.** Every `<img>`, every icon
(`<i class="fa-...">`, inline `<svg>`) and every card/tile media wrapper gets
`cursor: pointer` - **even when it is not wrapped in a link and has no click
handler**. It is a global rule, written once in the *common* region, never
one-off next to a component:

```css
/* common region - icons & images always read as clickable */
img,
svg,
i[class*="fa-"],
.tbh-svc-card-img,
.tbh-ps-card-img,
.tbh-listing-img,
.tbh-blog-card-img {
    cursor: pointer;
}
```

When you build a new media wrapper, add its class to that selector list rather
than writing another `cursor: pointer` declaration elsewhere.

---

## 8. Layout patterns (the recurring building blocks)

### 8.1 Multi-item grids -> use the Bootstrap columns grid

Any section that lays out **2, 3, 4 or more repeating items** (card grids,
feature grids, brand logos, benefit lists, step lists, inventory tiles, team
cards...) is built with the **Bootstrap grid** - `.row` + `.col-*` - **not** a
hand-written `display: grid`. Bootstrap already carries the responsive
collapse, so the shared breakpoint blocks in 6 stay small.

```html
<div class="row">
    <div class="col-12 col-md-6 col-lg-4">... card ...</div>
    <div class="col-12 col-md-6 col-lg-4">... card ...</div>
    <div class="col-12 col-md-6 col-lg-4">... card ...</div>
</div>
```

Standard column recipes (Bootstrap 4 - `sm 576 / md 768 / lg 992 / xl 1200`):

| Items per row (desktop) | Classes | Collapse behaviour |
|---|---|---|
| 2 | `col-12 col-lg-6` | 2 -> 1 at `<992` |
| 3 | `col-12 col-md-6 col-lg-4` | 3 -> 2 -> 1 |
| 4 | `col-6 col-md-4 col-lg-3` | 4 -> 3 -> 2 |
| 5+ / logo strips | `col-6 col-md-4 col-lg-3 col-xl-2` | wraps naturally |
| 2-up split (text + media) | `col-12 col-lg-6` | stacks at `<992` |

Rules that go with it:

- **Gutters** come from the grid, spacing from utilities - `mb-4` / `mb-5` on the
  column for row rhythm; use `.row.no-gutters` for edge-to-edge tile walls.
- **Reversed rows** (image right/left alternating) use `flex-lg-row-reverse` on
  the `.row`, and `order-1 order-lg-2` on the columns for mobile stack order -
  not a custom `order: -1` rule.
- **Centering a narrower content column** stays as-is: `col-lg-10 col-xl-9 mx-auto`.
- Keep `display: grid` **only** for genuinely non-repeating bespoke layouts
  (e.g. the footer's `2fr 1fr` band, a `1fr 520px` asymmetric split). Repeating
  cards are always Bootstrap columns.
- Because the collapse is handled by `col-*`, do **not** add a matching
  `grid-template-columns` override in the responsive block - there is nothing
  left to override.

### 8.2 Section skeleton

Almost every content section follows this nesting:
```html
<section>
    <div class="SOME-section-wrapper">          <!-- gives vertical margin/padding -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-10 col-xl-9 mx-auto">   <!-- centered content column -->
                    ... content ...
                </div>
            </div>
        </div>
    </div>
</section>
```
Common centering columns used: `col-lg-10 col-xl-9 mx-auto`,
`col-lg-11 col-xl-10 mx-auto`, `col-lg-10 mx-auto`. Pick the one matching the
density of neighbouring sections.

**Fixed-aspect media (the core trick):** images/videos use the
*padding-top percentage* technique — a relatively-positioned wrapper with
`padding-top: <ratio>%` and an absolutely-positioned `img/video` filling it with
`object-fit: cover`. Reuse the existing wrapper classes:
- Square (1:1): `.tbh-services-img-square`
- Event/card 54%: `.tbh-event-img`
- Service detail 72.22%: `.tbh-service-detail-img`
- Map 54.17%: `.tbh-map-wrap`
- Hero ~31%: `.tbh-services-hero` / `.tbh-banner`

**Image-text feature row** (alternating sides) — see `service.html` `.tbh-services-row`:
```html
<div class="row tbh-services-row">                      <!-- image left -->
  <div class="col-lg-6"><div class="tbh-services-img-square"><img ...></div></div>
  <div class="col-lg-6"><div class="tbh-services-row-text"><div> ...text... </div></div></div>
</div>
<div class="row tbh-services-row flex-lg-row-reverse">  <!-- image right: add flex-lg-row-reverse -->
  ...
</div>
```
On mobile, use `order-1/order-2 order-lg-*` to control stacking (see the intro
section in `service.html`).

**Dark overlay hero** — `.tbh-services-hero` has a `::after` dark scrim and a
centered `.tbh-services-hero-content`. `.tbh-banner` is the plain (no-scrim) variant.

**Card grid** — events grid is the canonical example: a `.row` of
`col-lg-6 mb-5` cards, each an `<a>` wrapping `.tbh-event-img` + title + date.
Adjust `col-*` and `mb-*` to taste but keep the bottom-margin rhythm.

---

## 9. JavaScript — what `script.js` does and how to add to it

`script.js` is one `$(document).ready(...)` with two labeled regions:

1. **Desktop nav / mega-menu** (always active): toggles `.inventoryMegaMenu`,
   `.resourcesMegaMenu`, and the search input with jQuery `fadeIn/fadeOut`,
   closes on outside click, `stopPropagation` to keep open on inside click.
   This runs on every page automatically — no per-page wiring needed.

2. **Carousels** (guarded by `.length` checks): each carousel init is wrapped in
   `if ($('.selector').length) { ... }` so it's safe to load `script.js` on pages
   that don't have that carousel. **Always guard new carousels the same way.**

**Rule for new interactive features:** add a new `// xxx code starts/ends here`
labeled region inside the same `$(document).ready`, and **guard DOM-specific code
with `.length` checks** so it stays safe site-wide.

---

## 10. Owl Carousel — use it for EVERY slider

Whenever a section is a slider/carousel, use **Owl Carousel 2** (already loaded).
Do not hand-roll sliders. Pattern:

**HTML** — outer `.owl-carousel .owl-theme` (+ your own class) wrapping `.item`
(or `.items`) slides:
```html
<div class="myThing-slider owl-carousel owl-theme">
    <div class="item"> ...slide... </div>
    <div class="item"> ...slide... </div>
</div>
```

**JS** — add a `.length`-guarded init in `script.js` (carousel region):
```js
if ($('.myThing-slider').length) {
    $('.myThing-slider').owlCarousel({
        loop: false,
        margin: 20,
        nav: true,
        navText: ['<img src="./assets/images/home/left-arrow.webp" alt="prev"/>',
                  '<img src="./assets/images/home/right-arrow.webp" alt="next"/>'],
        dots: true,
        smartSpeed: 600,
        center: true,
        slideBy: 1,
        responsive: { 0: { items: 1 }, 576: { items: 1 }, 1000: { items: 1 } }
    });
}
```

Two real examples already in `script.js`:
- **`.promoSlider`** — single-item, custom image nav arrows, dots styled in CSS
  (`.promoSlider .owl-dots span`, `.owl-prev/.owl-next` absolutely positioned).
- **`.boat-listing-carousel`** — uses `.each()` + `if (!$(this).hasClass('owl-loaded'))`
  so multiple instances on a page each init once; `loop:true`, no nav/dots.

**Custom arrow/dot styling** lives in CSS next to that carousel's other rules
(see the `.promoSlider .owl-*` rules in the home region). Match that placement.

---

## 11. Assets & placeholders

- Page images live in `./assets/images/<page>/`. Reference with relative
  `./assets/...` paths (every page sits at repo root).
- `./assets/images/home/grey.webp` is the **grey placeholder** for any
  CMS-driven/not-yet-supplied image (cards, galleries, crew photos).
- Inventory/spec icons are pulled from the `cdn.mdsbrand.com` CDN (see the
  new-arrivals card in `home.html`).
- Cards with repeated dummy content (`Year Make Model`, `Event or Promotion
  Title`, etc.) are **templates** to be populated from a CMS later.

---

## 12. Checklist for building a new page

1. Copy the existing page whose layout is closest (`about.html` for
   content/story pages, a card-grid page for listings).
2. Keep `<head>`, header, mobile menu, mega menu, dropdowns, footer and the
   script block **unchanged** - update only `<title>`, `<meta description>` and
   `href`s.
3. Wrap the page content in
   `<!-- ======= xxx page starts here ======= -->` / `... ends here ...`.
4. Build with existing classes first. **Any grid of 2 / 3 / 4+ repeating items
   uses the Bootstrap `.row` + `.col-*` grid** (8.1), not a custom
   `display: grid`.
5. New CSS only when nothing fits -> prefix it (`tbh-`), and put it in a **new
   labeled region at the end of the base half** of `style.css`, immediately
   before the `RESPONSIVE` banner.
6. Responsive: go to the **bottom** responsive block and append a
   `/* ---- Page name ---- */` group inside the **already-existing** `@media`
   blocks. **Never open a second `@media` for a breakpoint that already exists**
   (6.2). Only create a breakpoint block if the ladder has never used it.
7. Give every icon / image / media wrapper `cursor: pointer` via the shared
   selector list in the common region (7) - never a per-component one-off.
8. Any slider -> Owl Carousel with a `.length`-guarded init in the carousels
   region of `script.js`; any new behaviour -> its own
   `/* ===== xxx code starts/ends here ===== */` region, also `.length`-guarded.
9. Wire nav/footer links to real files where they exist; `javascript:void(0)`
   otherwise.
