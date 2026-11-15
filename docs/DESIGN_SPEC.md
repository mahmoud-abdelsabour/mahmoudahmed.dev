# Design Spec (extracted from the Claude Design export)

Source: `Mahmoud Abdelsabour — Portfolio.html` → 5 frames, **all English Home**:
Desktop Dark, Desktop Light, Mobile Dark, Mobile Light, Tablet. Unpacked, readable source (CSS + markup, font data stripped) is in `docs/design/` (git-ignored, local reference only).

> **Not in the export:** Arabic/RTL frames, the project details page, 404 page, OG image.
> The CSS is RTL-ready (logical properties, `[dir=rtl]` rules), so the Arabic build follows from it — but the Arabic layouts were never previewed. Project details page needs a design pass or I design it from these same tokens.

## Tokens
Implemented in [src/styles/index.css](../src/styles/index.css). Utilities: `bg-bg bg-surface bg-elev border-border text-tp text-ts text-tm bg-acc hover:bg-acch text-accfg bg-acc-soft text-succ text-err shadow-sh1/2/3`.

| Token | Dark (default) | Light |
|---|---|---|
| `--bg` | #0B1215 | #F6F8F8 |
| `--surface` | #101A1E | #FFFFFF |
| `--elev` | #162328 | #FFFFFF |
| `--border` | #22343A | #D9E2E3 |
| `--tp` text primary | #E7EFF0 | #0D1A1D |
| `--ts` text secondary | #A6B8BB | #3D5155 |
| `--tm` text muted | #8297A0 | #566A6E |
| `--acc` accent (teal) | #2EC4A6 | #0D7266 |
| `--acch` accent hover | #5AD6BD | #0A5C52 |
| `--accfg` on-accent | #03201A | #FFFFFF |
| `--succ` | #4ADE80 | #15803D |
| `--err` | #F87171 | #B91C1C |
| `--acc-soft` | rgba(46,196,166,.12) | rgba(13,114,102,.09) |

## Typography
- **Inter** (Latin UI) · **IBM Plex Sans Arabic** (RTL; weights 400/500/600) · **JetBrains Mono** (eyebrows, tags, code, numbers).
- Base 16px / 1.6 (Arabic 1.8). Headings 600, tracking −0.02em (Arabic: 0).
- Display 40→60px/1.08 (Arabic 38→54, lh 1.3) · H2 30→40/1.2 · H3 20 · H4 17 · Lead 17→19 · Small 14 · Caption 12. Breakpoint for desktop sizes: 1024px.
- Eyebrow: mono 13px uppercase +0.06em, accent colour, numbered ("01 · Services").

## Shape, space, layout
- Radii: tag 6 · button-sm 8 · button 10 · button-lg 12 · card 16 · photo 20 · pills 999.
- Container max 1264px, gutters 20px (≥768: 32px). Section padding 72px (≥1024: 112px), top border between sections.
- Breakpoints are **container queries** in the export (768 / 1024 / 1100); in the build use Tailwind `md` / `lg` / `xl`.
- Min tap target 44px (buttons 44, `lg` 52, `sm` 36). Inputs 48px.
- Shadows `--sh1/2/3` per theme; focus ring 2px accent, 3px offset.

## Components (CSS classes in export → React components)
Button (primary/secondary/ghost, sm/md/lg, icon, block, disabled, active scale .97) · Chip (filter, with count) · Tag (mono) · Badge (live/wip) · Card + `lift` hover (translateY −4, accent border, soft ring) · IconTile · Ticks list · Input/Select/Textarea (+error, help text) · Segmented control (lang/theme in mobile sheet) · Toast (ok/bad/info) · Browser Frame with mock-UI (skeleton bars, KPIs, bar chart, rows, code block) · Stat · Timeline · Quote card + empty state · Step (process) · Floating WhatsApp FAB with tooltip · Mobile full-screen sheet menu.

## Page structure (Home)
1. **Nav** sticky, blurred bg: logo mark (accent rounded square with "M" glyph) + "Mahmoud *Abdelsabour*"; links Services/Projects/Process/About/Contact; `ع` language button; theme toggle; "Book a call" (≥1024). <1024: burger → full-screen sheet with big links, EN/عربي + dark/light segmented controls, Book a call + WhatsApp.
2. **Hero**: availability pill · eyebrow · H1 "I build business web apps & dashboards that *save you time.*" · lead · CTAs (Book a call / Chat on WhatsApp) · trust row ([N]+ projects, .NET & React, replies in 24h). Right: stylised dashboard in browser frame + floating "Invoice #1042 synced" card. Dot-grid + radial glow background.
3. **Services** (01): 2×2 cards — Admin dashboards, Custom web apps, Bug fixes & new features, API integrations; each with "What you get" ticks, optional "Starting from [PRICE]" (toggleable), "Discuss your project" link.
4. **Projects** (02): filter chips All/Web apps/Dashboards/APIs · one featured card (Charity Management System) + grid: EduConnect, RMS Restaurant POS, RMS API · hover "reveal" overlay with feature bullets · "Latest on GitHub" 4 repo cards (name, desc, language dot, stars, updated) · "View all on GitHub".
5. **Tech stack** (03): 4 groups — Backend (.NET, ASP.NET Core, Node.js, EF), Frontend (React, Tailwind, TypeScript, Bootstrap), Database (SQL Server, PostgreSQL, MongoDB, Redis), Tools (Git/GitHub, Docker, Postman, Azure DevOps). Placeholders → use real SVG icons (Simple Icons).
6. **Process** (04): Discuss → Plan → Build → Deliver (horizontal ≥1024, vertical with line on mobile), each with a "You get:" box.
7. **About** (05): 4:5 photo placeholder · stats ([N]+ projects, [N] yrs .NET, 24h reply) · bio · timeline (VTS .NET dev 2026–now; Full Stack Open Helsinki 2025–26; M.Sc. Fayoum in progress; B.Sc. MSA/Greenwich).
8. **Testimonials** (06): quote cards with platform badge (Mostaql/Khamsat/LinkedIn) **or** dashed empty state "Your project could be the first story here" (switchable prop).
9. **Contact** (07): form (name, email, WhatsApp optional, project type, budget range, message) + side cards: Book a 30-min call (Cal.com), WhatsApp, email.
10. **Footer**: logo, tagline "Business web apps, built to last.", socials, CV (English)/CV (Arabic), ©, back to top. **FAB** WhatsApp bottom-end corner.

## Motion in the export
Almost none by design: button colour/scale transitions, card `lift` hover (.25s `cubic-bezier(.2,.7,.2,1)`), project `reveal` overlay fade, spinner. A `prefers-reduced-motion` rule disables all. Scroll reveals / hero intro / page transitions are left for the Motion pass (Phase 5).

## Placeholders to fill (content)
`[N]+ projects`, `[N] years`, `[PRICE]` ×4, `[RANGE 1–3]` budgets, `[N] days of support`, `[YEAR]` for B.Sc., `hello@[yourdomain].com`, photo, testimonials, repo stats (from GitHub API), social URLs, CV PDFs.

## Decisions to confirm
- Logo: accent rounded-square with an "M" glyph — keep as is?
- Show "Starting from [PRICE]" on service cards, or hide until you have prices?
- Testimonials: ship the empty state at launch (recommended until real reviews exist)?
- Project set: Charity Management, EduConnect, RMS (POS), RMS API — the design's list; `mern-ecommerce` isn't included.
