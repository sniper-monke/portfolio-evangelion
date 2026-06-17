# PROJECT NERV — Personal Portfolio

Static Evangelion-themed personal portfolio for PILOT-01 / Aarav Krishna. React + Tailwind, no backend.

## Local dev

```bash
cd frontend
yarn
yarn start
```

## Build

```bash
yarn build
```

## Deploy to GitHub Pages

1. Create a GitHub repo (e.g. `nerv-portfolio`) and push this code to it.
2. (Optional) If you want a custom path like `username.github.io/nerv-portfolio/`, leave `"homepage": "."` as-is — assets use relative paths and work at any subpath.
3. Deploy:

```bash
cd frontend
yarn deploy
```

This runs `yarn build` then publishes `build/` to the `gh-pages` branch via the `gh-pages` package. On GitHub: **Settings → Pages → Source → `gh-pages` branch / root**. Your site will be live at `https://<your-username>.github.io/<your-repo>/`.

> Note: `homepage: "."` makes all asset paths relative, so it works whether the site is served from the root or a sub-path. If you ever move to a custom domain, no changes needed.

## Replace before going live

| File | What to change |
|---|---|
| `frontend/src/data/portfolio.js` | PILOT info, projects, essays, achievements, gallery URLs |
| `frontend/public/resume.pdf` | Your real personnel report |
| `frontend/src/sections/EndSections.jsx` | `REPLACE_WITH_WEB3FORMS_KEY` — get a free key at web3forms.com |

## Easter eggs

- Press `~` for hidden terminal (commands: `help`, `whoami`, `magi`, `thirdimpact`, `instrumentality`, `seele`, `dog`)
- Konami code (↑↑↓↓←→←→ B A) → SEELE override
- Click the NERV logo 10× → Third Impact
- Type `congratulations` / `rei` / `asuka` / `shinji` anywhere
