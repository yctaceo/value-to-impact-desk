import { ProjectDiscoveryWall } from "@/components/project-discovery-wall";
import { PageShell } from "@/components/site-shell";
import { ButtonLink, StatCard } from "@/components/ui";
import { profiles } from "@/lib/seed-data";

export default function Home() {
  return (
    <PageShell>
      <section className="border-b border-[var(--line)] bg-[#eef4ed]">
        <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_380px] lg:py-14">
          <div>
            <p className="eyebrow">Project Discovery Wall</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              좋은 프로젝트를 먼저 보고, 임팩트는 투명하게 추적하세요.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              사회적기업·비영리·BAM 프로젝트를 Pinterest/Kickstarter처럼
              탐색하고, 로그인 후에는 나의 후원·투자·기업구매와 월간
              임팩트 보고를 Dashboard에서 확인합니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="#projects">프로젝트 둘러보기</ButtonLink>
              <ButtonLink href="/dashboard" variant="secondary">
                내 Dashboard 보기
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <StatCard label="Project Cards" value={`${profiles.length}개`} note="Seed + sample profiles" />
            <StatCard label="Tracking" value="월간보고" note="후원금, 고용, 제품판매, 보고서" />
            <StatCard label="Safety" value="No Payment" note="결제/투자중개 없음" />
          </div>
        </div>
      </section>

      <section id="projects">
        <ProjectDiscoveryWall profiles={profiles} />
      </section>

      <section className="bg-white py-12">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {[
            [
              "앞단은 쉽게",
              "사용자는 먼저 프로젝트 카드, 이미지, 미션, 현재 필요한 도움을 봅니다.",
            ],
            [
              "로그인하면 투명하게",
              "후원자/투자자/기업은 자신의 돈과 임팩트, 보고서 다운로드 상태를 봅니다.",
            ],
            [
              "뒷단은 검증 기반",
              "증빙자료, Verification Level, 월간보고, AI 리포트 초안은 계속 유지됩니다.",
            ],
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
