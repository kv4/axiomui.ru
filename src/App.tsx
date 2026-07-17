import { useState, useEffect } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

function TelegramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.206 1.084-1.097 3.781-1.55 5.06-.195.55-.422.734-.69.75-.58.036-1.02-.384-1.582-.753-.878-.576-1.382-.934-2.237-1.498-.988-.65-.348-1.007.216-1.59.148-.154 2.708-2.476 2.758-2.686.007-.03.013-.14-.053-.198-.065-.058-.162-.038-.23-.022-.098.023-1.662 1.056-4.69 3.11-.445.306-.846.455-1.205.448-.396-.008-1.154-.223-1.72-.407-.692-.225-1.242-.345-1.194-.727.025-.2.302-.407.83-.617 3.245-1.407 5.412-2.337 6.5-2.786 3.096-1.274 3.738-1.495 4.156-1.501.091-.002.296.021.432.128.115.089.147.21.162.296.015.084.034.276.019.424z" />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function MenuIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function IconBottleneck() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function IconBudget() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  );
}

function IconRoutine() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </svg>
  );
}

function IconAI() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Кейсы", href: "/cases/index.html" },
  { label: "Процесс", href: "#process" },
  { label: "Безопасность", href: "/security.html" },
  { label: "FAQ", href: "#faq" },
];

const PROBLEM_CARDS = [
  {
    icon: <IconBottleneck />,
    title: "«Узкое горлышко» в команде",
    text: "Система держится на одном разработчике. Если он уйдет — в коде никто не сможет разобраться.",
  },
  {
    icon: <IconLock />,
    title: "Страх изменений",
    text: "Любое мелкое исправление или новая фича ломает старый функционал в самых неожиданных местах.",
  },
  {
    icon: <IconBudget />,
    title: "Раздутый бюджет поддержки",
    text: "Расходы на поддержание работоспособности растут быстрее, чем проект развивается и приносит пользу.",
  },
  {
    icon: <IconRoutine />,
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
    text: "Фиксируем ежемесячный пул часов (Retainer) и планомерно приводим систему в порядок.",
  },
  {
    num: "04",
    title: "Оптимизация с ИИ",
    text: "Настраиваем инструменты ИИ-агентов под ваши задачи и обучаем команду работать эффективнее.",
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
      "Приоритетная поддержка с быстрым SLA",
      "Стратегическое планирование",
    ],
    best: false,
  },
];

