import { MonthlyReportForm } from "@/components/monthly-report-form";
import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";

export default function OrgMonthlyReportPage() {
  return (
    <PageShell>
      <section className="container-page grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="Monthly Performance Report"
          title="월간보고는 후원자 리포트와 논문 데이터의 원천입니다."
          body="활동, 고용, 매출/후원금, 제품판매, 문제, 다음 계획, 증빙을 같은 구조로 매월 쌓습니다."
        />
        <MonthlyReportForm />
      </section>
    </PageShell>
  );
}
