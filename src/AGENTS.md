# src/ KNOWLEDGE BASE

## OVERVIEW

React SPA source — monolithic 1018-line App.tsx containing all UI components, inline SVGs, data, and form logic.

## STRUCTURE

```
src/
├── App.tsx       # All components, SVGs, sections (1018 lines)
├── main.tsx      # React entry point
├── index.css     # Tailwind v4 imports + custom utilities
└── utils/
    └── cn.ts     # clsx+tailwind-merge wrapper — dead code, unused
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| All UI sections | `App.tsx` | Header(341), Hero(447), Pricing(225), FAQ(757), Contact(805) |
| SVG icons | `App.tsx:5–107` | Hand-written JSX `<svg>`, no icon library |
| Styling | `index.css` | Tailwind v4 `@import`, custom bg utilities |
| Contact form | `App.tsx` | POSTs to `/api/contact` (handled by `bots/contact/index.js` → письмо по SMTP) |

## CONVENTIONS

- **No component-per-file** — everything lives in App.tsx
- **Inline SVGs** — hand-written JSX, no external icon library
- **No router** — hash scrolling for single-page navigation
- **@/ alias unused** — configured in tsconfig + vite.config but code uses relative paths

## ANTI-PATTERNS

- **Do not add to App.tsx** — create a separate file in `src/components/` instead
- **Dead utility** — `src/utils/cn.ts` is imported nowhere; remove or use it
