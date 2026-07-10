import { ProjectDiscoveryWall } from "@/components/project-discovery-wall";
import { PageShell } from "@/components/site-shell";
import { profiles } from "@/lib/seed-data";

export default function ProfilesPage() {
  return (
    <PageShell>
      <section className="bg-[var(--sage-100)] py-12">
        <div className="container-page">
          <p className="eyebrow">Project Discovery</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
            사회문제, 필요한 지원, 검증 단계로 프로젝트를 탐색하세요.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            이 목록은 프로젝트 발견을 위한 입구입니다. 실제 조직은 공개자료 기반
            상태와 검증 단계를 명확히 표시하며, 직접 결제나 투자중개 기능은
            제공하지 않습니다.
          </p>
        </div>
      </section>
      <ProjectDiscoveryWall profiles={profiles} />
    </PageShell>
  );
}
