import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="What is Value-to-Impact Desk"
          title="좋은 조직을 찾는 문제가 아니라, 신뢰 가능한 자료로 유지하는 문제입니다."
          body="Value-to-Impact Desk는 사회적기업, 비영리, BAM, 가치기반 비즈니스가 흩어진 활동자료를 표준화하고 후원자/기업/투자자가 읽을 수 있는 검증형 프로필과 리포트로 전환하는 플랫폼입니다."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["Business", "Impact Profile 제작, 월간 리포팅, CSR/구매 프로젝트, 맞춤형 리서치의 기반을 만듭니다."],
            ["Technology", "Supabase Auth/DB/Storage/RLS와 AI report route를 사용해 데이터룸 구조를 만듭니다."],
            ["Research", "Value-driven business가 social impact와 business impact로 전환되는 과정을 추적합니다."],
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
