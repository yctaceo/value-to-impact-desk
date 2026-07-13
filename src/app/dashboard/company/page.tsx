import Link from "next/link";
import { Download, FileText, PieChart, TrendingUp } from "lucide-react";
import { DemoActionButton } from "@/components/dashboard/demo-action-button";
import { PageShell } from "@/components/site-shell";
import { SectionHeader, StatCard } from "@/components/ui";
import { demoProjects } from "@/data/demo/projects";

function formatKrw(value: number) {
  return `${Math.round(value / 10000).toLocaleString("ko-KR")}만원`;
}

export default function CompanyDashboardPage() {
  const portfolio = demoProjects.slice(0, 2);
  const recommended = demoProjects.slice(2);

  return (
    <PageShell>
      <section className="container-page grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
        <aside className="panel h-fit p-4">
          <p className="text-sm font-semibold">Company Workspace</p>
          {[
            ["Overview", "/dashboard/company"],
            ["Portfolio", "/dashboard/company/portfolio"],
            ["Reports", "/sample-report"],
            ["Discover", "/projects"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="mt-2 block rounded-md px-3 py-2 text-sm font-semibold hover:bg-[var(--sage-50)]">
              {label}
            </Link>
          ))}
        </aside>
        <div className="space-y-8">
          <SectionHeader
            eyebrow="Company Dashboard"
            title="후원·투자·구매 후보와 사회공헌 보고서 자료를 한 화면에서 봅니다."
            body="현재는 Supabase 연결 전 프론트 데모입니다. 저장, 다운로드, 리포트 생성 액션은 데모 상태로 동작합니다."
          />

          <div className="grid gap-4 md:grid-cols-4">
            <StatCard label="Portfolio projects" value={`${portfolio.length}`} />
            <StatCard label="Committed support" value={formatKrw(31700000)} />
            <StatCard label="Open report drafts" value="4" />
            <StatCard label="Action required" value="2" />
          </div>

          <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="panel p-6">
              <div className="flex items-center gap-2">
                <PieChart size={20} className="text-[var(--accent)]" />
                <h2 className="text-xl font-semibold">Portfolio by cause</h2>
              </div>
              <div className="mt-5 grid gap-3">
                {portfolio.map((project) => (
                  <div key={project.id} className="rounded-md bg-[#fbfaf8] p-4">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-semibold">{project.organizationKo}</p>
                        <p className="mt-1 text-sm text-[var(--muted)]">{project.category}</p>
                      </div>
                      <p className="text-sm font-semibold">{formatKrw(project.committedAmountKrw)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-6">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-[var(--accent)]" />
                <h2 className="text-xl font-semibold">Report center</h2>
              </div>
              <div className="mt-5 grid gap-3">
                {["CSR evidence pack", "Board one-page brief", "Donation receipt appendix"].map((item) => (
                  <div key={item} className="flex items-center justify-between gap-3 rounded-md bg-[#fbfaf8] p-3">
                    <span className="text-sm font-semibold">{item}</span>
                    <DemoActionButton label="Download" doneLabel="Ready" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="panel p-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-[var(--accent)]" />
              <h2 className="text-xl font-semibold">Latest updates and action required</h2>
            </div>
            <div className="mt-5 grid gap-4">
              {portfolio.map((project) => (
                <div key={project.slug} className="grid gap-4 rounded-md bg-[#fbfaf8] p-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <p className="font-semibold">{project.titleKo}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {project.updates[0]?.activitiesKo}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/projects/${project.slug}`} className="rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold">
                      Review
                    </Link>
                    <DemoActionButton label="Approve report" doneLabel="Approved" variant="primary" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Recommended projects</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {recommended.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="panel p-5">
                  <Download size={20} className="text-[var(--accent)]" />
                  <h3 className="mt-4 font-semibold">{project.organizationKo}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{project.oneLineImpactKo}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
