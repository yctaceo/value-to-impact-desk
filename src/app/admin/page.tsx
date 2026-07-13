import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { ProfileEvidenceBox } from "@/components/profile-card";
import { SectionHeader, StatCard } from "@/components/ui";
import { profiles } from "@/lib/seed-data";

const adminTasks: { icon: LucideIcon; text: string }[] = [
  { icon: Clock, text: "신규 / 검토중 / 보완요청 / 승인 상태 관리" },
  { icon: FileText, text: "증빙자료 확인 및 내부 리스크 메모" },
  { icon: CheckCircle2, text: "Verification Level 0-4 부여" },
  { icon: AlertTriangle, text: "투자중개로 보일 표현 차단" },
];

export default function AdminPage() {
  const pending = profiles.filter((profile) => profile.verificationLevel <= 1);

  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="Admin Dashboard"
          title="검증 레벨, 증빙 누락, 공개 범위를 수동으로 관리합니다."
          body="MVP의 핵심은 자동화가 아니라 관리자가 실제로 검토 가능한 데이터 구조입니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label="Organizations" value={String(profiles.length)} />
          <StatCard label="Pending Review" value={String(pending.length)} />
          <StatCard label="Evidence Submitted" value="2 Sample" />
          <StatCard label="AI Drafts" value="Mock-ready" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="panel overflow-hidden">
            <div className="border-b border-[var(--line)] p-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <h2 className="text-xl font-semibold">Organization Review Queue</h2>
                <Link
                  href="/admin/scouting"
                  className="rounded-md border border-[var(--line)] px-3 py-2 text-sm font-semibold"
                >
                  Korea scouting module
                </Link>
              </div>
            </div>
            <div className="divide-y divide-[var(--line)]">
              {profiles.map((profile) => (
                <Link
                  key={profile.id}
                  href={`/profiles/${profile.slug}`}
                  className="grid gap-4 p-5 hover:bg-[#fbfaf8] md:grid-cols-[1.2fr_0.8fr_0.8fr_0.6fr]"
                >
                  <div>
                    <p className="font-semibold">{profile.nameKo}</p>
                    <p className="text-sm text-[var(--muted)]">{profile.nameEn}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-[var(--muted)]">Status</p>
                    <p className="font-semibold">{profile.verificationStatus}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-[var(--muted)]">Visibility</p>
                    <p className="font-semibold">{profile.visibility}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-[var(--muted)]">Level</p>
                    <p className="font-semibold">L{profile.verificationLevel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="panel p-5">
              <h2 className="font-semibold">Admin Tasks</h2>
              <div className="mt-4 space-y-3 text-sm">
                {adminTasks.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex gap-3">
                    <Icon size={17} className="mt-0.5 text-[var(--accent)]" />
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <ProfileEvidenceBox profile={profiles[0]} />
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
