import { ProjectsBrowser } from "@/components/projects/projects-browser";
import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";
import { demoProjects } from "@/data/demo/projects";
import { getLang } from "@/lib/i18n";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = getLang(await searchParams);

  return (
    <PageShell>
      <section className="border-b border-[var(--line)] bg-white">
        <div className="container-page py-12">
          <SectionHeader
            eyebrow="Projects"
            title={
              lang === "en"
                ? "Find verified impact projects before writing a check."
                : "수표를 쓰기 전에, 검증 가능한 임팩트 프로젝트를 먼저 봅니다."
            }
            body={
              lang === "en"
                ? "A project-first discovery page for corporate donors, investors, and CSR teams. Save, compare, and add projects to a demo portfolio."
                : "기업 후원자·투자자·CSR팀이 프로젝트를 저장, 비교, 포트폴리오에 추가할 수 있는 프로젝트 우선 탐색 화면입니다."
            }
          />
        </div>
      </section>
      <section className="container-page py-10">
        <ProjectsBrowser projects={demoProjects} lang={lang} />
      </section>
    </PageShell>
  );
}
