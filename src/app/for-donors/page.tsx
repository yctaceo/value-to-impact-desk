import { PageShell } from "@/components/site-shell";
import { ButtonLink, SectionHeader } from "@/components/ui";

export default function ForDonorsPage() {
  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="For Donors & Investors"
          title="후원자와 투자자는 추천 목록보다 검증 가능한 질문지가 필요합니다."
          body="각 프로필은 지금 필요한 것, 기대효과, 검증 레벨, 누락 증빙, 리스크를 먼저 보여줍니다. 투자는 중개하지 않고 Due Diligence Required 상태의 리서치 브리프만 제공합니다."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["Donor Brief", "후원금 사용처, 수혜자 변화, 월간 활동보고 중심"],
            ["Investor Brief", "영리형 impact venture의 수익모델, 성장성, 리스크 중심"],
            ["Research Export", "논문 데이터로 활용 가능한 익명화 지표 축적"],
          ].map(([title, body]) => (
            <div key={title} className="panel p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/deal-room">Deal Room 보기</ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
