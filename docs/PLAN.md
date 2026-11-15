# Portfolio Site — Project Plan

Personal portfolio + freelance services site. Goal: turn visitors (mostly Arab small/medium business owners, plus international clients on Mostaql/Khamsat/Upwork) into **WhatsApp chats and booked calls**.

---

## 1. Decisions (locked unless we revisit)

| Area | Choice | Why |
|---|---|---|
| Framework | React 19 + Vite + TypeScript | Fast dev, typed project data |
| Styling | Tailwind CSS v4 | Use **logical utilities** (`ms-*`, `pe-*`, `start-*`) so RTL works for free |
| Routing | React Router | One-page home + `/projects/:slug` detail pages |
| i18n | react-i18next + `i18next-browser-languagedetector` | Sets `<html lang dir>` on switch; AR/EN |
| Theme | `class` strategy dark mode, saved in `localStorage`, defaults to system | |
| Prerender | `vite-react-ssg` (or `vite-plugin-prerender`) | SPA alone hurts SEO; prerender `/`, `/ar`, and each project page so Google + link previews see real HTML |
| Contact form | **Formspree** | No JS SDK needed, spam filter, free 50/mo |
| Booking | Cal.com **popup on click** (not inline embed) | Inline embed kills Lighthouse score |
| Chat | WhatsApp `wa.me` link with prefilled message (AR/EN) | |
| Analytics | Vercel Analytics (+ custom events on CTA clicks) | Zero config on Vercel |
| Media | Images: local `/public`, AVIF/WebP, sized. Videos: Cloudinary or YouTube (lazy, click-to-play) | |
| Deploy | Vercel + custom domain + Search Console | |
| Live chat | Phase 2 (Crisp/Tawk) | Heavy script, WhatsApp covers it now |

### Animation stack (kept deliberately small)
- **Motion** — the main tool: section reveals, hover/tap, page transitions, layout animations, `useScroll` for light parallax.
- **Lenis** — smooth scroll, desktop only.
- **GSAP + ScrollTrigger — skipped for v1.** Motion covers everything planned. Add it only if the design asks for a pinned/scrubbed sequence (e.g. the Process section), and lazy-load it on that route.
- **Aceternity / Magic UI** — copy at most **2 components** (e.g. a spotlight/background effect for the hero and a marquee for tech stack). Adapt them to our tokens; don't install the whole kit.

**Motion rules**
- Durations 150–600 ms, transform/opacity only (no layout-thrashing props).
- Each section animates **once** on first view; no looping animations except a subtle hero background.
- **`prefers-reduced-motion`**: `<MotionConfig reducedMotion="user">` at the root, Lenis not initialised, marquee paused, CSS `@media (prefers-reduced-motion: reduce)` kills transitions. Content must be fully visible without any animation (no `opacity: 0` stuck states).
- Respect RTL: horizontal slide directions flip (`x: dir === 'rtl' ? -20 : 20`).

---

## 2. Project structure

```
src/
  app/            routes, layout, providers (i18n, theme, motion, lenis)
  components/
    ui/           Button, Card, Tag, Section, Container, IconButton…
    layout/       Navbar, Footer, LangToggle, ThemeToggle, WhatsAppFab
  sections/       Hero, Services, Projects, TechStack, About, Process, Testimonials, Contact
  pages/          Home, ProjectDetails, NotFound
  data/
    projects.json services.json stack.json   (bilingual fields: { en, ar })
  locales/
    en/common.json  ar/common.json
  lib/            github.ts, analytics.ts, motion.ts (shared variants), seo.ts
  styles/         index.css (Tailwind + design tokens as CSS vars)
public/
  og/  images/  cv/  favicon, robots.txt, sitemap.xml
```

