import { PageShell } from "@/components/site-shell";
import { ButtonLink, SectionHeader } from "@/components/ui";

export default function ForOrganizationsPage() {
  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="For Organizations"
          title="사회적기업과 비영리는 서로 다른 요청 구조를 가집니다."
          body="영리형 Social Impact 기업은 투자/구매/파트너십 중심으로, 비영리와 사회적협동조합은 후원/보조금/CSR 협력 중심으로 CTA와 리포트가 달라져야 합니다."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="panel p-6">
            <h2 className="text-xl font-semibold">사회적기업 / Impact Venture</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              투자, 기업구매, B2B 파트너십, 공공조달 가능성을 중심으로
              business impact와 social impact를 함께 보여줍니다.
            </p>
          </div>
          <div className="panel p-6">
            <h2 className="text-xl font-semibold">비영리 / 사회적협동조합</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              후원금 사용처, 수혜자 변화, 프로그램 지속성, 증빙자료를 중심으로
              donor report와 CSR report에 적합하게 구조화합니다.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <ButtonLink href="/apply">Organization Intake 시작</ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
