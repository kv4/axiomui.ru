// Декоративные элементы стиля «Инженерный отчёт» (AXI-68, вариант А).
// Контент сайта не меняют — только оформление.

function BlueprintFrame({ children }: { children: React.ReactNode }) {
  return (
    <figure className="border border-hairline bg-surface p-4">
      {children}
    </figure>
  );
}

export function Blueprint() {
  return (
    <>
      <div className="ax-only-desktop">
        <BlueprintFrame>
          <svg viewBox="0 0 560 470" className="block h-auto w-full" role="img"
            aria-label="Схема типовой legacy-системы: фронтенд, CRM, ядро на старом PHP, база данных и интеграции; ядро помечено как критическая точка отказа">
            <g fontFamily="'JetBrains Mono', monospace">
              <rect x="8" y="8" width="544" height="454" fill="none" stroke="#C7C2B4" strokeWidth="1" />
              <g stroke="#6F695C" strokeWidth="1">
                <path d="M8 34h-8M0 8h16M8 0v16" />
                <path d="M552 34h8M560 8h-16M552 0v16" />
                <path d="M8 436h-8M0 462h16M8 454v16" />
                <path d="M552 436h8M560 462h-16M552 454v16" />
              </g>

              <rect x="48" y="44" width="184" height="56" fill="#FAF9F5" stroke="#161310" strokeWidth="1.5" />
              <text x="140" y="70" textAnchor="middle" fill="#161310" fontSize="15" fontWeight="700">WEB UI</text>
              <text x="140" y="89" textAnchor="middle" fill="#6F695C" fontSize="11">react · twig</text>

              <rect x="328" y="44" width="184" height="56" fill="#FAF9F5" stroke="#161310" strokeWidth="1.5" />
              <text x="420" y="70" textAnchor="middle" fill="#161310" fontSize="15" fontWeight="700">CRM</text>
              <text x="420" y="89" textAnchor="middle" fill="#6F695C" fontSize="11">портал партнёров</text>

              <rect x="152" y="156" width="256" height="68" fill="none" stroke="#D6341B" strokeWidth="2.5" strokeDasharray="7 5" />
              <text x="280" y="184" textAnchor="middle" fill="#D6341B" fontWeight="700" fontSize="17">LEGACY-ЯДРО</text>
              <text x="280" y="205" textAnchor="middle" fill="#6F695C" fontSize="11">устаревший стек</text>

              <rect x="48" y="272" width="184" height="56" fill="#FAF9F5" stroke="#161310" strokeWidth="1.5" />
              <text x="140" y="305" textAnchor="middle" fill="#161310" fontSize="14" fontWeight="700">БАЗА ДАННЫХ</text>

              <rect x="328" y="272" width="184" height="56" fill="#FAF9F5" stroke="#161310" strokeWidth="1.5" />
              <text x="420" y="305" textAnchor="middle" fill="#161310" fontSize="14" fontWeight="700">ИНТЕГРАЦИИ</text>

              <g stroke="#4B463E" strokeWidth="1.5" fill="none">
                <path d="M140 100v56" />
                <path d="M420 100v56" />
                <path d="M200 224v48h-60" />
                <path d="M360 224v48h60" />
              </g>
              <g fill="#4B463E">
                <circle cx="140" cy="156" r="3" /><circle cx="420" cy="156" r="3" />
                <circle cx="140" cy="272" r="3" /><circle cx="420" cy="272" r="3" />
              </g>

              <circle cx="392" cy="224" r="10" fill="none" stroke="#D6341B" strokeWidth="2.5" />
              <circle cx="392" cy="224" r="3.5" fill="#D6341B" />
              <path d="M392 234v34h84" stroke="#D6341B" strokeWidth="2" fill="none" />
              <rect x="330" y="336" width="222" height="66" fill="#F2F0E9" stroke="#D6341B" strokeWidth="2" />
              <text x="346" y="362" fill="#D6341B" fontWeight="700" fontSize="13">КРИТИЧЕСКИЙ РИСК</text>
              <text x="346" y="382" fill="#4B463E" fontSize="12">ядро держит один разработчик</text>

              <path d="M48 442h464" stroke="#6F695C" strokeWidth="1" />
              <path d="M48 436v12M512 436v12" stroke="#6F695C" strokeWidth="1" />
              <text x="280" y="430" textAnchor="middle" fill="#6F695C" fontSize="12">наращивали годами — документации нет</text>
            </g>
          </svg>
        </BlueprintFrame>
      </div>

      <div className="ax-only-mobile">
        <BlueprintFrame>
          <svg viewBox="0 0 340 560" className="block h-auto w-full" role="img"
            aria-label="Вертикальная схема типовой legacy-системы с критической точкой отказа">
            <g fontFamily="'JetBrains Mono', monospace">
              <rect x="8" y="8" width="324" height="544" fill="none" stroke="#C7C2B4" strokeWidth="1" />
              <g stroke="#6F695C" strokeWidth="1">
                <path d="M8 30h-8M0 8h16M8 0v16" />
                <path d="M332 30h8M340 8h-16M332 0v16" />
                <path d="M8 530h-8M0 552h16M8 544v16" />
                <path d="M332 530h8M340 552h-16M332 544v16" />
              </g>

              <rect x="36" y="36" width="268" height="48" fill="#FAF9F5" stroke="#161310" strokeWidth="1.5" />
              <text x="170" y="66" textAnchor="middle" fill="#161310" fontSize="15" fontWeight="700">WEB UI · CRM</text>

              <path d="M170 84v28" stroke="#4B463E" strokeWidth="1.5" fill="none" />
              <circle cx="170" cy="114" r="3" fill="#4B463E" />

              <rect x="36" y="116" width="268" height="68" fill="none" stroke="#D6341B" strokeWidth="2.5" strokeDasharray="7 5" />
              <text x="170" y="146" textAnchor="middle" fill="#D6341B" fontWeight="700" fontSize="17">LEGACY-ЯДРО</text>
              <text x="170" y="168" textAnchor="middle" fill="#6F695C" fontSize="12">устаревший стек</text>

              <path d="M170 184v26" stroke="#4B463E" strokeWidth="1.5" fill="none" />
              <path d="M100 210h140" stroke="#4B463E" strokeWidth="1.5" fill="none" />
              <path d="M100 210v26" stroke="#4B463E" strokeWidth="1.5" fill="none" />
              <path d="M240 210v26" stroke="#4B463E" strokeWidth="1.5" fill="none" />
              <circle cx="100" cy="238" r="3" fill="#4B463E" /><circle cx="240" cy="238" r="3" fill="#4B463E" />

              <rect x="36" y="240" width="128" height="46" fill="#FAF9F5" stroke="#161310" strokeWidth="1.5" />
              <text x="100" y="268" textAnchor="middle" fill="#161310" fontSize="13.5" fontWeight="700">БАЗА ДАННЫХ</text>

              <rect x="176" y="240" width="128" height="46" fill="#FAF9F5" stroke="#161310" strokeWidth="1.5" />
              <text x="240" y="268" textAnchor="middle" fill="#161310" fontSize="13.5" fontWeight="700">ИНТЕГРАЦИИ</text>

              <circle cx="302" cy="124" r="9" fill="none" stroke="#D6341B" strokeWidth="2.5" />
              <circle cx="302" cy="124" r="3.5" fill="#D6341B" />
              <path d="M302 133v219h6" stroke="#D6341B" strokeWidth="2" fill="none" />

              <rect x="64" y="316" width="244" height="74" fill="#F2F0E9" stroke="#D6341B" strokeWidth="2" />
              <text x="82" y="345" fill="#D6341B" fontWeight="700" fontSize="14">КРИТИЧЕСКИЙ РИСК</text>
              <text x="82" y="368" fill="#4B463E" fontSize="13">ядро держит один разработчик</text>

              <path d="M36 536h268" stroke="#6F695C" strokeWidth="1" />
              <path d="M36 530v12M304 530v12" stroke="#6F695C" strokeWidth="1" />
              <text x="170" y="522" textAnchor="middle" fill="#6F695C" fontSize="12">наращивали годами — документации нет</text>
            </g>
          </svg>
        </BlueprintFrame>
      </div>
    </>
  );
}
