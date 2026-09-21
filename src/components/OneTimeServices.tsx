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
    name: "Технический аудит",
    priceNote: "10 рабочих дней · фиксированный результат",
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

function OneTimeArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export default function OneTimeServices() {
  return (
    <div className="grid grid-cols-1 gap-0 border-2 border-ink lg:grid-cols-2">
      {ONE_TIME_SERVICES.map((item, idx) => (
        <div
          key={item.name}
          className={`flex flex-col border-hairline bg-surface p-8 sm:p-9 ${
            idx === 0 ? "border-b lg:border-b-0 lg:border-r" : "border-t lg:border-t-0 lg:border-l"
          } ${idx === 0 ? "lg:border-r" : ""}`}
        >
          <div className="ax-mono text-ink-50">
            {item.eyebrow}
          </div>

          <h3 className="mt-1.5 text-[26px] font-black uppercase tracking-[-0.015em] text-ink">
            {item.name}
          </h3>

          {/* Блок цены: у диагностики — крупная цена, у аудита — лесенка категорий */}
          {item.price ? (
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[32px] font-black tracking-tight text-signal">{item.price}</span>
            </div>
          ) : (
            <div className="mt-4 border-t border-b border-hairline">
              {item.categories?.map((tier, i) => (
                <div
                  key={tier.label}
                  className={`flex items-baseline justify-between gap-4 py-2.5 ${i > 0 ? "border-t border-hairline" : ""}`}
                >
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] text-signal">
                    К-{i + 1}
                    <span className="ml-2.5 font-sans text-[14.5px] font-semibold normal-case tracking-normal text-ink">
                      {tier.label}
                    </span>
                  </span>
                  <span className="whitespace-nowrap text-[17px] font-black text-ink">{tier.price}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-2 font-mono text-[11px] leading-relaxed tracking-[0.03em] text-ink-50">
            {item.categoriesNote ?? item.priceNote}
          </div>

          <ul className="mt-5 border-t border-hairline">
            {item.features.map((f) => (
              <li key={f} className="grid grid-cols-[24px_1fr] gap-2 border-b border-hairline py-2.5 text-[14.5px] leading-relaxed text-ink-70">
                <span className="mt-0.5 font-mono font-bold text-signal">+</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {item.note && (
            <p className="mt-4 border border-hairline bg-recessed p-4 text-[13px] leading-relaxed text-ink-70">
              {item.note}
            </p>
          )}

          <div className="mt-auto pt-6">
            <a href="#contact" className="ax-btn ax-btn-ghost w-full">
              {item.cta}
              <OneTimeArrowIcon />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
