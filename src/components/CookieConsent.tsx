import { useEffect, useState } from "react";

declare global {
  interface Window {
    __axiomuiEnableMetrika?: () => void;
  }
}

const STORAGE_KEY = "axiomui-cookie-consent";

/**
 * Согласие на аналитические cookie.
 * Яндекс.Метрика (index.html) инициализируется только после явного согласия.
 * Отказ не влияет на работу сайта — грузятся только необходимые ресурсы.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored === "accepted") {
      window.__axiomuiEnableMetrika?.();
      return;
    }
    if (stored !== "declined") setVisible(true);
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* приватный режим — просто скрываем баннер */
    }
    if (value === "accepted") window.__axiomuiEnableMetrika?.();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Согласие на использование cookie"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-surface/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="max-w-3xl text-[13px] leading-relaxed text-ink-70">
          Мы используем cookie и Яндекс.Метрику, чтобы понимать, как используется сайт, и
          улучшать его. Аналитика включается только после вашего согласия. Подробнее — в{" "}
          <a href="/privacy.html" target="_blank" className="text-ink underline hover:text-signal">
            Политике конфиденциальности
          </a>
          .
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="ax-btn ax-btn-ghost px-5 py-2.5 text-[11px]"
          >
            Только необходимые
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="ax-btn ax-btn-solid px-5 py-2.5 text-[11px]"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