const ONE_TIME = [
  {
    name: "Экспресс-анализ",
    price: "Бесплатно",
    desc: "30-минутный созвон и предварительная оценка вашего проекта",
  },
  {
    name: "Техническое обследование",
    price: "от 30 000 ₽",
    desc: "Полный анализ репозитория, поиск узких мест и отчёт с рекомендациями",
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-slate-300 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">

        <SectionHeader eyebrow="Цены" title="Прозрачные тарифы" />

        {/* One-time services */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {ONE_TIME.map((item) => (
            <div
              key={item.name}
              className="flex flex-col rounded-xl border-2 border-indigo-200 bg-white p-7 shadow-sm transition-all hover:border-indigo-400"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700">{item.desc}</p>
                </div>
                <span className="shrink-0 text-lg font-bold text-indigo-600">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Subscriptions */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SUBSCRIPTIONS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border-2 p-7 shadow-sm transition-all ${
                plan.best
                  ? "border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                  : "border-slate-300 bg-white hover:border-indigo-300"
              }`}
            >
              {plan.best && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-900 shadow-sm">
                  Рекомендуем
                </div>
              )}

              <div className={`${plan.best ? "text-white" : "text-slate-700"} mb-1 text-[14px] font-semibold uppercase tracking-wider`}>
                Подписка
              </div>

              <h3 className={`text-2xl font-bold tracking-tight ${plan.best ? "text-white" : "text-slate-900"}`}>
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className={`text-3xl font-bold ${plan.best ? "text-white" : "text-indigo-600"}`}>
                  {plan.price}
                </span>
                <span className={`text-[15px] font-medium ${plan.best ? "text-indigo-200" : "text-slate-600"}`}>
                  ₽/мес
                </span>
              </div>

              <div className={`mt-0.5 text-[13px] font-medium ${plan.best ? "text-indigo-200" : "text-slate-500"}`}>
                {plan.hours} часов
              </div>

              <div className={`mt-4 text-[12px] font-medium ${plan.best ? "text-indigo-200" : "text-slate-500"}`}>
                {plan.note}
              </div>

              <ul className="mt-5 space-y-3 border-t pt-5" style={plan.best ? { borderColor: "rgba(255,255,255,0.2)" } : {}}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] font-medium leading-relaxed">
                    <CheckIcon className={`mt-0.5 h-4 w-4 shrink-0 ${plan.best ? "text-indigo-200" : "text-indigo-500"}`} />
                    <span className={plan.best ? "text-indigo-100" : "text-slate-700"}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <a
                  href="#contact"
                  className={`flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-[14px] font-bold transition-all ${
                    plan.best
                      ? "bg-white text-indigo-700 hover:bg-indigo-50"
                      : "border-2 border-indigo-600 bg-white text-indigo-700 hover:bg-indigo-50"
                  }`}
                >
                  {plan.best ? "Выбрать" : "Узнать подробнее"}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
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
    q: "Безопасно ли использовать ИИ? Наш код не уйдет в открытый доступ?",
    a: "Штатно мы работаем через корпоративные API ведущих провайдеров (OpenAI, DeepSeek, Anthropic) — по условиям их соглашений ваши данные не сохраняются и не используются для обучения моделей (zero-retention policy), плюс всё шифруется. Этого достаточно для 95% проектов. Если же ваша политика безопасности требует, чтобы данные физически не покидали ваш контур — мы развернём выделенную LLM-модель внутри вашей инфраструктуры. Подробнее — на странице «Безопасность ИИ».",
  },
  {
    q: "Что если система упадет ночью? Вы приедете чинить?",
    a: "Наша цель — превентивное обслуживание, чтобы падений не происходило. Мы не дежурим по ночам в режиме 24/7. Однако в рамках сопровождения мы настраиваем автоматическое самовосстановление серверов и пишем понятные пошаговые инструкции (Runbooks) для поддержки вашего хостинга, чтобы проблемы решались автоматически или силами дежурного админа.",
  },
  {
    q: "Сколько стоят ваши услуги?",
    a: "Первичный аудит оценивается фиксированно по результатам предварительного созвона. Регулярное плановое сопровождение и работы по оптимизации строятся по ежемесячной подписке (пакеты от 15 до 40 часов в месяц).",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-300 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/25 ring-1 ring-indigo-500/15">
            <span className="text-[14px] font-bold tracking-tight text-white">Ax</span>
          </div>
          <div className="leading-tight">
            <div className="text-[16px] font-bold tracking-tight text-slate-900">AxiomUI</div>
            <div className="text-[12px] font-medium text-slate-600">Аудит legacy-кода и AI-агенты</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-semibold text-slate-700 transition-colors hover:text-indigo-600"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-lg border border-slate-300 bg-white px-4.5 py-2.5 text-[14px] font-semibold text-slate-800 shadow-sm transition-all hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 md:inline-flex"
        >
          <TelegramIcon className="h-4.5 w-4.5" />
          Связаться в Telegram
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-slate-800 hover:bg-slate-100 md:hidden"
          aria-label="Меню"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-indigo-600"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-[15px] font-semibold text-white shadow-sm shadow-indigo-500/20 hover:bg-indigo-500"
            >
              <TelegramIcon className="h-4.5 w-4.5" />
              Связаться в Telegram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-radial-glow" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-200/50 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 -z-10 h-[280px] w-[280px] rounded-full bg-violet-200/60 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-14 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300 bg-indigo-50 px-4 py-2 text-[13px] font-bold text-indigo-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            ИТ-консалтинг для разумного бизнеса
          </div>

          <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Стабилизируем ваши legacy-системы{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              и сократим издержки на ИТ
            </span>{" "}
            с помощью ИИ-агентов
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
            Профессиональный технический аудит кодовой базы, плановое сопровождение без «тушения пожаров» и интеграция современных AI-assisted инструментов в вашу команду разработки.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/35"
            >
              Провести экспресс-анализ
              <svg className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-7 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50"
            >
              Узнать подробнее об услугах
            </a>
          </div>

          {/* Trust text */}
          <p className="mt-6 text-[14px] font-medium text-slate-600">
            <span className="mr-2 inline-flex h-2.5 w-2.5 translate-y-[-1px] rounded-full bg-emerald-500"></span>
            Анализ проекта займет всего 30 минут в формате созвона. Без обязательств.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, eyebrowColor }: { eyebrow?: string; title: string; eyebrowColor?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <div className={`text-[13px] font-bold uppercase tracking-widest ${eyebrowColor || "text-indigo-600"}`}>
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[40px]">
        {title}
      </h2>
    </div>
  );
}

function Problems() {
  return (
    <section id="problems" className="relative border-t border-slate-300 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Проблематика"
          title="С какими проблемами чаще всего сталкивается бизнес с legacy-кодом?"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROBLEM_CARDS.map((card, i) => (
            <div
              key={i}
              className="group rounded-xl border border-slate-300 bg-white p-7 shadow-sm transition-all hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/60"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-600 transition-colors group-hover:border-indigo-300 group-hover:bg-indigo-100 group-hover:text-indigo-700">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-2.5 text-[15px] font-medium leading-relaxed text-slate-700">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative border-t border-slate-300 bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-40 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-100/60 blur-[120px]" />
      <div className="pointer-events-none absolute left-0 bottom-20 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-100/50 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Услуги"
          title="Два шага к стабильности и эффективности вашей разработки"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Card 1: Legacy */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white p-8 shadow-sm transition-all hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-100/70 sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-100/70 blur-[80px] transition-opacity group-hover:opacity-100" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600">
                <IconCode />
              </div>
              <div className="text-[13px] font-bold uppercase tracking-widest text-indigo-600">
                Направление 1
              </div>
            </div>

            <h3 className="relative mt-6 text-2xl font-bold leading-snug text-slate-900 sm:text-[26px]">
              Аудит и эволюционная поддержка legacy-кода
            </h3>
            <p className="relative mt-4 text-[15px] font-medium leading-relaxed text-slate-700">
              Стабилизируем то, что уже работает и приносит прибыль, не пытаясь переписать всё с нуля.
            </p>

            <ul className="relative mt-7 space-y-4">
              {[
                ["Глубокий технический аудит", "Выявление уязвимостей, узких мест производительности и скрытых зависимостей"],
                ["Снятие зависимости от авторов кода", "Покрытие критических узлов тестами и документирование архитектуры"],
                ["Плановое сопровождение", "Исправление ошибок, обновление библиотек и постепенный рефакторинг по согласованному регламенту"],
              ].map(([bold, text]) => (
                <li key={bold} className="flex gap-3">
                  <CheckIcon className="mt-0.5 h-5.5 w-5.5 flex-shrink-0 text-indigo-600" />
                  <span className="text-[15px] font-medium leading-relaxed text-slate-800">
                    <span className="font-bold text-slate-900">{bold}.</span> {text}
                  </span>
                </li>
              ))}
            </ul>

            <p className="relative mt-8 rounded-lg border border-slate-300 bg-slate-50 p-5 text-[14px] font-medium leading-relaxed text-slate-800">
              <span className="font-bold text-slate-900">Как мы работаем:</span> Мы работаем по плановому графику и не занимаемся ночными аварийными вызовами. Мы настраиваем систему так, чтобы аварии не происходили.
            </p>
          </div>

          {/* Card 2: AI */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white p-8 shadow-sm transition-all hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-100/70 sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-100/70 blur-[80px] transition-opacity group-hover:opacity-100" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600">
                <IconAI />
              </div>
              <div className="text-[13px] font-bold uppercase tracking-widest text-emerald-600">
                Направление 2
              </div>
            </div>

            <h3 className="relative mt-6 text-2xl font-bold leading-snug text-slate-900 sm:text-[26px]">
              Внедрение ИИ-агентов в процессы разработки{" "}
              <span className="text-[15px] font-bold text-emerald-600">AI-Assisted Dev</span>
            </h3>
            <p className="relative mt-4 text-[15px] font-medium leading-relaxed text-slate-700">
              Помогаем команде использовать возможности ИИ на полную мощность, снижая стоимость разработки.
            </p>

            <ul className="relative mt-7 space-y-4">
              {[
                ["Интеграция ИИ-ассистентов", "Настройка рабочих мест разработчиков для генерации качественного кода по вашим стандартам"],
                ["Автоматизация рутинных задач", "Внедрение ИИ-агентов для автогенерации тестов, документирования и анализа пулл-реквестов"],
                ["Обучение методологии", "Снижение времени вывода новых функций на рынок за счет правильного использования LLM-инструментов"],
              ].map(([bold, text]) => (
                <li key={bold} className="flex gap-3">
                  <CheckIcon className="mt-0.5 h-5.5 w-5.5 flex-shrink-0 text-emerald-600" />
                  <span className="text-[15px] font-medium leading-relaxed text-slate-800">
                    <span className="font-bold text-slate-900">{bold}</span> — {text}
                  </span>
                </li>
              ))}
            </ul>

            <p className="relative mt-8 rounded-lg border border-slate-300 bg-slate-50 p-5 text-[14px] font-medium leading-relaxed text-slate-800">
              <span className="font-bold text-slate-900">Результат:</span> Ваша команда начнет работать быстрее и эффективнее, фокусируясь на бизнес-логике, а не на рутине.
            </p>

            <a
              href="/security.html"
              className="relative mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-emerald-700 transition-colors hover:text-emerald-600"
            >
              О безопасности данных
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CasesTeaser() {
  return (
    <section className="relative border-t border-slate-300 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader eyebrow="Кейсы" title="Реальные проекты" />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <a href="/cases/react-dashboard.html" className="group block rounded-2xl border-2 border-slate-300 bg-white p-7 shadow-sm transition-all hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100/50">
            <div className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              Аудит и миграция legacy
            </div>
            <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-indigo-700">
              Аналитическая платформа нового поколения
            </h3>
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-slate-700">
              Замена 157 устаревших Drupal-параграфов на 41 React-компонент с JSONB-хранением и drag-and-drop виджетами. Время добавления нового индикатора сократилось с 2 дней до 15 минут.
            </p>
            <p className="mt-4 text-[14px] font-bold text-indigo-600 group-hover:text-indigo-500">
              Читать далее →
            </p>
          </a>

          <a href="/cases/ai-agents.html" className="group block rounded-2xl border-2 border-slate-300 bg-white p-7 shadow-sm transition-all hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100/50">
            <div className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              ИИ-агенты и автоматизация
            </div>
            <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-emerald-700">
              Автоматизация разработки через ИИ-агентов
            </h3>
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-slate-700">
              11 ИИ-агентов автоматизировали полный цикл разработки. Code review ускорен на 60%, 138 планов задач созданы без единой просрочки.
            </p>
            <p className="mt-4 text-[14px] font-bold text-emerald-600 group-hover:text-emerald-500">
              Читать далее →
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative border-t border-slate-300 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Процесс"
          title="Прозрачный процесс работы"
        />

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="relative flex flex-col rounded-xl border border-slate-300 bg-white p-7 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100/50"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-lg border-2 border-indigo-300 bg-white font-mono text-[14px] font-bold text-indigo-600 shadow-sm">
                  {step.num}
                </div>
                <h3 className="mt-6 text-[17px] font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2.5 text-[15px] font-medium leading-relaxed text-slate-700">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-slate-300 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Частые вопросы"
        />

        <div className="mt-12 divide-y divide-slate-300 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="transition-colors hover:bg-slate-50">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 px-7 py-6 text-left"
                >
                  <span className="text-[16px] font-bold leading-snug text-slate-900 sm:text-[17px]">
                    {item.q}
                  </span>
                  <ChevronDownIcon
                    className={`mt-0.5 h-5.5 w-5.5 flex-shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden px-7 transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="text-[15px] font-medium leading-relaxed text-slate-700">{item.a}</p>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);

    const text = [
      "<b>Новая заявка с axiomui.ru</b>",
      "",
      `<b>Имя:</b> ${form.name}`,
      `<b>Контакт:</b> ${form.contact}`,
      `<b>Проект:</b> ${form.message}`,
    ].join("\n");

    const body = new URLSearchParams({
      chat_id: import.meta.env.VITE_TG_CHAT_ID,
      text,
      parse_mode: "HTML",
    });

    fetch(
      `https://api.telegram.org/bot${import.meta.env.VITE_TG_BOT_TOKEN}/sendMessage`,
      { method: "POST", body }
    ).catch(() => {});
  };

  return (
    <section id="contact" className="relative border-t border-slate-300 bg-slate-50 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-10 flex justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-indigo-200/40 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-200 bg-white p-8 shadow-xl shadow-indigo-100/60 sm:p-11">
          {/* Decorative corner gradients */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-indigo-100 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-violet-100 blur-[80px]" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Бесплатный экспресс-анализ
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Давайте обсудим ваш проект
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] font-medium leading-relaxed text-slate-700 sm:text-[16px]">
              Расскажите о ваших текущих задачах. В течение 30-минутного экспресс-аудита мы подскажем, с чего начать стабилизацию системы и как можно сократить расходы на команду уже сейчас.
            </p>
          </div>

          {submitted ? (
            <div className="relative mt-11 rounded-xl border-2 border-emerald-300 bg-emerald-50 p-9 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-400 bg-white text-emerald-600 shadow-sm">
                <CheckIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">Заявка отправлена</h3>
              <p className="mt-2.5 text-[15px] font-medium text-slate-700">
                Мы свяжемся с вами в ближайшее время, обычно в течение 24 часов.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative mt-10 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-[14px] font-bold text-slate-800">
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Константин"
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-3.5 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25"
                />
              </div>

              <div>
                <label htmlFor="contact" className="mb-2 block text-[14px] font-bold text-slate-800">
                  Telegram или Email
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  placeholder="@username или name@company.com"
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-3.5 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-[14px] font-bold text-slate-800">
                  Краткое описание проекта
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Например: Django/Python legacy-проект, упала скорость разработки, нужно покрыть тестами"
                  className="w-full resize-none rounded-lg border-2 border-slate-300 bg-white px-5 py-3.5 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-2 border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/25"
                />
                <span className="text-[13px] leading-relaxed text-slate-600">
                  Я согласен на обработку моих персональных данных в соответствии с{' '}
                  <a href="/privacy.html" target="_blank" className="text-indigo-600 underline hover:text-indigo-500">Политикой конфиденциальности</a>
                </span>
              </label>

              <button
                type="submit"
                disabled={!consent}
                className="group mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-7 py-4 text-[15px] font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:hover:shadow-indigo-600/25"
              >
                Отправить заявку
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>

              <div className="pt-2 text-center">
                <a
                  href="https://t.me/chernyakov_k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-700 transition-colors hover:text-indigo-600"
                >
                  <TelegramIcon className="h-4.5 w-4.5" />
                  Или написать напрямую в Telegram
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-300 bg-white py-11">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 sm:flex-row lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm ring-1 ring-indigo-500/15">
            <span className="text-[11px] font-bold text-white">Ax</span>
          </div>
          <div className="text-[14px] font-medium text-slate-700">
            <span className="font-bold text-slate-900">AxiomUI</span>
            <span className="mx-2 text-slate-300">·</span>
            © 2026 All rights reserved.
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[14px] font-medium text-slate-600">
          <a href="/cases/index.html" className="transition-colors hover:text-indigo-600">Проекты</a>
          <a href="/security.html" className="transition-colors hover:text-indigo-600">Безопасность ИИ</a>
          <a href="/privacy.html" className="transition-colors hover:text-indigo-600">Политика конфиденциальности</a>
          <a href="/terms.html" className="transition-colors hover:text-indigo-600">Условия использования</a>
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
    <div className="relative min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        <Hero />
        <Problems />
        <Services />
        <CasesTeaser />
        <Process />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
