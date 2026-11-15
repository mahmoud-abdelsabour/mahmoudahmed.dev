# Claude Design Prompt — Portfolio Site

> Fill in the `[brackets]` before pasting. Paste everything below the line into Claude Design.
> Tip: run it in rounds — first ask for the **home page (desktop, dark, English)**, approve the direction, then ask for light mode, Arabic RTL, mobile, and the project details page.

---

## Role & goal

Design a personal portfolio + freelance services website for Mahmoud Abdelsabour, a full-stack software developer who builds business web applications. The site has two jobs, in this order:

1. **Convert visitors into clients** — the primary actions are "Chat on WhatsApp" and "Book a call".
2. **Prove competence** — show real projects, the tech stack, and a clear working process.

Audience: small and medium business owners in Egypt and the Gulf (Arabic-speaking, mostly on mobile), plus international clients coming from freelance platforms (Mostaql, Khamsat, LinkedIn). They are not technical — the design must feel **trustworthy, professional and clear**, not like a developer playground.

## Brand & visual direction

- Personality: confident, calm, modern, precise. "A reliable engineer you'd hand your business system to."
- Avoid: neon cyberpunk, overused purple-to-pink gradients, glassmorphism everywhere, generic "hacker terminal" aesthetics, stock-photo vibes.
- Color: one strong brand accent (suggest one — e.g. a deep teal, electric blue or emerald) on a neutral base. Provide a full token set for **both dark and light themes**: background, surface, surface-elevated, border, text-primary, text-secondary, text-muted, accent, accent-hover, accent-foreground, success, error. All text must pass **WCAG AA** contrast in both themes.
- Typography: a Latin font **and** a matching Arabic font that pair well (e.g. Inter / Geist with IBM Plex Sans Arabic / Cairo / Tajawal — suggest the best pair). Define a type scale (display, h1–h4, body, small, caption) and note that Arabic needs slightly larger line-height.
- Shape: define radius scale, spacing scale (4/8-based), shadow/elevation levels, and border style. Keep it consistent.
- Logo: a simple monogram/wordmark from my initials MA that works at favicon size.
- Imagery: project screenshots shown inside clean browser/device frames. Optional subtle background texture (grid, dots or soft spotlight) in the hero only.

## Technical constraints (design must be buildable)

- Will be built in **React + Tailwind CSS**; express spacing/colors/radii as tokens that map cleanly to Tailwind.
- **Bilingual EN/AR with full RTL**: every layout must mirror correctly in Arabic (icons with direction like arrows flip; logos, numbers and code don't). Show at least the Hero, Services and a Project card in Arabic RTL.
- **Mobile-first**: design at 375px, 768px and 1440px. Max content width ~1200px.
- **Dark and light** themes, both first-class (dark is default).
- Performance budget: no huge background videos or heavy illustrations in the hero; Lighthouse 90+ is a requirement.
- Accessibility: visible focus states, 44px minimum tap targets, no information conveyed by color alone.

## Pages & sections

### Global
- **Navbar** (sticky, compact on scroll): logo · section links (Services, Projects, Process, About, Contact) · AR/EN toggle · dark/light toggle · primary "Book a call" button. Mobile: hamburger → full-height sheet menu with the same items + WhatsApp button.
- **Floating WhatsApp button** (bottom end corner, respects RTL), unobtrusive, with tooltip "Chat on WhatsApp".
- **Footer**: logo, one-line tagline, social links (GitHub, LinkedIn, Mostaql, Khamsat), "Download CV" (EN / AR), copyright, back-to-top.

### Home (single page, in this order)
1. **Hero** — name, role, one-line offer: *"I build business web apps & dashboards that save you time."* (+ Arabic version), a short supporting line, two CTAs: **Book a call** (primary) and **Chat on WhatsApp** (secondary). Small trust row under the CTAs: e.g. "X projects delivered · .NET & React · Replies within 24h". Optional photo or a tasteful visual (e.g. a stylized dashboard mockup) — suggest what works best.
2. **Services** — 4 cards: Admin dashboards · Custom web apps · Bug fixes & new features · API integrations. Each: icon, title, 1–2 line description, "what you get" bullets. Optional "Starting from" price slot (design it so it can be hidden).
3. **Projects** — filter chips (All / Web apps / Dashboards / APIs) + grid of project cards: cover screenshot, title, one-line summary, stack tags, and icon links (Live demo · GitHub · Video). Hover state reveals more. 1 featured project can be larger. "View all on GitHub" link, plus a small strip of **latest GitHub repos** (name, description, language, stars, updated date).
4. **Tech stack** — grouped logos: Backend (.NET, Node.js), Frontend (React, Tailwind), Database (SQL Server, PostgreSQL, MongoDB), Tools (Git, Docker…). Clean icon grid or a slow marquee.
5. **Process** — 4 steps: **Discuss → Plan → Build → Deliver**, each with a short description and what the client gets at that step. Horizontal timeline on desktop, vertical on mobile.
6. **About** — short bio, photo (optional), education, experience timeline, and 3 quick stats.
7. **Testimonials** — design a card style for quotes (name, role/company, avatar, platform badge like Mostaql) **and** an empty-state version for now ("Your project could be the first story here").
8. **Contact** — two columns: left = form (name, email, WhatsApp number optional, project type select, budget range select, message, submit) with success/error/loading states; right = "Book a 30-min call" card (Cal.com), WhatsApp card, email. Clear reassurance copy: "I reply within 24 hours."

### Project details page (`/projects/:slug`)
- Header: title, one-line summary, stack tags, year, buttons (Live demo, GitHub, Watch video).
- Large hero screenshot in a browser frame.
- Sections: **The problem** · **The solution** · **Key features** (icon list or cards) · **Screenshots** (gallery with lightbox) · **Demo video** (click-to-play poster) · **Tech used**.
- End: CTA block "Need something similar? Let's talk" (WhatsApp + Book a call) and Previous / Next project navigation.

### Also design
- 404 page (on-brand, link home).
- Open Graph image template (1200×630) in EN and AR.

## Motion (describe intent; I'll implement it with Motion + Lenis)

Keep animation **subtle and purposeful — never decorative noise**. Annotate where motion happens:
- Hero: staggered fade/slide-in of headline, subline, CTAs; one subtle ambient background effect max.
- Sections: elements fade-up once when entering the viewport (stagger in grids).
- Cards: gentle lift + border/accent glow on hover; tap feedback on buttons.
- Project card → details page: shared-element style transition of the cover image if feasible.
- Theme/language toggles: smooth icon morph.
- Everything must have a **reduced-motion fallback** where content simply appears with no movement — design nothing that depends on animation to be understood.

## Deliverables I need back

1. Home page: desktop + mobile, dark + light.
2. Arabic RTL versions of Hero, Services, Projects, Contact (desktop + mobile).
3. Project details page (desktop + mobile).
4. Component sheet: buttons (primary/secondary/ghost/icon, all states), tags/chips, cards, inputs/select/textarea (all states), navbar states, toggles, toasts.
5. **Design tokens** listed explicitly: colors (both themes, hex), fonts + type scale, spacing, radii, shadows, breakpoints.
6. Short notes on motion per section.

Use realistic placeholder copy (not lorem ipsum) in both English and Arabic.
