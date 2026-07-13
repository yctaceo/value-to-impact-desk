import { InvestorImpactDashboard } from "@/components/dashboard/investor-impact-dashboard";
import { PageShell } from "@/components/site-shell";
import { demoProjects } from "@/data/demo/projects";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const { project } = await searchParams;

  return (
    <PageShell>
      <section className="container-page py-10">
        <InvestorImpactDashboard projects={demoProjects} activeSlug={project} />
      </section>
    </PageShell>
  );
}
