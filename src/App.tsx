import { useState, useEffect } from "react";
import OneTimeServices from "./components/OneTimeServices";
import { ReportBar, RiskLegend, Blueprint } from "./components/DesignElements";

// ─── Icons ────────────────────────────────────────────────────────────────────

function MaxIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/>
      <rect x="5" y="6" width="14" height="2" rx="1"/>
      <rect x="5" y="10" width="10" height="2" rx="1"/>
      <rect x="5" y="14" width="12" height="2" rx="1"/>
    </svg>
  );
}

function TelegramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.206 1.084-1.097 3.781-1.55 5.06-.195.55-.422.734-.69.75-.58.036-1.02-.384-1.582-.753-.878-.576-1.382-.934-2.237-1.498-.988-.65-.348-1.007.216-1.59.148-.154 2.708-2.476 2.758-2.686.007-.03.013-.14-.053-.198-.065-.058-.162-.038-.23-.022-.098.023-1.662 1.056-4.69 3.11-.445.306-.846.455-1.205.448-.396-.008-1.154-.223-1.72-.407-.692-.225-1.242-.345-1.194-.727.025-.2.302-.407.83-.617 3.245-1.407 5.412-2.337 6.5-2.786 3.096-1.274 3.738-1.495 4.156-1.501.091-.002.296.021.432.128.115.089.147.21.162.296.015.084.034.276.019.424z" />
    </svg>
  );
}

function MenuIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Кейсы", href: "/portfolio/index.html" },
  { label: "Процесс", href: "#process" },
  { label: "Безопасность", href: "/security.html" },
  { label: "FAQ", href: "#faq" },
];

const PROBLEM_CARDS = [
  {
    code: "П-01",
    title: "«Узкое горлышко» в команде",
    text: "Система держится на одном разработчике. Если он уйдёт — в коде никто не сможет разобраться.",
  },
  {
    code: "П-02",
    title: "Страх изменений",
    text: "Любое мелкое исправление или новая фича ломает старый функционал в самых неожиданных местах.",
  },
  {
    code: "П-03",
    title: "Раздутый бюджет поддержки",
    text: "Расходы на поддержание работоспособности растут быстрее, чем проект развивается и приносит пользу.",
  },
  {
    code: "П-04",
    title: "Рутина вместо ценности",
    text: "Программисты тратят до 40% времени на написание шаблонных тестов, документирование и мелкий рефакторинг.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Знакомство (30 минут)",
    text: "Коротко обсуждаем стек, масштаб системы и ключевые проблемы в формате созвона.",
  },
  {
    num: "02",
    title: "Технический аудит",
    text: "Детально изучаем кодовую базу и выдаем отчет с картой рисков и планом стабилизации.",
  },
  {
    num: "03",
    title: "Стабилизация и обслуживание",
    text: "Фиксируем ежемесячный пул часов и шаг за шагом наводим порядок в системе.",
  },
  {
    num: "04",
    title: "Оптимизация с ИИ",
    text: "Настраиваем инструменты ИИ под ваши процессы и показываем, какие задачи отдавать агентам.",
  },
];

// ─── Pricing data ─────────────────────────────────────────────────────────

