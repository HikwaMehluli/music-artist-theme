# Music Artist Theme

A static multi-page website for a fictional music artist. Built with plain HTML + Tailwind CSS v3 — no frameworks, no backend.

## Live demo site

> [Live Demo](https://hikwamehluli.github.io/music-artist-theme)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server + CSS watch
npm run dev

# Or just serve
npm start
```

## Live Preview site

> http://localhost:8080 (run `npm start`)

## Pages

| Page | Description |
|------|-------------|
| Home | Hero section, featured album, tour dates, videos, about, gallery, newsletter |
| Music | Album grid with 6 albums |
| Album Detail | Single album page with track listing, share links, related albums |
| Videos | Embedded YouTube videos |
| Tour Dates | Upcoming shows across Zimbabwe, Namibia & Nigeria |
| Event Detail | Single event page with lineup, ticket info, and share buttons |
| Shop | Product grid (8 items) |
| Product Detail | Image gallery, size/color selector, tabs, reviews, related products |
| Cart | Shopping cart with promo code input |
| Checkout | Multi-step checkout form with autofill |
| 404 Error | Custom error page |

## Project Structure

```
├── index.html
├── music.html
├── album.html
├── videos.html
├── tour-dates.html
├── event.html
├── shop.html
├── single-product.html
├── cart.html
├── checkout.html
├── error.html
├── img/
│   ├── albums/            # Album artwork (local images)
│   └── store/             # Shop/product images
├── src/
│   ├── css/
│   │   ├── base.css       # Tailwind directives + base styles + .container
│   │   ├── buttons.css    # Buttons + section utilities
│   │   ├── header.css     # Header/nav
│   │   ├── mobile-menu.css
│   │   ├── hero.css
│   │   ├── footer.css
│   │   ├── page-hero.css
│   │   ├── newsletter.css
│   │   ├── album-card.css
│   │   ├── track-list.css
│   │   ├── tour-dates.css
│   │   ├── video.css
│   │   ├── gallery.css
│   │   ├── stats.css
│   │   ├── discography.css
│   │   ├── album-single.css
│   │   ├── event.css
│   │   ├── error.css
│   │   └── _entry.css     # Imports all partials (entry point)
│   └── js/
│       ├── _entry.js      # JS entry point
│       └── mobile-menu.js # Slide-out menu logic
├── dist/
│   ├── styles.css          # Compiled Tailwind output
│   └── app.js              # Compiled JS (IIFE)
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Build Commands

| Command | Description |
|---------|-------------|
| `npm start` | Serve at localhost:8080 |
| `npm run dev` | Tailwind watch + Vite dev server |
| `npm run build` | Compile CSS (minified) + JS |
| `npm run watch` | Tailwind watch mode |

## Adding a New Component

1. Create `src/css/component-name.css`
2. Add `@import 'component-name.css';` to `src/css/_entry.css`
3. Run `npm run build`

## Adding a New Page

1. Create the HTML file
2. Add its path to `tailwind.config.js` → `content[]` array
3. Run `npm run build`

## Tech Stack

- [Tailwind CSS v3](https://tailwindcss.com/) — Utility-first CSS
- [Vite](https://vitejs.dev/) — JS bundler (IIFE output)
- [Poppins](https://fonts.google.com/specimen/Poppins) — Google Font
- [http-server](https://www.npmjs.com/package/http-server) — Local dev server

## Deployment Strategy

### Shared Server (upload as-is)

**Will work.** Upload these folders/files:

```
├── *.html          (all 11 pages)
├── dist/           (styles.css + app.js — pre-compiled)
├── img/            (all images: albums/, store/)
```

**Do not upload:** `src/`, `node_modules/`, `tailwind.config.js`, `vite.config.js`, `package.json` — these are build tools only.

The site runs on `dist/styles.css` (53KB compiled) and `dist/app.js` (891 bytes IIFE). No build step needed on the server.

### GitHub Pages

Same as shared server. GitHub Pages serves static files. Deploy the root-level HTML + `dist/` + `img/`. Use a `.gitignore` to exclude `node_modules/` and optionally `src/` (keep it for reference, or exclude for cleaner deploy).

### Tailwind Build Behavior

The compiled `dist/styles.css` is a snapshot — it only contains classes that existed at build time.

| Scenario | Result |
|----------|--------|
| Edit existing classes (e.g. `text-black` → `text-white`) | Works — already in compiled CSS |
| Add new Tailwind classes (e.g. `flex`, `gap-4`) | **Breaks silently** — class missing from compiled output |
| Remove classes | Still works — unused CSS bloats the file but no harm |

**Every HTML edit requires a rebuild:** `npx tailwindcss -i ./src/css/_entry.css -o ./dist/styles.css --minify`

### Handoff to Backend Developers

#### Option A: PHP (simplest)
- Each HTML file becomes a `.php` file with `<?php include 'header.php'; ?>` etc.
- Keep the same `dist/` + `img/` structure
- Developers run `npm run build` when they change HTML, or add the Tailwind CLI to their deploy script
- Add a post-install hook or Makefile so `npx tailwindcss` runs on CI/CD

#### Option B: Next.js / React
- Convert each page to a React component
- Add Tailwind to the Next.js `tailwind.config.js` (merge the existing theme: colors, fonts, maxWidth)
- The CSS partials in `src/css/` become component-level CSS or stay as global imports
- `dist/app.js` (mobile menu) becomes a React component/hook
- This is a rewrite — the current 11 HTML files map to 11 route pages

#### Option C: Static Site Generator (Astro, 11ty)
- Closest to current architecture — HTML templates with partials
- Keep `src/css/` structure almost as-is (SSGs have Tailwind integrations)
- Header/footer become reusable layouts
- Minimal rewrite, maximum retention of existing work

### Recommended Handoff Deliverables

```
├── README.md            (setup instructions, build commands)
├── dist/                (pre-compiled — server-ready)
├── src/css/             (source CSS — for reference/rebuild)
├── src/js/              (source JS — for reference/rebuild)
├── img/                 (all images)
├── *.html               (source templates)
├── tailwind.config.js   (theme reference)
├── package.json         (dependencies + scripts)
└── DEPLOY.md            (upload dist/ + html + img to server)
```

### Key Rule for Any Workflow

> **Never deploy `src/` without `dist/`.** Either deploy the pre-compiled `dist/` to a static server, or integrate Tailwind into the backend build pipeline.

## Author

**Hikwa Mehluli** — [github.com/HikwaMehluli](https://github.com/HikwaMehluli)

## License

MIT
