export type Lang = "ko" | "en";

export function getLang(searchParams?: {
  lang?: string | string[] | undefined;
}): Lang {
  const raw = Array.isArray(searchParams?.lang)
    ? searchParams?.lang[0]
    : searchParams?.lang;

  return raw === "en" ? "en" : "ko";
}

export function pickLang(lang: Lang, ko: string, en: string) {
  return lang === "en" ? en : ko;
}
