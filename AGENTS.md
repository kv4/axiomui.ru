# PROJECT KNOWLEDGE BASE

**Generated:** 2026-07-26
**Commit:** 66115ef
**Branch:** main

## OVERVIEW

**AxiomUI** — Russian-language IT consulting landing page (React 19 + Vite 7 + Tailwind CSS v4, bundled into single HTML via `vite-plugin-singlefile`) + two co-located Node.js bot processes (Telegram + MAX messenger) managed via PM2.

## STRUCTURE

```
./
├── src/             # React SPA — all components in App.tsx (1018 lines)
├── bots/            # Node.js bot processes (separate package.json)
├── public/          # Static HTML pages (cases, security, privacy, terms)
├── .github/         # CI/CD — push-to-main build+SCP deploy
├── .opencode/       # OpenCode IDE config (MCP servers, plugins)
└── .omo/            # AI agent checkpoint state
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Landing page content/sections | `src/App.tsx` | All sections inline (Header, Hero, Pricing, FAQ, Contact, etc.) |
| SVG icons | `src/App.tsx` lines 5–107 | Inline SVG components, no icon library |
| Styling / theme | `src/index.css` + Tailwind classes | Tailwind v4 `@import`, custom bg utilities |
| Contact form handler | `bots/telegram/index.js` | HTTP server on :3001, forwards to Telegram admin |
| MAX bot handler | `bots/max/index.js` | MAX messenger → Telegram bridge |
| Static sub-pages | `public/cases/`, `public/security.html`, etc. | Raw HTML, no React |
| Deployment config | `.github/workflows/deploy.yml` | Build → SCP VPS → PM2 reload |
| MCP server config | `.opencode/opencode.json` | Azure DevOps, Playwright, Ant Design |
| Utility (unused) | `src/utils/cn.ts` | `cn()` = clsx + tailwind-merge — dead code |

## CODE MAP

LSP/codegraph unavailable. Key files and their roles:

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `App` | Component (default export) | `src/App.tsx:990` | Root component, renders all sections |
| `Header` | Component | `src/App.tsx:341` | Sticky nav + mobile menu |
| `Hero` | Component | `src/App.tsx:447` | Hero section with CTAs |
| `Pricing` | Component | `src/App.tsx:225` | Subscription + one-time pricing tables |
| `Contact` | Component | `src/App.tsx:805` | Contact form (POST /api/contact) |
| `FAQ` | Component | `src/App.tsx:757` | Accordion FAQ |
| `cn` | Utility | `src/utils/cn.ts:4` | Tailwind class merger — **unused** |
| telegram bot | Script | `bots/telegram/index.js` | HTTP server + Telegram polling + MAX bridge |
| max bot | Script | `bots/max/index.js` | MAX bot → Telegram notification bridge |

## CONVENTIONS

- **No tests** — zero test infrastructure, no testing dependencies
- **No linting/formatting** — no ESLint, Prettier, EditorConfig. TS strict mode is the only quality gate
- **Single-file build** — `vite-plugin-singlefile` bundles entire SPA into one HTML
- **Monolithic App.tsx** — all components, data, SVGs, and form logic in one file (1018 lines)
- **Inline SVGs** — icons are hand-written JSX `<svg>` elements, no icon library
- **@/ path alias** — `@` → `src/` (configured in tsconfig + vite.config, but not actually used in code)
- **No router** — hash scrolling for sections + raw HTML for sub-pages

## ANTI-PATTERNS (THIS PROJECT)

- **Adding to App.tsx** — do NOT add new components/sections to App.tsx. Create a separate file in `src/components/` instead.
- **Dead code** — `src/utils/cn.ts` is imported nowhere. Either use it or remove it.
- **Bot role mixing** — `bots/telegram/index.js` mixes HTTP server + bot polling + MAX bridge. New bot functionality should go in separate modules.
- **Form without backend** — Contact form POSTs to `/api/contact` with no error handling (empty catch). If adding a real backend, update the form handler.

## COMMANDS

```bash
npm install          # Install frontend deps
npm run dev          # Vite dev server
npm run build        # Vite production build → dist/
cd bots && npm install && npm run start:telegram   # Start Telegram bot
cd bots && npm install && npm run start:max        # Start MAX bot
```

## NOTES

- The `.opencode/` and `.omo/` directories are AI tooling artifacts, not application code.
- The contact form's `/api/contact` endpoint is served by the Telegram bot HTTP server on port 3001 (proxied by nginx).
- All bot env vars use `dotenv` — configure in `bots/.env` (gitignored). Frontend env vars (unused) in root `.env`.
- **Язык общения** — весь диалог с пользователем ведётся на **русском языке**. Любой агент, читающий этот файл, обязан отвечать пользователю по-русски и учитывать, что проект ориентирован на русскоязычную аудиторию (контент, комментарии, нейминг).
