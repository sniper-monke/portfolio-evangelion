# AGENTS.md — PROJECT NERV / Portfolio Evangelion

## Quick start
```powershell
cd frontend
yarn install  # uses yarn 1.22.x, NOT npm (see packageManager in package.json)
yarn start    # craco start (not react-scripts directly)
yarn build    # craco build → output to build/
yarn deploy # builds + publishes build/ to gh-pages branch
```

## Architecture
- **Frontend-only static site** (React 19, CRA + CRACO + Tailwind 3, Shadcn/ui "new-york" style, all border-radius forced to 0px)
- **Backend** (`backend/`, FastAPI + MongoDB) exists but is **NOT wired to the frontend** — do not modify it for frontend tasks
- All app state lives in localStorage keys: `nerv_boot_done_v1`, `nerv_pro_mode`, `nerv_sound`, `nerv_unlocked`
- `homepage: "."` means relative asset paths — works at any GitHub Pages subpath

## Key paths
| Purpose | Path |
|---|---|
| App entrypoint | `frontend/src/index.js` → `App.js` |
| Personal data | `frontend/src/data/portfolio.js` (PILOT, PROJECTS, ACHIEVEMENTS, ART_GALLERY) |
| Contact form | `frontend/src/sections/EndSections.jsx:82` — replace `REPLACE_WITH_WEB3FORMS_KEY` with real Web3Forms key |
| Resume PDF | `frontend/public/resume.pdf` |
| Design system | `design_guidelines.json` (colors, typography, motion) |
| Tailwind config | `frontend/tailwind.config.js` (includes `nerv-*` color palette, custom keyframes) |
| CSS variables | `frontend/src/index.css` (dual theme via `.pro-mode` class) |
| Component library | `frontend/src/components/ui/` (Shadcn, zero border-radius) |

## Build system quirks
- CRACO overrides CRA — all scripts use `craco` (not `react-scripts`)
- Path alias `@/` → `src/` configured in `craco.config.js`
- Optional health-check plugin (disabled by default; enable via `ENABLE_HEALTH_CHECK=true`)
- `@emergentbase/visual-edits` CRACO plugin auto-wraps in dev mode (optional dep, silent if missing)
- No `.env` files committed; no env vars currently used

## Testing
- **No unit tests exist** — no `__tests__/`, `.test.js`, or `.spec.js` files
- `test_result.md` and `test_reports/` contain historical external test runner output (not rerunnable)

## Known issues
- **Modal close button hit area broken**: Navigation header (z-50) renders above modal (z-[200]) due to ancestor stacking context. The modal in `OperationsSection.jsx` is mounted inline (not a portal). Fix: portal to `document.body`, add Escape handler, or hide nav while modal is open.
- **Web3Forms placeholder key** — contact form UI works but no real submission until the key is replaced

## Easter eggs (preserve if touched)
- `~` opens secret terminal; `Escape` closes overlays
- Konami code → SEELE overlay
- NERV logo 10× → Third Impact
- Typing `congratulations`/`rei`/`asuka`/`shinji` triggers events
- Random angel detections every ~65s (NERV mode only)
- All interactive elements use `data-testid` attributes