### `projects.json` shape
```json
{
  "slug": "rms",
  "featured": true,
  "title": { "en": "Restaurant Management System", "ar": "نظام إدارة المطاعم" },
  "summary": { "en": "...", "ar": "..." },
  "problem": { "en": "...", "ar": "..." },
  "solution": { "en": "...", "ar": "..." },
  "features": [{ "en": "...", "ar": "..." }],
  "stack": ["dotnet", "react", "sqlserver"],
  "cover": "/images/projects/rms/cover.webp",
  "screenshots": ["..."],
  "video": "https://...",
  "liveUrl": "https://...",
  "repoUrl": "https://github.com/...",
  "year": 2026
}
```
Candidate projects already in `D:\Portfolio`: **RMS**, **EduConnect**, **mern-ecommerce** (+ anything in `new/`).

---

## 3. Phases

### Phase 0 — Setup
- [ ] Rename folder / create GitHub repo (see name suggestions in chat)
- [ ] Scaffold Vite + React + TS, Tailwind v4, ESLint + Prettier, path aliases
- [ ] Vercel project linked to repo (preview deploys on every PR)

### Phase 1 — Design (Claude Design)
- [ ] Run `docs/DESIGN_PROMPT.md` in Claude Design
- [ ] Iterate: light + dark, EN + AR (RTL), desktop + mobile, project details page
- [ ] Hand back: export/screenshots + the design tokens (colors, fonts, radii, spacing)

### Phase 2 — Foundation
- [ ] Design tokens → CSS variables + Tailwind theme
- [ ] Fonts (self-hosted, `font-display: swap`, subset): Latin + Arabic pair
- [ ] Providers: i18n (dir/lang on `<html>`), theme (no flash — inline script in `index.html`), MotionConfig, Lenis
- [ ] Layout: Navbar (sticky, mobile sheet menu), Footer, floating WhatsApp button
- [ ] Routing + 404

### Phase 3 — Sections (home)
Hero → Services → Projects → Tech stack → Process → About → Testimonials (placeholder) → Contact → Footer

### Phase 4 — Data & integrations
- [ ] `projects.json` + Project details page (gallery, lazy video, prev/next project)
- [ ] GitHub API: latest public repos (fetch at build time if prerendering, else client-side with `sessionStorage` cache; handle rate limit gracefully)
- [ ] Formspree form (validation, honeypot, success/error states, AR/EN messages)
- [ ] Cal.com popup, WhatsApp prefilled link, CV download (EN/AR PDFs)
- [ ] Vercel Analytics + events: `cta_whatsapp`, `cta_book_call`, `project_open`, `cv_download`, `form_submit`

### Phase 5 — Motion pass
- [ ] Shared variants in `lib/motion.ts` (fadeUp, stagger, scaleIn)
- [ ] Section reveals, card hovers, hero intro, route transitions
- [ ] Verify with OS "reduce motion" ON

### Phase 6 — SEO, a11y, performance
- [ ] Per-page/per-language `<title>`, description, canonical, `hreflang` (en/ar), Open Graph + Twitter image (1200×630, one per language)
- [ ] JSON-LD: `Person` + `ProfessionalService`
- [ ] `sitemap.xml`, `robots.txt`
- [ ] a11y: semantic landmarks, focus rings, skip link, alt text, contrast AA in both themes, keyboard-usable menus
- [ ] Lighthouse ≥ 90 in all 4 categories on mobile: lazy images, `fetchpriority="high"` on hero image, code-split detail page, no heavy third-party scripts until interaction

### Phase 7 — Launch
- [ ] Custom domain on Vercel, HTTPS
- [ ] Google Search Console: verify, submit sitemap
- [ ] Update links on GitHub, LinkedIn, Mostaql, Khamsat profiles

### Later (v2)
Live chat (Crisp/Tawk), real testimonials, blog/case-study posts (MDX), Cloudinary for heavier media, contact form → auto-reply email.

---

## 4. Content I need from you
- Name, title/tagline (EN + AR), short bio, education, experience
- Photo (or decide on no photo)
- WhatsApp number, Cal.com username, Formspree form ID, social URLs, CV PDFs
- For each project: problem/solution/features, screenshots, demo video, live + repo links
- Domain name
