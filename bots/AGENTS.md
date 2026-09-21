# BOTS KNOWLEDGE BASE

## OVERVIEW

Два Node.js процесса под PM2 в `bots/`:

1. **`contact`** — HTTP-приёмник заявок с сайта (`POST /api/contact`) на порту 3001 (проксируется nginx).
   Заявка сначала сохраняется в файл, затем уходит **письмом по SMTP** владельцу.
2. **`max-bot`** — входящие сообщения мессенджера MAX; уведомление владельцу тоже **письмом**.

> Telegram из проекта убран 21.09.2026: с VPS `api.telegram.org` недоступен, сайт на него больше не ссылается.
> Уведомления идут только по почте. Старый `bots/telegram/` удалён (восстановим из git при необходимости).

## STRUCTURE

```
bots/
├── contact/
│   └── index.js     # HTTP :3001, POST /api/contact → заявка в файл + письмо по SMTP
├── max/
│   └── index.js     # входящие MAX → письмо владельцу
├── mailer.js        # общий SMTP-транспорт (nodemailer), настройки из .env
├── package.json     # отдельные зависимости, CommonJS, без сборки
├── pm2.config.js    # процессы contact и max-bot
├── .env.example     # шаблон переменных (сам .env в git не попадает)
└── leads.ndjson     # заявки про запас (создаётся на сервере, в git не попадает)
```

## WHERE TO LOOK

| Задача | Файл | Заметки |
|--------|------|---------|
| Приём заявки с сайта | `bots/contact/index.js` | POST /api/contact → `leads.ndjson` + письмо |
| Настройки почты | `bots/mailer.js` | `SMTP_HOST/PORT/USER/PASS`, `MAIL_TO` из `bots/.env` |
| Входящие MAX | `bots/max/index.js` | уведомление письмом |
| Список процессов | `bots/pm2.config.js` | `contact`, `max-bot` |
| Переменные окружения | `bots/.env.example` | на сервере заполняется вручную в `bots/.env` |

## CONVENTIONS

- **CommonJS** — `require()`, без `"type": "module"`, без шага сборки
- **Переменные окружения** — через `dotenv` из `bots/.env`; обязателен только `SMTP_PASS`
  (логин и получатель по умолчанию — почта владельца, хост `smtp.yandex.ru:465`)
- **Почта по умолчанию**: отправитель и получатель `chernyakov.k@yandex.ru`
- **Заявка не теряется**: сначала запись в `leads.ndjson`, потом отправка
- **PM2** — `pm2 startOrReload pm2.config.js` (сервер) или `npm run start:contact` / `start:max` (локально)

## ANTI-PATTERNS

- **Возврат уведомлений в Telegram** — без прокси/VPN на VPS это не заработает: `api.telegram.org` недоступен из РФ.
- **Смешивание ролей в одном файле** — HTTP-приём заявок не должен жить рядом с кодом мессенджера (так было в удалённом `telegram/index.js`).
- **Секреты в коде и git** — только `bots/.env` на сервере; в репозиторий попадает лишь `.env.example`.
- **Ложный успех формы** — сервер обязан возвращать не-200, если письмо не ушло; форма покажет ошибку.
