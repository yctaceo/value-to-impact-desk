import Link from "next/link";
import {
  CalendarCheck,
  Heart,
  MessageCircle,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";
import type { ImpactProfile, VerificationLevel } from "@/lib/types";
import { verificationLabels } from "@/lib/seed-data";
import { cn } from "@/lib/utils";
import { formatKRW } from "@/lib/dashboard-data";

export function VerificationBadge({
  level,
  status,
}: {
  level: VerificationLevel;
  status: string;
}) {
  const colors: Record<VerificationLevel, string> = {
    0: "border-zinc-300 bg-zinc-50 text-zinc-700",
    1: "border-amber-200 bg-amber-50 text-amber-900",
    2: "border-emerald-200 bg-emerald-50 text-emerald-900",
    3: "border-blue-200 bg-blue-50 text-blue-900",
    4: "border-[var(--accent)] bg-[#e9f5f1] text-[var(--ink)]",
  };

  return (
    <div className={cn("inline-flex rounded-md border px-3 py-2 text-xs", colors[level])}>
      <ShieldCheck size={14} className="mr-2 shrink-0" />
      <span>
        <strong>{verificationLabels[level]}</strong>
        <span className="mx-1">/</span>
        {status}
      </span>
    </div>
  );
}

export function ProfileCard({ profile }: { profile: ImpactProfile }) {
  const percent =
    profile.requestedAmount && profile.requestedAmount > 0
      ? Math.min(100, Math.round((profile.raisedAmount / profile.requestedAmount) * 100))
      : 0;

  return (
    <article className="panel flex h-full flex-col overflow-hidden bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#dfe8df]">
        {profile.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.imageUrl}
            alt={profile.imageAlt ?? profile.nameKo}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : null}
        <button
          aria-label="관심 등록"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/92 text-[var(--ink)] shadow-sm"
        >
          <Heart size={18} />
        </button>
        <div className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold">
          {profile.category === "sample" ? "Sample" : profile.sourceType}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div>
          <h3 className="text-xl font-semibold">{profile.nameKo}</h3>
          <p className="mt-1 line-clamp-2 min-h-12 text-sm leading-6 text-[var(--muted)]">
            {profile.oneLine}
          </p>
        </div>

        <div className="mt-5 grid gap-3 text-sm">
          <div className="flex gap-2">
            <Target size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
            <span>
              <strong>해결문제:</strong> {profile.problemLabel}
            </span>
          </div>
          <div className="flex gap-2">
            <UsersRound size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
            <span>
              <strong>대상:</strong> {profile.beneficiaryLabel}
            </span>
          </div>
          <div className="flex gap-2">
            <MessageCircle size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
            <span>
              <strong>현재 필요:</strong> {profile.currentNeedLabel}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-end justify-between text-sm">
            <div>
              <p className="text-[var(--muted)]">누적 후원/구매</p>
              <p className="text-lg font-semibold text-[var(--ink)]">
                {formatKRW(profile.raisedAmount)}
              </p>
            </div>
            {profile.requestedAmount ? (
              <p className="text-xs font-semibold text-[var(--muted)]">
                요청 {formatKRW(profile.requestedAmount)}
              </p>
            ) : null}
          </div>
          {profile.requestedAmount ? (
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8ede6]">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${percent}%` }}
              />
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#edf2ec] px-3 py-1 font-semibold">
            <CalendarCheck size={14} />
            {profile.lastReportMonth} {profile.monthlyReportStatus}
          </span>
          <span className="text-[var(--muted)]">♡ {profile.favoriteCount}</span>
        </div>

        <div className="mt-4">
          <VerificationBadge
            level={profile.verificationLevel}
            status={profile.verificationStatus}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {profile.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-[#f5f2e9] px-3 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <Link
            href={`/profiles/${profile.slug}`}
            className="inline-flex w-full justify-center rounded-md bg-[var(--ink)] px-4 py-3 text-sm font-semibold text-white hover:bg-[#123f3a]"
          >
            상세보기
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({
  profile,
  variant = "full",
}: {
  profile: ImpactProfile;
  variant?: "full" | "featured" | "compact";
}) {
  if (variant === "full") {
    return <ProfileCard profile={profile} />;
  }

  const percent =
    profile.requestedAmount && profile.requestedAmount > 0
      ? Math.min(100, Math.round((profile.raisedAmount / profile.requestedAmount) * 100))
      : 0;

  return (
    <article
      className={cn(
        "marketing-panel flex h-full flex-col overflow-hidden bg-white",
        variant === "compact" && "rounded-lg",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#dfe8df]",
          variant === "compact" ? "aspect-[16/10]" : "aspect-[4/3]",
        )}
      >
        {profile.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.imageUrl}
            alt={profile.imageAlt ?? profile.nameKo}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        ) : null}
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold">
          {profile.category === "sample" ? "Sample" : "공개자료 기반"}
        </span>
      </div>
      <div className={cn("flex flex-1 flex-col", variant === "compact" ? "p-4" : "p-5")}>
        <h3 className={cn("font-semibold", variant === "compact" ? "text-lg" : "text-xl")}>
          {profile.nameKo}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">
          {profile.oneLine}
        </p>
        <p className="mt-4 text-sm">
          <strong>현재 필요:</strong> {profile.currentNeedLabel}
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>{formatKRW(profile.raisedAmount)} 기록</span>
            {profile.requestedAmount ? <span>{percent}%</span> : null}
          </div>
          {profile.requestedAmount ? (
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8ede6]">
              <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${percent}%` }} />
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--ink)]">
            L{profile.verificationLevel} {profile.sourceType === "Fictional Sample" ? "Sample" : "검증 단계"}
          </span>
          <Link
            href={`/profiles/${profile.slug}`}
            className="rounded-md bg-[var(--ink)] px-3 py-2 text-sm font-semibold text-white"
          >
            상세보기
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProfileEvidenceBox({ profile }: { profile: ImpactProfile }) {
  return (
    <div className="panel p-5">
      <h3 className="font-semibold">Evidence & Verification</h3>
      <div className="mt-4">
        <VerificationBadge
          level={profile.verificationLevel}
          status={profile.verificationStatus}
        />
      </div>
      <dl className="mt-5 grid gap-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-[var(--line)] pb-3">
          <dt className="text-[var(--muted)]">Source Type</dt>
          <dd className="font-semibold">{profile.sourceType}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-[var(--line)] pb-3">
          <dt className="text-[var(--muted)]">Last Updated</dt>
          <dd className="font-semibold">{profile.lastUpdated}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[var(--muted)]">Source URL</dt>
          <dd className="max-w-[220px] truncate font-semibold">
            {profile.sourceUrl ? (
              <a href={profile.sourceUrl} target="_blank" rel="noreferrer">
                {profile.sourceUrl}
              </a>
            ) : (
              "Sample data"
            )}
          </dd>
        </div>
      </dl>
      <div className="mt-5 space-y-2">
        {profile.evidence.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-md bg-[#f7f8f4] px-3 py-2 text-sm"
          >
            <span>{item.label}</span>
            <span className="font-semibold text-[var(--muted)]">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
