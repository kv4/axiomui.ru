# BOTS KNOWLEDGE BASE

## OVERVIEW

Two Node.js bot processes (Telegram + MAX messenger) managed via PM2, co-located under `bots/`.

## STRUCTURE

```
bots/
├── telegram/
│   └── index.js        # HTTP server (:3001) + Telegram polling + MAX bridge
├── max/
│   └── index.js        # Inbound MAX message handler
├── package.json        # Separate deps, CommonJS, no build step
├── pm2.config.js       # PM2 ecosystem for both processes
└── .env                # Bot tokens/secrets (gitignored)
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Contact form HTTP server | `bots/telegram/index.js` | POST /api/contact → forwards to Telegram admin |
| Telegram polling bot | `bots/telegram/index.js` | Long-polling via node-telegram-bot-api |
| MAX bridge (outbound) | `bots/telegram/index.js` | Sends notifications to MAX when Telegram messages arrive |
| Inbound MAX messages | `bots/max/index.js` | Receives MAX messages, forwards to Telegram admin |
| PM2 process management | `bots/pm2.config.js` | Defines `telegram` and `max` processes |

## CONVENTIONS

- **CommonJS** — use `require()` instead of ES modules, no `package.json` `"type": "module"`
- **No build step** — plain Node.js, run directly with `node`
- **Environment variables** — load via `dotenv` from `bots/.env`
- **PM2 management** — both bots started via `pm2 start pm2.config.js` (root deploy) or `npm run start:telegram` / `npm run start:max` (dev)
- **Separate process isolation** — Telegram and MAX bots run as independent PM2 processes

## ANTI-PATTERNS

- **Mixing concerns in telegram/index.js** — HTTP server, Telegram polling, and MAX bridge all in one file. Extract new functionality into separate modules under `bots/telegram/` or `bots/max/`.
- **Adding to max/index.js** — `bots/max/index.js` should only handle inbound MAX messages. Any cross-cutting logic (Telegram forwarding, admin notification) should live in `bots/telegram/` and be imported.