const SUBSCRIPTIONS = [
  {
    name: "Базовый",
    hours: "15",
    price: "60 000",
    note: "4 000 ₽/ч при перерасходе",
    features: [
      "Code review критических узлов",
      "Исправление ошибок и уязвимостей",
      "Одна консультация (до 1 ч)",
      "Обновление библиотек и зависимостей",
    ],
    best: false,
  },
  {
    name: "Рабочий",
    hours: "25",
    price: "100 000",
    note: "4 000 ₽/ч при перерасходе",
    features: [
      "Всё из «Базового»",
      "Оптимизация производительности",
      "Документирование архитектуры",
      "Две консультации (до 1 ч каждая)",
      "Приоритетная поддержка в рабочее время",
      "Внедрение ИИ-ассистентов в процессы команды",
    ],
    best: true,
  },
  {
    name: "Полный",
    hours: "40",
    price: "150 000",
    note: "4 000 ₽/ч при перерасходе",
    features: [
      "Всё из «Рабочего»",
      "Проектирование рефакторинга и миграций",
      "Внедрение ИИ-агентов",
      "Безлимитные консультации",
      "Приоритетная поддержка",
      "План развития архитектуры системы",
      "ИИ-агенты для тестов, ревью и документации",
    ],
    best: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="border-t border-hairline bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">

        <SectionHeader eyebrow="Цены" title="Прозрачные тарифы" />

        {/* One-time services */}
        <OneTimeServices />

        {/* Subscriptions */}
        <div className="mt-6 grid grid-cols-1 border border-hairline bg-surface sm:grid-cols-3">
          {SUBSCRIPTIONS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col border-hairline p-7 sm:[&:not(:first-child)]:border-l ${
                plan.best ? "bg-ink text-paper" : "bg-surface"
              }`}
            >
              {plan.best && (
                <div className="mb-3 self-start bg-signal px-2 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.1em] text-paper">
                  Рекомендуем
                </div>
              )}

              <div className={`font-mono text-[11px] uppercase tracking-[0.1em] ${plan.best ? "text-paper/70" : "text-ink-50"}`}>
                Подписка
              </div>

              <h3 className={`mt-1 text-2xl font-black uppercase tracking-tight ${plan.best ? "text-paper" : "text-ink"}`}>
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className={`text-3xl font-black tracking-tight ${plan.best ? "text-paper" : "text-ink"}`}>
                  {plan.price}
                </span>
                <span className={`text-[15px] font-medium ${plan.best ? "text-paper/70" : "text-ink-70"}`}>
                  ₽/мес
                </span>
              </div>

              <div className={`mt-0.5 font-mono text-[12px] uppercase tracking-[0.08em] ${plan.best ? "text-paper/70" : "text-ink-50"}`}>
                {plan.hours} часов
              </div>

              <div className={`mt-3 font-mono text-[11px] tracking-[0.05em] ${plan.best ? "text-paper/70" : "text-ink-50"}`}>
                {plan.note}
              </div>

              <ul className={`mt-5 space-y-2.5 border-t pt-5 ${plan.best ? "border-white/20" : "border-hairline"}`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] font-medium leading-relaxed">
                    <span className={`mt-0.5 font-mono font-bold ${plan.best ? "text-signal" : "text-signal"}`}>+</span>
                    <span className={plan.best ? "text-paper/90" : "text-ink-70"}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <a
                  href="#contact"
                  className={`ax-btn w-full ${plan.best ? "ax-btn-ghost border-paper bg-paper !text-ink hover:!bg-signal hover:!border-signal hover:!text-paper" : "ax-btn-ghost"}`}
                >
                  {plan.best ? "Выбрать" : "Узнать подробнее"}
                  <ArrowIcon />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "Почему проект называется AxiomUI, если вы занимаетесь бэкендом и ИИ?",
    a: "UI в названии — историческое наследие. Мы не делаем интерфейсы: наш фокус — аудит legacy-систем, стабилизация бэкенда и внедрение ИИ-агентов в процессы разработки. Название менять не планируем — нас уже знают под ним.",
  },
  {
    q: "Безопасно ли использовать ИИ? Наш код не уйдёт в открытый доступ?",
    a: "Штатно мы работаем через корпоративные API провайдеров (OpenAI, DeepSeek, Anthropic) — по условиям их соглашений ваши данные не сохраняются и не используются для обучения моделей, плюс всё шифруется. Для большинства проектов этого достаточно. Если же ваша политика безопасности требует, чтобы данные физически не покидали ваш контур — мы развернём выделенную LLM-модель внутри вашей инфраструктуры. Подробнее — на странице «Безопасность ИИ».",
  },
  {
    q: "Что если система упадёт ночью? Вы приедете чинить?",
    a: "Наша цель — превентивное обслуживание, чтобы падений не происходило. Мы не дежурим по ночам в режиме 24/7. Но при сопровождении мы настраиваем автоматическое самовосстановление серверов и пишем понятные пошаговые инструкции для дежурных. Типовые проблемы решаются автоматически или силами вашего администратора.",
  },
  {
    q: "Сколько стоят ваши услуги?",
    a: "Экспресс-аудит стоит фиксированно по размеру системы: один сайт — 90 000 ₽, сайт + портал/ERP (или 4–8 интеграций) — 120 000 ₽, несколько систем (или 9+ интеграций) — 150 000 ₽. Размер системы определим по короткой анкете, цена фиксируется до начала работ и не меняется. Регулярное сопровождение и оптимизация — по ежемесячной подписке (пакеты от 15 до 40 часов в месяц).",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-6 px-5 lg:px-8">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-3.5 no-underline">
          <span className="relative flex h-9 w-9 items-center justify-center border-2 border-ink font-mono text-[15px] font-bold text-ink">
            A
            <span className="absolute -bottom-1.5 -right-1.5 h-2 w-2 bg-signal" />
          </span>
          <span className="leading-tight">
            <span className="block text-[16px] font-black uppercase tracking-tight text-ink">AxiomUI</span>
            <span className="block font-mono text-[9.5px] uppercase tracking-[0.09em] text-ink-50">Аудит legacy-кода, стабилизация и ИИ-агенты</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center md:flex" aria-label="Основная навигация">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border-l border-hairline px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-70 no-underline transition-colors hover:bg-recessed hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://max.ru/id141002165689_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-hairline bg-surface px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-ink no-underline transition-colors hover:border-ink hover:bg-recessed"
          >
            <MaxIcon className="h-4 w-4" />
            MAX
          </a>
          <a
            href="https://t.me/AxiomUIBot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-hairline bg-surface px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-ink no-underline transition-colors hover:border-ink hover:bg-recessed"
          >
            <TelegramIcon className="h-4 w-4" />
            Telegram
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="p-2 text-ink hover:bg-recessed md:hidden"
          aria-label="Меню"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-hairline bg-surface px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-hairline px-2 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-ink no-underline hover:text-signal"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <a
                href="https://max.ru/id141002165689_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="ax-btn ax-btn-ghost w-full"
              >
                <MaxIcon className="h-4 w-4" />
                Написать в MAX
              </a>
              <a
                href="https://t.me/AxiomUIBot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="ax-btn ax-btn-solid w-full"
              >
                <TelegramIcon className="h-4 w-4" />
                Написать в Telegram
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-14 sm:pt-20 lg:grid-cols-[7fr_5fr] lg:pb-20 lg:pt-24 lg:px-8">
        <div>
          <div className="ax-kicker ax-mono text-ink-70">Аудит и стабилизация legacy-систем</div>

          <h1 className="mt-7 text-balance text-[clamp(2.3rem,5.2vw,4.4rem)] font-black uppercase leading-[0.97] tracking-[-0.03em] text-ink">
            Стабилизируем legacy-систему и посчитаем, во что она обходится<span className="text-signal">.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-ink-70">
            Сначала аудит и карта рисков, потом плановое сопровождение и ИИ-агенты в вашей команде.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a href="#contact" className="ax-btn ax-btn-solid">
              Записаться на диагностику
              <ArrowIcon />
            </a>
            <a href="#services" className="ax-btn ax-btn-ghost">
              Узнать подробнее об услугах
            </a>
          </div>

          {/* Trust text */}
          <p className="ax-mono mt-6 flex items-center gap-2.5 normal-case tracking-normal text-ink-50">
            <span className="inline-block h-2.5 w-2.5 bg-mark-green" />
            Диагностика — 30 минут по видеосвязи. Без доступа к коду. Без обязательств.
          </p>
        </div>

        <Blueprint />
      </div>
    </section>
  );
}

function TargetAudience() {
  return (
    <section className="border-b border-hairline bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader eyebrow="Вы здесь" title="Кому подойдут наши услуги" />
        <div className="grid grid-cols-1 gap-0 border-t-2 border-ink sm:grid-cols-3">
          {[
            [
              "У вас legacy-код, который «страшно трогать»?",
              "Проведём аудит, составим план стабилизации и будем планомерно приводить систему в порядок без аварий.",
            ],
            [
              "Вы зависите от одного ключевого разработчика?",
              "Снимем зависимость от одного человека: документация, тесты, автоматическое ревью.",
            ],
            [
              "Хотите внедрить ИИ в разработку, но не знаете, с чего начать?",
              "Настроим ИИ-инструменты под ваш стек и покажем, какие задачи отдавать агентам.",
            ],
          ].map(([title, desc], i) => (
            <div key={title} className="border border-t-0 border-hairline bg-surface p-7 sm:[&:not(:first-child)]:border-l-0">
              <div className="ax-mono font-bold text-signal">0{i + 1}</div>
              <p className="mt-3 text-[15.5px] font-bold leading-relaxed text-ink">{title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-10 border-t-2 border-ink pt-4 sm:mb-14">
      {eyebrow && (
        <div className="ax-mono font-bold text-signal">{eyebrow}</div>
      )}
      <h2 className="mt-3 max-w-3xl text-balance text-[clamp(1.65rem,3.4vw,2.6rem)] font-black uppercase leading-[1.03] tracking-[-0.02em] text-ink">
        {title}
      </h2>
    </div>
  );
}

function Problems() {
  return (
    <section id="problems" className="border-b border-hairline bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Проблематика"
          title="С какими проблемами чаще всего сталкивается бизнес с legacy-кодом?"
        />

        <div className="grid grid-cols-1 gap-0 border-y-2 border-ink sm:grid-cols-2">
          {PROBLEM_CARDS.map((card, i) => (
            <div
              key={card.code}
              className={`border border-x-0 border-hairline bg-surface p-7 sm:p-8 ${
                i % 2 === 0 ? "sm:border-l-0" : "sm:border-r-0"
              } ${i > 1 ? "border-t" : "sm:border-t-0"} ${i === 1 ? "sm:border-b-0" : ""} ${i < 2 ? "border-b sm:border-b" : ""}`}
            >
              <div className="flex justify-between font-mono text-[10.5px] uppercase tracking-[0.09em] text-ink-50">
                <span>
                  Симптом <b className="font-bold text-signal">{card.code}</b>
                </span>
              </div>
              <h3 className="mt-3.5 text-[19px] font-extrabold leading-snug tracking-[-0.01em] text-ink">{card.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-70">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="border-b border-hairline bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Услуги"
          title="Два направления: аудит legacy и ИИ-агенты в разработке"
        />

        <div className="grid grid-cols-1 gap-0 border-y-2 border-ink lg:grid-cols-2">
          {/* Card 1: Legacy */}
          <div className="border border-x-0 border-hairline bg-surface p-8 sm:p-10 lg:border-r-0">
            <span className="inline-block border border-signal px-2.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-signal">
              Направление 1
            </span>

            <h3 className="mt-5 text-[clamp(1.35rem,2.2vw,1.65rem)] font-black uppercase leading-[1.12] tracking-[-0.015em] text-ink">
              Аудит и эволюционная поддержка legacy-кода
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-70">
              Стабилизируем то, что уже работает и приносит прибыль, не пытаясь переписать всё с нуля.
            </p>

            <ul className="mt-6 border-t border-hairline">
              {[
                ["Глубокий технический аудит", "Выявление уязвимостей, узких мест производительности и скрытых зависимостей"],
                ["Снятие зависимости от авторов кода", "Покрытие критических узлов тестами и документирование архитектуры"],
                ["Плановое сопровождение", "Исправление ошибок, обновление библиотек и постепенный рефакторинг по согласованному регламенту"],
              ].map(([bold, text]) => (
                <li key={bold} className="grid grid-cols-[26px_1fr] gap-2.5 border-b border-hairline py-3.5 text-[15px]">
                  <span className="mt-0.5 font-mono font-bold text-signal">+</span>
                  <span className="text-ink-70">
                    <b className="font-bold text-ink">{bold}.</b> {text}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 border border-hairline bg-recessed p-4 text-[14px] leading-relaxed text-ink-70">
              <b className="font-bold text-ink">Как мы работаем:</b> Мы работаем по плановому графику и не занимаемся ночными аварийными вызовами. Мы настраиваем систему так, чтобы аварии не происходили.
            </p>
          </div>

          {/* Card 2: AI */}
          <div className="border border-x-0 border-t-0 border-hairline bg-surface p-8 sm:p-10 lg:border-t lg:border-l">
            <span className="inline-block border border-ink px-2.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-ink">
              Направление 2
            </span>

            <h3 className="mt-5 text-[clamp(1.35rem,2.2vw,1.65rem)] font-black uppercase leading-[1.12] tracking-[-0.015em] text-ink">
              Внедрение ИИ-агентов в процессы разработки{" "}
              <span className="font-mono text-[13px] font-bold normal-case tracking-normal text-signal">ИИ в разработке</span>
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-70">
              Внедряем ИИ-агентов в рутину: тесты, документация, ревью.
            </p>

            <ul className="mt-6 border-t border-hairline">
              {[
                ["Интеграция ИИ-ассистентов", "Настройка рабочих мест разработчиков для генерации качественного кода по вашим стандартам"],
                ["Автоматизация рутинных задач", "Внедрение ИИ-агентов для автогенерации тестов, документирования и анализа пулл-реквестов"],
                ["Обучение методологии", "Агенты забирают рутину, и новые функции выходят быстрее"],
              ].map(([bold, text]) => (
                <li key={bold} className="grid grid-cols-[26px_1fr] gap-2.5 border-b border-hairline py-3.5 text-[15px]">
                  <span className="mt-0.5 font-mono font-bold text-signal">+</span>
                  <span className="text-ink-70">
                    <b className="font-bold text-ink">{bold}</b> — {text}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 border border-hairline bg-recessed p-4 text-[14px] leading-relaxed text-ink-70">
              <b className="font-bold text-ink">Результат:</b> Тесты, документацию и ревью делают агенты — в нашем кейсе ревью ускорилось на 60%.
            </p>

            <a
              href="/security.html"
              className="mt-5 inline-flex items-center gap-2 border-b-2 border-signal pb-1 font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-ink no-underline hover:text-signal"
            >
              О безопасности данных
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CasesTeaser() {
  return (
    <section className="border-b border-hairline bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader eyebrow="Кейсы" title="Реальные проекты" />

        <p className="-mt-6 mb-10 max-w-3xl text-[15px] leading-relaxed text-ink-70 sm:mb-14">
          Эти проекты сделаны без расширения команды: рутину выполняли ИИ-агенты.
        </p>

        <div className="grid grid-cols-1 gap-0 border-y-2 border-ink sm:grid-cols-3">
          <a href="/portfolio/react-dashboard.html" className="group flex flex-col border border-x-0 border-hairline bg-surface p-7 no-underline transition-colors hover:bg-recessed sm:border-l-0">
            <div className="mb-2 inline-block self-start border border-hairline bg-paper px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.09em] text-ink-70">
              Аудит и миграция legacy
            </div>
            <h3 className="mt-2 text-[19px] font-extrabold leading-snug text-ink group-hover:text-signal">
              Аналитические дашборды переписали на React
            </h3>
            <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-70">
              Замена 157 устаревших Drupal-параграфов на 41 React-компонент с JSONB-хранением и drag-and-drop виджетами. Время добавления нового индикатора сократилось с 2 дней до 15 минут.
            </p>
            <p className="mt-4 border-t-2 border-ink pt-3 font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-ink group-hover:text-signal">
              Читать далее →
            </p>
          </a>

          <a href="/portfolio/ai-agents.html" className="group flex flex-col border border-x-0 border-hairline bg-surface p-7 no-underline transition-colors hover:bg-recessed sm:border-x">
            <div className="mb-2 inline-block self-start border border-hairline bg-paper px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.09em] text-ink-70">
              ИИ-агенты и автоматизация
            </div>
            <h3 className="mt-2 text-[19px] font-extrabold leading-snug text-ink group-hover:text-signal">
              Автоматизация разработки через ИИ-агентов
            </h3>
            <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-70">
              11 ИИ-агентов вели разработку — от плана задачи до ревью. Code review ускорен на 60%, 138 планов задач созданы без единой просрочки.
            </p>
            <p className="mt-4 border-t-2 border-ink pt-3 font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-ink group-hover:text-signal">
              Читать далее →
            </p>
          </a>

          <a href="/portfolio/bank-k8s.html" className="group flex flex-col border border-x-0 border-hairline bg-surface p-7 no-underline transition-colors hover:bg-recessed sm:border-r-0">
            <div className="mb-2 inline-block self-start border border-hairline bg-paper px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.09em] text-ink-70">
              DevOps и инфраструктура
            </div>
            <h3 className="mt-2 text-[19px] font-extrabold leading-snug text-ink group-hover:text-signal">
              Legacy Drupal в банковском Kubernetes
            </h3>
            <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-70">
              Rootless-контейнеры, многоэтапная сборка, 40+ env-переменных вместо settings.php. Деплой ускорился с 2–3 часов до 8–12 минут.
            </p>
            <p className="mt-4 border-t-2 border-ink pt-3 font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-ink group-hover:text-signal">
              Читать далее →
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-hairline bg-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-hairline border-x border-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {["Аудит legacy-систем", "Внедрение ИИ-агентов", "Плановая поддержка без аварий"].map((s) => (
          <div key={s} className="flex items-center gap-3 bg-surface px-6 py-6">
            <span className="inline-block h-2 w-2 shrink-0 bg-signal" />
            <span className="font-mono text-[12.5px] font-bold uppercase tracking-[0.06em] text-ink">{s}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="border-b border-hairline bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Процесс"
          title="Прозрачный процесс работы"
        />

        {/* Timeline */}
        <div className="grid grid-cols-1 gap-0 border-y-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`flex flex-col border border-x-0 border-hairline bg-surface p-7 ${
                i === 0 ? "sm:border-l-0" : "sm:border-l"
              } ${i > 0 ? "border-t sm:border-t-0" : ""} ${i === 1 ? "sm:border-r-0 lg:border-r" : ""} ${i === 2 ? "sm:border-b-0" : ""}`}
            >
              <div className="text-[52px] font-black leading-none tracking-[-0.04em] text-ink">
                0<span className="text-signal">{step.num[1]}</span>
              </div>
              <h3 className="mt-4 text-[16.5px] font-extrabold leading-snug text-ink">{step.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-70">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-hairline bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Частые вопросы"
        />

        <div className="border-y-2 border-ink bg-surface">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-b border-hairline last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[1fr_40px] items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-recessed sm:px-7"
                >
                  <span className="text-[16px] font-extrabold leading-snug text-ink">
                    {item.q}
                  </span>
                  <span className={`text-right font-mono text-[18px] font-bold ${isOpen ? "text-signal" : "text-ink"}`}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden px-6 transition-all duration-300 ease-in-out sm:px-7 ${
                    isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="max-w-2xl text-[15px] leading-relaxed text-ink-70">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle"); // status
  const [statusMessage, setStatusMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    if (!form.name.trim() || !form.contact.trim()) {
      setStatus("error");
      setStatusMessage("Пожалуйста, заполните имя и контактные данные.");
      return;
    }
    setSubmitted(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          message: form.message,
        }),
      });
    } catch (_) {
      setStatus("error");
      setStatusMessage("Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз или свяжитесь через Telegram/MAX.");
    }
  };

  return (
    <section id="contact" className="border-b border-hairline bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid grid-cols-1 border-y-2 border-ink lg:grid-cols-[5fr_7fr]">
          <div className="bg-ink p-8 text-paper sm:p-11">
            <div className="ax-mono flex items-center gap-2.5 text-[#B4AFA2]">
              <span className="inline-block h-2 w-2 bg-mark-green" />
              Бесплатная диагностика
            </div>
            <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.3rem)] font-black uppercase leading-[1.05] tracking-[-0.02em] text-paper">
              Запишитесь на бесплатную 30-минутную диагностику
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#B4AFA2]">
              Расскажите о ваших текущих задачах. На созвоне мы подскажем, с чего начать стабилизацию системы и как можно сократить расходы на команду.
            </p>
            <div className="mt-8 border-t border-[#3D3A34] pt-6">
              <div className="ax-mono text-[#8C877B]">Мессенджеры</div>
              <div className="mt-3 flex flex-col gap-2.5">
                <a
                  href="https://t.me/AxiomUIBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 self-start border-b border-[#55503F] pb-1 text-[16px] font-semibold text-paper no-underline hover:border-signal hover:text-white"
                >
                  <TelegramIcon className="h-4.5 w-4.5" />
                  Написать в Telegram
                </a>
                <a
                  href="https://max.ru/id141002165689_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 self-start border-b border-[#55503F] pb-1 text-[16px] font-semibold text-paper no-underline hover:border-signal hover:text-white"
                >
                  <MaxIcon className="h-4.5 w-4.5" />
                  Написать в MAX
                </a>
              </div>
            </div>
          </div>

          <div className="bg-surface p-8 sm:p-11">
            {submitted ? (
              <div className="mt-4 border-2 border-mark-green bg-paper p-9">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-4 w-4 bg-mark-green" />
                  <h3 className="text-lg font-black uppercase text-ink">Заявка отправлена</h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-70">
                  Мы свяжемся с вами в ближайшее время, обычно в течение 24 часов.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="ax-mono mb-2 block text-ink-50">
                    Имя
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Константин"
                    className="w-full border-0 border-b-2 border-ink bg-paper px-1 py-3 text-[16px] text-ink placeholder:text-[#A8A294] focus:border-signal focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-field" className="ax-mono mb-2 block text-ink-50">
                    Telegram или Email
                  </label>
                  <input
                    id="contact-field"
                    type="text"
                    required
                    autoComplete="email"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="@username или name@company.com"
                    className="w-full border-0 border-b-2 border-ink bg-paper px-1 py-3 text-[16px] text-ink placeholder:text-[#A8A294] focus:border-signal focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="ax-mono mb-2 block text-ink-50">
                    Краткое описание проекта
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    autoComplete="off"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Опишите стек технологий и основные технические проблемы (например: медленный бэкенд, уход ключевого разработчика, необходимость внедрения ИИ)..."
                    className="w-full resize-none border-0 border-b-2 border-ink bg-paper px-1 py-3 text-[16px] text-ink placeholder:text-[#A8A294] focus:border-signal focus:outline-none"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#161310]"
                  />
                  <span className="text-[13px] leading-relaxed text-ink-50">
                    Я согласен на обработку моих персональных данных в соответствии с{' '}
                    <a href="/privacy.html" target="_blank" className="text-ink underline hover:text-signal">Политикой конфиденциальности</a>
                  </span>
                </label>

                {status === "error" && (
                  <p className="font-mono text-[13px] font-bold text-signal">{statusMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={!consent}
                  className="ax-btn ax-btn-solid w-full"
                >
                  Отправить заявку
                  <ArrowIcon className="h-5 w-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-paper py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 sm:flex-row sm:items-center lg:px-8">
        <div className="flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center border-2 border-ink font-mono text-[12px] font-bold text-ink">
            Ax
          </span>
          <div className="text-[14px] font-medium text-ink-70">
            <span className="font-black uppercase text-ink">AxiomUI</span>
            <span className="mx-2 text-hairline">·</span>
            © 2026 AxiomUI
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-50">
          <a href="/portfolio/index.html" className="no-underline hover:text-signal">Кейсы</a>
          <a href="/security.html" className="no-underline hover:text-signal">Безопасность ИИ</a>
          <a href="/privacy.html" className="no-underline hover:text-signal">Политика конфиденциальности</a>
          <a href="/terms.html" className="no-underline hover:text-signal">Условия использования</a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const retry = (n: number) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else if (n > 0) setTimeout(() => retry(n - 1), 200);
    };
    retry(10);
  }, []);

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <ReportBar />
      <Header />
      <main>
        <Hero />
        <TargetAudience />
        <Problems />
        <section className="border-b border-hairline bg-recessed py-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-5 text-center lg:px-8">
            <h3 className="text-xl font-black uppercase tracking-tight text-ink">Готовы обсудить ваш проект?</h3>
            <a
              href="https://t.me/AxiomUIBot"
              target="_blank"
              rel="noopener noreferrer"
              className="ax-btn ax-btn-solid"
            >
              <TelegramIcon className="h-4 w-4" />
              Связаться в Telegram
            </a>
          </div>
        </section>
        <Services />
        <CasesTeaser />
        <Stats />
        <Process />
        <Pricing />
        <RiskLegend />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
