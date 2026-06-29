# AGENTS.md

## Project Overview

Static multi-page website for "Zimbo Artist" — a fictional music artist site. Plain HTML + Tailwind CSS v3. No frameworks, no backend.

## Pages (10 + 1 error)

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, album, tour, videos, about, gallery, newsletter |
| `music.html` | Album grid (6 albums, images in `img/albums/`) |
| `album.html` | Single album detail ("Young Game") — event-hero banner + two-column layout |
| `videos.html` | Embedded YouTube videos (Audio Library channel) |
| `tour-dates.html` | Tour dates listing (Zimbabwe, Namibia, Nigeria) |
| `event.html` | Single event detail ("Vic Falls Carnival") |
| `shop.html` | Product grid (4-column, 8 products) |
| `single-product.html` | Product detail with image gallery, tabs, reviews, related products |
| `cart.html` | Shopping cart with promo code |
| `checkout.html` | Checkout form with autofill (Southern African countries) |
| `error.html` | 404 error page (dark theme) |

## Build Commands

```bash
npm start        # Serve site at http://localhost:8080
npm run build    # Compile Tailwind CSS (minified) + Vite
npm run watch    # Watch mode for development
npm run dev      # Concurrent Tailwind watch + Vite dev server
```

**Critical:** After editing CSS in `src/css/` or any HTML file, you MUST run `npm run build` to regenerate `dist/styles.css`. The site will not reflect changes without this.

## Architecture

```
src/
  css/
    base.css            — Tailwind directives + base styles + .container
    buttons.css         — Buttons + section utilities
    header.css          — Header/nav/dropdown
    mobile-menu.css     — Slide-out mobile menu
    hero.css            — Hero section
    footer.css          — Footer + social links
    page-hero.css       — Page hero (music, shop, tour, etc.)
    newsletter.css      — Newsletter form
    album-card.css      — Album card components
    track-list.css      — Track list (shared by homepage + album single)
    tour-dates.css      — Tour items (homepage) + tour dates page + responsive
    video.css           — Video items
    gallery.css         — Gallery grid
    stats.css           — Stats section
    discography.css     — Discography grid + load more
    album-single.css    — Album single page
    event.css           — Event page
    error.css           — Error/404 page
    _entry.css          — Imports all partials (entry point, underscore kept)
  js/
    _entry.js            — JS entry point (imports mobile-menu.js)
    mobile-menu.js       — Mobile slide-out menu logic
img/
  albums/                — Album artwork (local images)
dist/
  styles.css             — Compiled Tailwind output (all HTML references this)
  app.js                 — Compiled JS output (IIFE format)
```

- `tailwind.config.js` — Content paths scan all HTML files. If you add a new HTML file, add it to the `content` array.
- `vite.config.js` — Vite config, IIFE output format, entry `src/js/_entry.js` → `dist/app.js`.
- `http-server` for local development serving.

## CSS Structure

The CSS is split into modular partials in `src/css/`. Each file is wrapped in `@layer components { ... }`. The `_entry.css` file imports them all and is the Tailwind entry point.

**To add a new component:** Create `src/css/name.css`, add `@import 'name.css';` to `_entry.css`, then rebuild.

**To add a new page:** Create the HTML file, add its path to `tailwind.config.js` `content[]` array.

## Tailwind Component Classes

- **Buttons:** `.btn`, `.btn-primary`, `.btn-primary-light`, `.btn-secondary`, `.btn-outline`, `.btn-outline-dark`, `.btn-outline-light`, `.btn-small`, `.btn-full`
- **Header/Nav:** `.site-header`, `.header-container`, `.main-nav`, `.nav-menu`, `.nav-item`, `.header-actions`, `.header-right`, `.menu-toggle`
- **Mobile Menu:** `.mobile-menu-overlay`, `.mobile-menu`, `.mobile-menu-close`, `.mobile-menu-links`
- **Footer:** `.site-footer`, `.footer-grid`, `.footer-logo`, `.footer-links`, `.social-links`, `.footer-background` (has `pointer-events-none`)
- **Page hero:** `.page-hero`, `.page-title`, `.page-subtitle`
- **Event/Album hero:** `.event-hero`, `.event-hero-bg`, `.event-hero-content`, `.back-link`, `.event-title`, `.event-meta`, `.event-meta-item`
- **Album single:** `.album-single`, `.album-single-container`, `.track-item-single`, `.track-play-btn`
- **Tour:** `.tour-item`, `.tour-date`, `.tour-date-item` (has responsive breakpoint at 600px)
- **Shop:** `.event-ticket-box`, `.sold-out`
- **Newsletter:** `.newsletter-form`, `.newsletter-input`

**Do not add `text-black` to `.btn-primary` — it already has it.** Do not add `text-center` to `.btn` — it already has it.

## Conventions

- **Branding:** Always "Zimbo Artist" (not "Sonic Wave" or other names).
- **Nav order:** Home, Music, Videos, Tour, Shop. No search icon. Cart icon + hamburger menu only.
- **Footer:** 3 columns — Logo+description+social | Quick Links (2-col grid: Music, Videos, Tour, Shop) | Contact. All pages use identical footer. The `.footer-background` uses `pointer-events-none` so links remain clickable.
- **Font:** Poppins (Google Fonts). Loaded in every page `<head>`.
- **Colors:** `#000` (primary), `#fff` (secondary), `#737373` (muted on light bg), `#d4d4d4` (muted on dark bg), `#f7f7f7` / `#f4f4f4` (light backgrounds).
- **Contrast:** Light bg text uses `#737373` (7.46:1 ratio). Dark bg text uses `#d4d4d4`. Footer/contact text on `#0a0a0a` uses inline `style="color:#d4d4d4"`.
- **Links:** Root pages use `filename.html`. `music.html` uses `../filename.html` for root pages.
- **Hero banners:** `event.html` and `album.html` use `event-hero` + `event-hero-bg` + `event-hero-content` + `back-link` pattern.
- **Checkout form:** All inputs have `autocomplete` attributes for browser autofill. Country dropdown lists Southern African countries.
- **Sold-out buttons:** Use `btn btn-small sold-out` class.
- **Images:** Album artwork in `img/albums/`. Shop/product images use Unsplash direct URLs.
- **YouTube embeds:** Use `aspect-video` containers with `allowfullscreen` attribute. Videos are from the Audio Library channel.
- **Mobile menu:** JS in `src/js/mobile-menu.js`, compiled via Vite to `dist/app.js` (IIFE). Uses CSS `.no-scroll` class on `<html>` (not JS body overflow).

## Gotchas

- Python is not available on this system. Use Node.js (`node -e "..."` or script files) for any file operations.
- The `write` tool has JSON size limits for large HTML files. Use Node.js scripts for large writes.
- `tailwind.config.js` must list every HTML file in `content[]` or Tailwind classes won't be compiled.
- The `music/` subdirectory pages need `../` prefix for links to root-level files.
- CSS is split across `src/css/` partials. Edit the specific `name.css` file, not `_entry.css` directly.
