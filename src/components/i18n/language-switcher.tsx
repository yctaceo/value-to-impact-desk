"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "en" ? "en" : "ko";

  function switchLang(nextLang: "ko" | "en") {
    const params = new URLSearchParams(searchParams.toString());
    if (nextLang === "ko") {
      params.delete("lang");
    } else {
      params.set("lang", "en");
    }
    const query = params.toString();
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="inline-flex rounded-md border border-[var(--line)] bg-white p-1 text-xs font-semibold">
      {(["ko", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => switchLang(option)}
          className={`rounded px-2 py-1 ${
            lang === option
              ? "bg-[var(--ink)] text-white"
              : "text-[var(--muted)] hover:text-[var(--ink)]"
          }`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
