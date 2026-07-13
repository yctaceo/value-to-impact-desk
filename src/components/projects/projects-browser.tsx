"use client";

import Link from "next/link";
import { Check, Heart, Layers, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { pickLang } from "@/lib/i18n";
import type { PartnershipType, ProjectDetail } from "@/types/project";

const storeKeys = {
  favorites: "vti:favorites",
  compare: "vti:compare",
  portfolio: "vti:portfolio",
};

function readStored(key: string) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function writeStored(key: string, values: string[]) {
  window.localStorage.setItem(key, JSON.stringify(values));
}

function formatKrw(value: number) {
  return `${Math.round(value / 10000).toLocaleString("ko-KR")}만원`;
}

function progress(project: ProjectDetail) {
  return Math.min(100, Math.round((project.committedAmountKrw / project.targetAmountKrw) * 100));
}

export function ProjectsBrowser({
  projects,
  lang,
}: {
  projects: ProjectDetail[];
  lang: Lang;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [partnership, setPartnership] = useState<PartnershipType | "all">("all");
  const [sort, setSort] = useState("recommended");
  const [favorites, setFavorites] = useState<string[]>(() => readStored(storeKeys.favorites));
  const [compare, setCompare] = useState<string[]>(() => readStored(storeKeys.compare));
  const [portfolio, setPortfolio] = useState<string[]>(() => readStored(storeKeys.portfolio));
  const [notice, setNotice] = useState("");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = projects.filter((project) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          project.titleKo,
          project.titleEn,
          project.organizationKo,
          project.organizationEn,
          project.category,
          project.region,
          ...project.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === "all" || project.category === category;
      const matchesPartnership =
        partnership === "all" || project.partnershipTypes.includes(partnership);
      return matchesQuery && matchesCategory && matchesPartnership;
    });

    if (sort === "latest") {
      return [...result].sort((a, b) => b.latestUpdate.localeCompare(a.latestUpdate));
    }

    if (sort === "support") {
      return [...result].sort((a, b) => b.committedAmountKrw - a.committedAmountKrw);
    }

    return result;
  }, [category, partnership, projects, query, sort]);

  function toggleFavorite(slug: string) {
    const next = favorites.includes(slug)
      ? favorites.filter((item) => item !== slug)
      : [...favorites, slug];
    setFavorites(next);
    writeStored(storeKeys.favorites, next);
    setNotice("Demo action: favorite list updated.");
  }

  function toggleCompare(slug: string) {
    const exists = compare.includes(slug);
    if (!exists && compare.length >= 3) {
      setNotice("Compare is limited to 3 projects in this demo.");
      return;
    }

    const next = exists ? compare.filter((item) => item !== slug) : [...compare, slug];
    setCompare(next);
    writeStored(storeKeys.compare, next);
    setNotice("Demo action: compare tray updated.");
  }

  function addPortfolio(slug: string) {
    const next = portfolio.includes(slug) ? portfolio : [...portfolio, slug];
    setPortfolio(next);
    writeStored(storeKeys.portfolio, next);
    setNotice("Demo action: added to company portfolio.");
  }

  return (
    <div className="space-y-6">
      <div className="panel grid gap-3 p-4 lg:grid-cols-[1fr_220px_220px_190px]">
        <label className="flex items-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 py-2">
          <Search size={17} className="text-[var(--muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={lang === "en" ? "Search projects" : "프로젝트 검색"}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="field py-2 text-sm"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? (lang === "en" ? "All categories" : "전체 분야") : item}
            </option>
          ))}
        </select>
        <select
          value={partnership}
          onChange={(event) => setPartnership(event.target.value as PartnershipType | "all")}
          className="field py-2 text-sm"
        >
          <option value="all">{lang === "en" ? "All partnership types" : "전체 협력 유형"}</option>
          <option value="donation">{lang === "en" ? "Donation" : "후원"}</option>
          <option value="corporate-procurement">{lang === "en" ? "Procurement" : "기업구매"}</option>
          <option value="partnership">{lang === "en" ? "Partnership" : "파트너십"}</option>
          <option value="volunteering">{lang === "en" ? "Volunteering" : "임직원 참여"}</option>
        </select>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="field py-2 text-sm"
        >
          <option value="recommended">{lang === "en" ? "Recommended" : "추천순"}</option>
          <option value="latest">{lang === "en" ? "Latest update" : "최근 업데이트"}</option>
          <option value="support">{lang === "en" ? "Most committed" : "지원액순"}</option>
        </select>
      </div>

      {notice ? (
        <div className="rounded-md border border-[var(--success-border)] bg-[var(--success-bg)] px-4 py-3 text-sm font-semibold text-[var(--ink)]">
          {notice}
        </div>
      ) : null}

      <div className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <article key={project.id} className="panel flex h-full flex-col overflow-hidden">
            <Link href={`/projects/${project.slug}`} className="block aspect-[4/3] bg-[#dfe8df]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.imageUrl}
                alt={pickLang(lang, project.imageAltKo, project.imageAltEn)}
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-[var(--accent)]">
                  {project.organizationType}
                </span>
                <span className="rounded-full bg-[#eef1ea] px-2 py-1 text-[var(--muted)]">
                  {project.verificationLabelKo}
                </span>
              </div>
              <Link href={`/projects/${project.slug}`}>
                <h2 className="mt-4 text-xl font-semibold leading-7">
                  {pickLang(lang, project.titleKo, project.titleEn)}
                </h2>
              </Link>
              <p className="mt-2 text-sm font-semibold text-[var(--muted)]">
                {pickLang(lang, project.organizationKo, project.organizationEn)} · {project.region}
              </p>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--muted)]">
                {pickLang(lang, project.oneLineImpactKo, project.oneLineImpactEn)}
              </p>
              <div className="mt-5">
                <div className="flex justify-between text-xs font-semibold text-[var(--muted)]">
                  <span>{formatKrw(project.committedAmountKrw)}</span>
                  <span>{progress(project)}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8ede6]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${progress(project)}%` }}
                  />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.metricsKo.slice(0, 3).map((metric, index) => (
                  <span key={metric} className="rounded-full bg-[#f4f6f1] px-2 py-1 text-xs">
                    {lang === "en" ? project.metricsEn[index] : metric}
                  </span>
                ))}
              </div>
              <div className="mt-auto grid gap-2 pt-5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="rounded-md bg-[var(--ink)] px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  {lang === "en" ? "View project" : "프로젝트 보기"}
                </Link>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(project.slug)}
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-[var(--line)] bg-white px-2 py-2 text-xs font-semibold"
                  >
                    <Heart size={14} />
                    {favorites.includes(project.slug) ? "Saved" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCompare(project.slug)}
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-[var(--line)] bg-white px-2 py-2 text-xs font-semibold"
                  >
                    <Layers size={14} />
                    {compare.includes(project.slug) ? "On" : "Compare"}
                  </button>
                  <button
                    type="button"
                    onClick={() => addPortfolio(project.slug)}
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-[var(--line)] bg-white px-2 py-2 text-xs font-semibold"
                  >
                    {portfolio.includes(project.slug) ? <Check size={14} /> : <Plus size={14} />}
                    Portfolio
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {compare.length ? (
        <div className="sticky bottom-4 z-20 rounded-md border border-[var(--line)] bg-white p-4 shadow-lg">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <p className="text-sm font-semibold">
              {compare.length}/3 {lang === "en" ? "projects selected for comparison" : "개 프로젝트 비교 선택됨"}
            </p>
            <Link
              href={`/projects/compare?slugs=${compare.join(",")}${lang === "en" ? "&lang=en" : ""}`}
              className="rounded-md bg-[var(--ink)] px-4 py-2 text-center text-sm font-semibold text-white"
            >
              {lang === "en" ? "Compare selected" : "선택 프로젝트 비교"}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
