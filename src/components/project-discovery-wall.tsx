"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProfileCard } from "./profile-card";
import type { ImpactProfile } from "@/lib/types";

const filters = [
  "전체",
  "후원 필요",
  "기업구매 가능",
  "투자 검토",
  "장애/발달장애",
  "청년/자립준비",
  "환경/업사이클링",
  "교육/멘토링",
  "의료/복지",
  "문화예술",
];

function matchesFilter(profile: ImpactProfile, filter: string) {
  const text = [
    profile.problemLabel,
    profile.currentNeedLabel,
    profile.tags.join(" "),
    profile.investorFit.join(" "),
  ]
    .filter(Boolean)
    .join(" ");

  if (filter === "전체") return true;
  if (filter === "후원 필요") return profile.currentNeeds.some((need) => need.type === "donation");
  if (filter === "기업구매 가능") {
    return profile.currentNeeds.some((need) => need.type === "procurement") || text.includes("기업");
  }
  if (filter === "투자 검토") return profile.currentNeeds.some((need) => need.type === "investment");
  if (filter === "장애/발달장애") return /장애|발달/.test(text);
  if (filter === "청년/자립준비") return /청년|자립/.test(text);
  if (filter === "환경/업사이클링") return /환경|친환경|업사이클/.test(text);
  if (filter === "교육/멘토링") return /교육|멘토링|훈련/.test(text);
  if (filter === "의료/복지") return /의료|복지|회복/.test(text);
  if (filter === "문화예술") return /문화|예술|아트|공예/.test(text);
  return true;
}

export function ProjectDiscoveryWall({ profiles }: { profiles: ImpactProfile[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("전체");

  const filteredProfiles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return profiles.filter((profile) => {
      const searchable = [
        profile.nameKo,
        profile.nameEn,
        profile.oneLine,
        profile.problemLabel,
        profile.beneficiaryLabel,
        profile.currentNeedLabel,
        profile.tags.join(" "),
        profile.productsServices.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter(profile, filter) && (!q || searchable.includes(q));
    });
  }, [filter, profiles, query]);

  return (
    <div>
      <div className="sticky top-16 z-20 border-b border-[var(--line)] bg-[#f7f8f4]/94 py-4 backdrop-blur">
        <div className="container-page">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="field h-12 pl-11"
                placeholder="조직명, 사회문제, 제품, 임팩트 주제로 검색하세요"
              />
            </div>
            <p className="text-sm text-[var(--muted)]">
              {filteredProfiles.length}개 프로젝트
            </p>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
                  filter === item
                    ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                    : "border-[var(--line)] bg-white text-[var(--muted)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
          {filteredProfiles.map((profile) => (
            <div key={profile.id} className="mb-5 break-inside-avoid">
              <ProfileCard profile={profile} />
            </div>
          ))}
        </div>
        {filteredProfiles.length === 0 ? (
          <div className="panel p-10 text-center text-[var(--muted)]">
            검색 결과가 없습니다. 다른 주제나 필터를 선택해 주세요.
          </div>
        ) : null}
      </div>
    </div>
  );
}
