import { PageShell } from "@/components/site-shell";
import { SectionHeader, StatCard } from "@/components/ui";
import { MonthlyReportForm } from "@/components/monthly-report-form";
import { profiles } from "@/lib/seed-data";

export default function OrganizationDashboardPage() {
  const profile = profiles[6];

  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="Organization Dashboard"
          title="조직은 프로필, 증빙, 월간보고를 스스로 업데이트합니다."
          body="행정력이 약한 조직도 입력할 수 있게 핵심 필드만 먼저 받고, 저장 후 이어쓰기와 AI 문장 정리를 전제로 설계했습니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label="Profile Status" value="Draft / Review" />
          <StatCard label="Verification" value={`Level ${profile.verificationLevel}`} />
          <StatCard label="Evidence" value="3 files" />
          <StatCard label="Monthly Update" value="Due" />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="panel p-6">
            <h2 className="text-xl font-semibold">{profile.nameKo}</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">{profile.oneLine}</p>
            <div className="mt-6 space-y-3 text-sm">
              <p>
                <strong>Next task:</strong> 월간보고와 증빙자료 업로드
              </p>
              <p>
                <strong>Admin note:</strong> 수혜자 사진은 동의 여부 확인 전
                public profile에서 제외
              </p>
            </div>
          </div>
          <MonthlyReportForm />
        </div>
      </section>
    </PageShell>
  );
}
