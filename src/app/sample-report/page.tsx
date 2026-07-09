import { ReportGenerator } from "@/components/report-generator";
import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";

export default function SampleReportPage() {
  return (
    <PageShell>
      <section className="container-page grid gap-8 py-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeader
            eyebrow="AI Report Preview"
            title="AI는 검증자가 아니라 리포트 초안 작성자입니다."
            body="AI가 작성한 모든 문장은 가능한 한 source field와 연결되어야 합니다. Verification Level은 Admin 또는 Reviewer가 부여한 값만 사용합니다."
          />
          <div className="panel mt-8 p-5">
            <h3 className="font-semibold">Supported report types</h3>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li>- 1p Impact Summary</li>
              <li>- 5p Donor / Investor Brief</li>
              <li>- Monthly Impact Report</li>
              <li>- Company / CSR Procurement Brief</li>
              <li>- English Impact Profile Draft</li>
            </ul>
          </div>
        </div>
        <ReportGenerator />
      </section>
    </PageShell>
  );
}
