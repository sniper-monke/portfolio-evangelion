# PROJECT NERV — PRD

## Original Problem Statement
Build an immersive personal portfolio for "AARAV KRISHNA / PILOT-01" inspired by Neon Genesis Evangelion (NERV terminal + MAGI + Rebuild aesthetics). Static frontend only, GitHub-Pages-ready. Tagline: "In the space between logic and imagination, I build."

## User Choices (frozen)
- Static frontend (no backend); contact via Web3Forms placeholder key
- Rich realistic placeholder content
- Placeholder PDF resume
- CC0 sounds (synthesized via WebAudio)
- Curated public Evangelion imagery (Wikimedia NERV / SEELE logos)

## Architecture
- React 19 + CRA (craco) + Tailwind 3
- All state in React + localStorage (`nerv_boot_done_v1`, `nerv_pro_mode`, `nerv_sound`, `nerv_unlocked`)
- No backend, no DB, no env vars used (REACT_APP_BACKEND_URL untouched)

## What's Implemented (2025-12-17)
- 12-second boot sequence with skip + persistence
- Hero (Personnel Dossier) with typing tagline + mouse-reactive HUD + MAGI diagnostic
- Sections: Personnel File, Operations (6 projects + modal), Skills Matrix (segmented bars), Economic Analysis Division, Achievements + hidden secrets tracker, Art Gallery (modal), Current Status, Contact Terminal (Web3Forms)
- Bottom HUD diagnostic strip with live time/SYNC/AT-FIELD telemetry + marquee
- AT-Field custom cursor (hex ring)
- Sound toggle (WebAudio synth: beep/click/warn/boot)
- NERV ⇄ PROFESSIONAL mode toggle (dual palette, scanlines disabled in pro)
- Secret terminal (~ to open) with commands: help, whoami, projects, skills, contact, resume, magi, eva, thirdimpact, instrumentality, seele, dog, clear, exit, open github
- Easter eggs: Konami → SEELE overlay; NERV logo 10× → Third Impact; ASCII triggers (congratulations / rei / asuka / shinji); random Angel detected + fake errors; hidden Shinji chair watermark; Pen-Pen ASCII dog page; Human Instrumentality essay page
- Session-terminated ending screen
- Placeholder resume.pdf served at /resume.pdf

## Testing
- Frontend testing_agent_v3 iteration_1: 14/14 scenarios passed
- Known non-blocker: Web3Forms POST fails with CORS until real access_key is set; UI logs success regardless

## Prioritized Backlog
- P1: User to replace `REPLACE_WITH_WEB3FORMS_KEY` in `EndSections.jsx` with real key
- P1: User to drop a real `resume.pdf` into `/app/frontend/public/`
- P1: User to swap placeholder copy in `/app/frontend/src/data/portfolio.js` (PILOT, PERSONNEL_FILE, PROJECTS, ECONOMICS_ESSAYS, ACHIEVEMENTS, ART_GALLERY)
- P2: Add real Evangelion title cards from imgur albums (manual download)
- P2: Refactor App.js: extract Konami/easter-egg keyboard handlers + overlay router into a custom hook
- P2: Lighthouse pass + image preload for above-the-fold operation tiles
- P3: Add OG image + favicon (NERV crest)
