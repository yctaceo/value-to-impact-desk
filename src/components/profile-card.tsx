import Link from "next/link";
import { AlertTriangle, FileText, LockKeyhole, ShieldCheck } from "lucide-react";
import type { ImpactProfile, VerificationLevel } from "@/lib/types";
import { verificationLabels } from "@/lib/seed-data";
import { cn } from "@/lib/utils";

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
  return (
    <article className="panel flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
            {profile.sourceType}
          </p>
          <h3 className="mt-2 text-xl font-semibold">{profile.nameKo}</h3>
          <p className="text-sm text-[var(--muted)]">{profile.nameEn}</p>
        </div>
        {profile.visibility === "deal_room" ? (
          <span className="rounded-md bg-[#f1efe7] p-2 text-[var(--gold)]">
            <LockKeyhole size={18} />
          </span>
        ) : null}
      </div>
      <p className="mt-4 min-h-16 text-sm leading-6 text-[var(--muted)]">
        {profile.oneLine}
      </p>
      <div className="mt-4">
        <VerificationBadge
          level={profile.verificationLevel}
          status={profile.verificationStatus}
        />
      </div>
      <div className="mt-5 grid gap-3 text-sm">
        <div className="flex gap-2">
          <FileText size={16} className="mt-0.5 text-[var(--accent)]" />
          <span>{profile.currentNeeds[0]?.label}</span>
        </div>
        <div className="flex gap-2 text-[var(--muted)]">
          <AlertTriangle size={16} className="mt-0.5 text-amber-700" />
          <span>{profile.risks[0]}</span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {profile.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full bg-[#edf2ec] px-3 py-1 text-xs">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/profiles/${profile.slug}`}
        className="mt-6 inline-flex rounded-md border border-[var(--line)] px-4 py-2 text-sm font-semibold hover:bg-[#f6f7f2]"
      >
        Impact Profile 보기
      </Link>
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
