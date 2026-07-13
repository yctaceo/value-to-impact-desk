import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="About Us"
          title="Value-to-Impact Desk는 한국의 현장 프로젝트를 기업이 읽을 수 있는 임팩트 데이터로 바꿉니다."
          body="우리는 단순 추천 서비스가 아니라 프로젝트 발견, 월간보고, 증빙, 기업용 리포트 다운로드까지 연결하는 신뢰 인프라를 지향합니다."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            ["The Gap", "한국의 비영리와 사회적기업은 좋은 활동을 하지만, 기업 후원자와 투자자가 검토할 수 있는 구조화된 자료가 부족합니다."],
            ["What We Do", "프로젝트 카드, 검증 단계, 월간 성과 보고, 사회공헌 보고서용 다운로드 자료를 하나의 흐름으로 만듭니다."],
            ["Korea First", "발달장애/경계선지능 고용, 보호종료·불안정 지원 청년, 다문화 청소년 교육·진로 지원을 초기 파일럿으로 봅니다."],
            ["Business Model", "프로젝트 프로필, 기업 포트폴리오, 리포트 생성, 검증 워크플로우, 맞춤 리서치를 기반으로 확장합니다."],
            ["Trust Principles", "공개자료, 조직 제출자료, 증빙 검토, 현장 검증을 명확히 분리하고 AI는 검증자가 아니라 초안 작성자로 둡니다."],
            ["Global Ready", "한국 HQ에서 시작하되 KR/EN 구조와 표준 지표를 통해 글로벌 기업 파트너가 읽을 수 있는 자료로 확장합니다."],
          ].map(([title, body]) => (
            <div key={title} className="panel p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
