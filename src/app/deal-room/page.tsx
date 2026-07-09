import { PageShell } from "@/components/site-shell";
import { ProfileCard } from "@/components/profile-card";
import { SectionHeader, StatCard } from "@/components/ui";
import { getDealRoomProfiles } from "@/lib/seed-data";

const filters = [
  "기업구매 가능",
  "후원 필요",
  "투자 검토",
  "장애/접근성",
  "여성회복",
  "환경",
  "Level 1",
  "Level 2+",
];

export default function DealRoomPage() {
  const privateProfiles = getDealRoomProfiles();

  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="Private Deal Room"
          title="투자중개가 아니라 Due Diligence가 필요한 Opportunity Brief 공간"
          body="후원자, 투자자, 기업 CSR 담당자는 검증 레벨과 증빙 상태를 먼저 보고 Request Introduction 또는 Partnership Inquiry를 남깁니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label="Profiles" value={String(privateProfiles.length)} />
          <StatCard label="Public-source" value="6" />
          <StatCard label="Field Verified" value="0" />
          <StatCard label="Action" value="Inquiry only" />
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm"
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {privateProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
