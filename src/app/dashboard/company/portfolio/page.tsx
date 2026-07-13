import Link from "next/link";
import { PageShell } from "@/components/site-shell";
import { SectionHeader, StatCard } from "@/components/ui";
import { demoProjects } from "@/data/demo/projects";

export default function CompanyPortfolioPage() {
  return (
    <PageShell>
      <section className="container-page py-12">
        <SectionHeader
          eyebrow="Company Portfolio"
          title="내가 후원하거나 검토 중인 프로젝트 포트폴리오"
          body="프론트 데모에서는 기본 프로젝트를 보여줍니다. 실제 운영에서는 Supabase portfolio 테이블과 로그인 사용자를 연결합니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard label="Active projects" value="3" />
          <StatCard label="Reports ready" value="2" />
          <StatCard label="Open actions" value="4" />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {demoProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="panel overflow-hidden">
              <div className="aspect-[4/3] bg-[#dfe8df]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.imageUrl} alt={project.imageAltKo} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-[var(--accent)]">{project.organizationKo}</p>
                <h2 className="mt-2 text-xl font-semibold">{project.titleKo}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.committedSupportKo}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
