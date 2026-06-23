# Azam Ayaz — Founder Website & Software Showcase

A premium, production-ready personal brand, software showcase, and lead-generation
platform built with **React + TypeScript + Vite + Tailwind CSS**.

It combines a founder-style personal brand, a project portfolio, a software
marketplace, services, applied research, case studies, and a contact/lead funnel —
all SEO-optimized, accessible, fast, and fully data-driven.

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build locally
npm run lint     # lint the codebase
```

Requires Node 18+ (developed on Node 20).

---

## Tech & architecture

- **React 18 + TypeScript** with a clean, modular component architecture
- **Vite 5** for fast dev and optimized builds (code-splitting + manual chunks)
- **Tailwind CSS** with a token-based design system (light/dark themes via CSS variables)
- **React Router 6** with lazy-loaded routes
- **Framer Motion** for tasteful, reduced-motion-aware animations
- **Zero-backend contact form** (hands off to the visitor's mail client)

### Folder structure

```
src/
├─ components/
│  ├─ cards/        Reusable cards (project, product, service)
│  ├─ layout/       Navbar, Footer, CommandPalette, ScrollProgress, BackToTop…
│  ├─ sections/     Composable page sections (Hero, Faq, Timeline, CtaBand…)
│  ├─ ui/           Primitives (Section, Reveal, CoverArt, Loader)
│  ├─ Icon.tsx      Inline SVG icon set (no icon-font weight)
│  └─ Seo.tsx       Per-route meta + JSON-LD structured data manager
├─ data/            ← ALL CONTENT LIVES HERE (typed, structured)
│  ├─ types.ts      Shared content types
│  ├─ site.ts       Identity, nav, social links, stats
│  ├─ projects.ts   Portfolio
│  ├─ products.ts   Marketplace catalog
│  ├─ services.ts   Service offerings
│  ├─ research.ts   Research areas
│  ├─ caseStudies.ts
│  ├─ technologies.ts / timeline.ts / testimonials.ts / faqs.ts
├─ lib/             Hooks (theme, scroll, hotkeys), helpers
└─ pages/           One file per route
```

---

## Editing content

**You rarely need to touch components to update the site.** All content is stored
as typed data in `src/data/`. To add a project, product, service, FAQ, timeline
entry, etc., append a new object to the relevant array — pages and SEO update
automatically.

- Update your name, role, email, and social links in [`src/data/site.ts`](src/data/site.ts).
- Replace placeholder social URLs (`#`) with real links.
- Swap `CoverArt` gradient placeholders for real screenshots when available
  (see `src/components/ui/CoverArt.tsx`).
- Replace the portrait placeholder in `src/components/sections/Hero.tsx`.

### Featured UX

- **Command palette** — press <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> (or <kbd>/</kbd>) to search every page, project, product, and service.
- **Theme switcher**, scroll progress bar, back-to-top, sticky nav with active highlighting, mobile drawer, accessible FAQ accordions, route-level loading states.

---

## SEO & AI discoverability

- Per-route `<title>`, meta description, canonical, Open Graph & Twitter cards (`src/components/Seo.tsx`)
- Schema.org JSON-LD: `Person`, `Service`, `Product`, `CreativeWork`, `Article`, `FAQPage`, `CollectionPage`
- `public/robots.txt` (explicitly welcomes AI crawlers), `public/sitemap.xml`
- Semantic HTML, proper heading hierarchy, descriptive alt text, skip-to-content link

---

## Deployment

The build output is a static SPA in `/dist`, deployable free on any static host.

### Cloudflare Pages (recommended)
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing handled by `public/_redirects`.

### GitHub Pages
- A workflow is provided at `.github/workflows/deploy.yml`.
- SPA deep-link routing is handled by `public/404.html` + a restore script in `index.html`.
- `public/.nojekyll` ensures asset folders are served.

> Update the production domain in `index.html`, `src/data/site.ts`,
> `public/robots.txt`, and `public/sitemap.xml` before going live.

---

## License

All rights reserved © Azam Ayaz.
