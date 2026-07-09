import { PageShell } from "@/components/site-shell";
import { ProfileCard } from "@/components/profile-card";
import { SectionHeader } from "@/components/ui";
import { profiles } from "@/lib/seed-data";

export default function ProfilesPage() {
  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="Impact Profiles"
          title="검증 상태가 먼저 보이는 프로필 목록"
          body="실제 조직은 공개자료 기반으로 표시되며, 현장 확인 전에는 Not Field Verified를 명확히 표시합니다. Public 페이지에는 샘플 프로필을 우선 노출할 수 있습니다."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
