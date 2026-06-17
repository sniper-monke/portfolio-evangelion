# PROJECT NERV — Full Project Guide

Personal portfolio for **Aarav Krishna (PILOT-01)**, styled as a classified NERV terminal from *Neon Genesis Evangelion*. Frontend-only static site — no server, no database at runtime. Runs entirely in the browser and deploys to GitHub Pages.

---

## What It Is

A **single long scroll** disguised as a declassified personnel archive. Each section looks like a different NERV terminal screen, but underneath it's a normal portfolio:

| Section | Real-world content |
|---|---|
| Hero | Name, tagline, resume link, live "telemetry" |
| Personnel | Bio, education, interests |
| Operations | Projects with detail modals |
| Skills | Tech stack + harmonics-style charts |
| Economics | Essays / economic writing |
| Achievements | Awards and milestones |
| Gallery | Art / visual work |
| Status | What you're currently doing |
| Contact | Contact form |

Between sections, **Evangelion episode title cards** and **silhouette quote panels** (Rei / Asuka / Shinji) break up the scroll.

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI | React 19 |
| Build | Create React App + **CRACO** (custom webpack config) |
| Styling | Tailwind CSS 3 + custom CSS in `index.css` |
| Components | Shadcn/ui (`components/ui/`) — sharp corners, no border-radius |
| Fonts | JetBrains Mono, Noto Serif, Japanese fonts |
| Deploy | `yarn build` → `gh-pages` branch |
| Package manager | **Yarn 1.22** (not npm) |

There is a `backend/` folder (FastAPI + MongoDB), but it is **not connected** to the site. The live app never talks to it.

---

## Repo Layout

```
portfolio-evangelion/
├── frontend/          ← the entire live site lives here
│   ├── src/
│   │   ├── App.js              main orchestrator
│   │   ├── data/portfolio.js   all your personal content (edit this!)
│   │   ├── sections/           page sections (Hero, Ops, Contact…)
│   │   ├── components/         reusable UI (terminal, nav, overlays…)
│   │   ├── hooks/              sound, localStorage persistence
│   │   └── index.css           NERV design system + themes
│   └── public/
│       ├── resume.pdf
│       └── index.html
├── backend/           ← unused by frontend
├── design_guidelines.json
├── AGENTS.md          ← dev notes for AI/agents
└── PROJECT_GUIDE.md   ← this file
```

**Rule of thumb:** change *what* the site says → `frontend/src/data/portfolio.js`. Change *how* it looks or behaves → components, sections, or CSS.

---

## User Journey

### 1. Boot screen (`BootSequence.jsx`)

On first visit, a fake BIOS boot plays line-by-line ("MAGI ONLINE", "DECRYPTING DOSSIER…"). When it finishes, `nerv_boot_done_v1` is saved to `localStorage` so it doesn't repeat.

### 2. Main page (`App.js`)

`App.js` is the brain. It:

- Renders all sections in order
- Manages **two themes**: NERV mode (dark, orange, scanlines) vs **Pro mode** (cleaner, light)
- Handles **keyboard easter eggs** and **overlays** (Third Impact, SEELE, angel alerts, etc.)
- Opens the **secret terminal** when you press `~`

### 3. Persistent settings (`usePersistedState.js`)

These survive page reloads via `localStorage`:

| Key | Meaning |
|---|---|
| `nerv_boot_done_v1` | Skip boot animation |
| `nerv_pro_mode` | Light "pro" theme |
| `nerv_sound` | UI beeps on/off |
| `nerv_unlocked` | Easter egg achievements you've found |

---

## Core Building Blocks

### `TerminalScreen.jsx` — the visual frame

Most sections wrap content in this component. It draws:

- Top bar (`NERV-OS v2.27`, timestamp, PID)
- Command prompt (`pilot-01@magi:...$ cat ./PILOT-01.dossier`)
- Boot lines that stream in once
- ASCII banner (the big "NERV" box art)
- Meta row (SYNC %, AT-FIELD, uptime, etc.)
- Footer status bar

Variants (`nerv`, `magi`, `seele`, `sync`, `comms`) change accent colors.

### `portfolio.js` — your content database

One file exports everything:

- `PILOT` — name, tagline, socials, resume URL
- `PERSONNEL_FILE` — bio, education, hobbies
- `PROJECTS` — portfolio projects
- `ACHIEVEMENTS`, `ART_GALLERY`, `ESSAYS`, etc.
- `EPISODES` — Japanese/English titles between sections
- `NERV_MEDIA` — reference images and logos

**To personalize the site, start here.**

### Sections (`frontend/src/sections/`)

| File | Role |
|---|---|
| `HeroSection.jsx` | Top dossier + typed motto + live telemetry |
| `PersonnelSection.jsx` | Bio and background |
| `OperationsSection.jsx` | Project list + detail modal |
| `SkillsSection.jsx` | Skills + MAGI hex display |
| `MidSections.jsx` | Economics, achievements, status |
| `EndSections.jsx` | Gallery + contact form |

### Shared components

| Component | Purpose |
|---|---|
| `Navigation.jsx` | Top nav, logo, pro/sound toggles |
| `HudOverlay.jsx` | Scrolling ticker at top |
| `MagiDisplays.jsx` | Hexagon MAGI panel, harmonics graph, clocks |
| `SilhouetteQuote.jsx` | Character silhouette + quote panels |
| `TitleCard.jsx` | Episode-style section dividers |
| `SecretTerminal.jsx` | Hidden CLI (`~` key) |
| `Overlays.jsx` | Full-screen popups (Third Impact, SEELE, etc.) |
| `Cursor.jsx` | Custom cursor |
| `BootSequence.jsx` | Opening boot animation |
| `JpAccents.jsx` | Japanese decorative accents |

---

## Design System

Two visual modes toggled from the nav:

**NERV mode (default)** — Dark background, orange/green/red accents, scanlines, CRT flicker, hazard stripes, glowing text.

**Pro mode** — Adds `.pro-mode` to `<html>`. Scanlines and glow effects turn off; cleaner professional look. Same content, less anime.

Design tokens live in:

- `frontend/tailwind.config.js` — `nerv-orange`, `nerv-green`, animations
- `frontend/src/index.css` — terminal classes (`.term-section`, `.prompt`, `.ascii-box`)
- `design_guidelines.json` — colors, typography, motion reference

Everything uses **0px border-radius** — sharp, brutalist, NERV-terminal aesthetic.

---

## Easter Eggs

| Trigger | Effect |
|---|---|
| `~` or `` ` `` | Opens secret terminal |
| `Escape` | Closes overlays/terminal |
| Konami code (↑↑↓↓←→←→BA) | SEELE overlay |
| Click NERV logo 10× | Third Impact |
| Type `congratulations` | Congrats overlay |
| Type `rei` / `asuka` / `shinji` | Various effects |
| Every ~65s (NERV mode) | Random "angel detected" or fake error |
| Terminal commands | `magi`, `thirdimpact`, `instrumentality`, `dog`, etc. |

Unlocks get stored in `nerv_unlocked` and can affect the achievements section.

---

## Contact Form

The contact UI in `EndSections.jsx` uses **Web3Forms**. Replace `REPLACE_WITH_WEB3FORMS_KEY` with a real key from [web3forms.com](https://web3forms.com) before going live.

---

## Local Dev, Build & Deploy

```powershell
cd frontend
yarn install    # first time only
yarn start      # dev server → http://localhost:3000
yarn build      # production build → build/
yarn deploy     # build + push to gh-pages branch
```

Because `"homepage": "."` in `package.json`, asset paths are **relative** — works on GitHub Pages at any subpath.

---

## Before Going Live

| File | What to change |
|---|---|
| `frontend/src/data/portfolio.js` | PILOT info, projects, essays, achievements, gallery |
| `frontend/public/resume.pdf` | Your real resume |
| `frontend/src/sections/EndSections.jsx` | Web3Forms API key |

---

## Mental Model

```
portfolio.js     →  what to show (data)
sections/        →  where to show it (layout)
TerminalScreen   →  how it looks (NERV frame)
App.js           →  glue + easter eggs + theme + boot
index.css        →  visual identity
```

The Evangelion layer is presentation and interactivity. The substance is your bio, projects, skills, and contact info in `portfolio.js`.

---

## Known Issues

- **Modal close button hit area**: Navigation header (z-50) can render above modals in `OperationsSection.jsx`. Fix: portal to `document.body` or hide nav while modal is open.
- **Web3Forms placeholder key**: Contact form UI works but won't submit until the key is replaced.
