type Category = { label: string; price: string };

type OneTimeService = {
  eyebrow: string;
  name: string;
  price?: string;
  priceNote: string;
  categories?: Category[];
  categoriesNote?: string;
  features: string[];
  note?: string;
  cta: string;
};

const ONE_TIME_SERVICES: OneTimeService[] = [
  {
    eyebrow: "Разовая услуга",
    name: "Диагностика",
    price: "Бесплатно",
    priceNote: "30-минутный созвон",
    features: [
      "Обсуждаем стек, симптомы проблем и рамки проекта",
      "Подскажем, с чего начать стабилизацию системы",
      "Без доступа к коду и без обязательств",
    ],
    note: "Если по итогам созвона нужен аудит — сразу назовём категорию и фиксированную цену, без «по запросу».",
    cta: "Записаться на созвон",
  },
  {
    eyebrow: "Разовая услуга",
    name: "Технический экспресс-аудит",
    priceNote: "3 недели · фиксированный результат",
    categories: [
      { label: "Один сайт", price: "90 000 ₽" },
      { label: "Сайт + портал/ERP", price: "120 000 ₽" },
      { label: "Несколько систем", price: "150 000 ₽" },
    ],
    categoriesNote: "Цена фиксируется до начала работ и не меняется. Категорию определяем по короткой анкете — сколько систем и интеграций у проекта.",
    features: [
      "Анализ репозитория на уязвимости и узкие места",
      "Аудит производительности БД и ключевых эндпоинтов",
      "Оценка готовности к внедрению ИИ-агентов",
      "Карта рисков и пошаговый план стабилизации",
      "Детальный PDF-отчёт с рекомендациями",
    ],
    cta: "Обсудить аудит",
  },
];

function OneTimeCheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function OneTimeArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export default function OneTimeServices() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {ONE_TIME_SERVICES.map((item) => (
        <div
          key={item.name}
          className="relative flex flex-col rounded-xl border-2 border-indigo-200 bg-white p-7 shadow-sm transition-all hover:border-indigo-400"
        >
          <div className="text-[14px] font-semibold uppercase tracking-wider text-slate-700">
            {item.eyebrow}
          </div>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {item.name}
          </h3>

          {/* Блок цены: у диагностики — крупная цена, у аудита — лесенка категорий */}
          {item.price ? (
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-indigo-600">{item.price}</span>
            </div>
          ) : (
            <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
              {item.categories?.map((tier) => (
                <div key={tier.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <span className="text-[15px] font-medium text-slate-700">{tier.label}</span>
                  <span className="text-[15px] font-bold text-slate-900">{tier.price}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-1.5 text-[13px] font-medium text-slate-500">
            {item.categoriesNote ?? item.priceNote}
          </div>

          <ul className="mt-5 space-y-3 border-t border-slate-200 pt-5">
            {item.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] font-medium leading-relaxed text-slate-700">
                <OneTimeCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {item.note && (
            <p className="mt-4 rounded-lg border border-slate-300 bg-slate-50 p-4 text-[13px] font-medium leading-relaxed text-slate-700">
              {item.note}
            </p>
          )}

          <div className="mt-auto pt-6">
            <a
              href="#contact"
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-indigo-600 bg-white px-5 py-3 text-[14px] font-bold text-indigo-700 transition-all hover:bg-indigo-50"
            >
              {item.cta}
              <OneTimeArrowIcon />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
