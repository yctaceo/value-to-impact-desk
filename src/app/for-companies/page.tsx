import { PageShell } from "@/components/site-shell";
import { ButtonLink, SectionHeader } from "@/components/ui";

export default function ForCompaniesPage() {
  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="For Corporate CSR / ESG"
          title="기업 사회공헌 보고서에 바로 쓸 수 있는 자료 구조를 만듭니다."
          body="기업은 자신이 후원하거나 구매한 조직의 월간 업데이트, 활동사진, 고용 변화, 증빙 상태, AI 리포트 초안을 대시보드에서 확인하고 다운로드할 수 있어야 합니다."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["CSR Report", "기업 사회공헌 보고서 문장과 지표 초안 생성"],
            ["Impact Procurement", "사회적기업 제품/서비스 구매 가능성 표시"],
            ["Employee Program", "임직원 참여형 봉사와 구매 패키지 기록"],
          ].map(([title, body]) => (
            <div key={title} className="panel p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/sample-report">CSR Report Preview</ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
