import { ReportGenerator } from "@/components/report-generator";
import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";
import { Database, FileCheck2, FileText } from "lucide-react";

export default function SampleReportPage() {
  return (
    <PageShell>
      <section className="container-page grid gap-8 py-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeader
            eyebrow="AI Report Preview"
            title="비영리기업이 투명하게 공개한 데이터를 기반으로 CSR 보고서를 자동으로 작성합니다."
            body="활동, 지출, 참여자 변화, 증빙자료를 기업 담당자가 바로 읽을 수 있는 보고서 구조로 정리합니다. 공개된 입력값과 조직 제출자료를 문장으로 바꾸고, 검증 상태는 별도 항목으로 표시합니다."
          />
          <div className="mt-8 grid gap-3">
            {[
              {
                icon: Database,
                title: "입력 데이터",
                body: "조직이 공개하거나 직접 제출한 활동, 예산, 참여자 변화, 증빙 목록을 사용합니다.",
              },
              {
                icon: FileText,
                title: "CSR 문장화",
                body: "기업 사회공헌 보고서에 맞는 요약, 지표 설명, 다음 지원 필요사항으로 재구성합니다.",
              },
              {
                icon: FileCheck2,
                title: "근거 표시",
                body: "출처와 증빙 상태를 함께 보여줘 과장된 표현 없이 검토 가능한 보고서로 만듭니다.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-lg border border-[var(--line)] bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-[var(--accent-soft)] p-2 text-[var(--accent)]">
                    <Icon size={18} />
                  </span>
                  <h2 className="font-semibold">{title}</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
        <ReportGenerator />
      </section>
    </PageShell>
  );
}
