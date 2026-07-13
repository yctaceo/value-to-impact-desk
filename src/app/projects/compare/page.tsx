import Link from "next/link";
import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";
import { demoProjects } from "@/data/demo/projects";
import { getLang, pickLang } from "@/lib/i18n";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ slugs?: string; lang?: string }>;
}) {
  const query = await searchParams;
  const lang = getLang(query);
  const selected = (query.slugs ?? "")
    .split(",")
    .filter(Boolean)
    .slice(0, 3);
  const projects = demoProjects.filter((project) => selected.includes(project.slug));

  return (
    <PageShell>
      <section className="container-page py-12">
        <SectionHeader
          eyebrow="Compare"
          title={lang === "en" ? "Compare projects side by side." : "프로젝트를 나란히 비교합니다."}
          body={
            lang === "en"
              ? "Designed for corporate owners and CSR teams who need a practical shortlist."
              : "기업 오너와 CSR팀이 실제 검토 후보를 좁힐 수 있도록 만든 비교 화면입니다."
          }
        />

        {projects.length ? (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr>
                  <th className="border-b border-[var(--line)] bg-white p-4">Field</th>
                  {projects.map((project) => (
                    <th key={project.slug} className="border-b border-[var(--line)] bg-white p-4">
                      {pickLang(lang, project.organizationKo, project.organizationEn)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="align-top">
                {[
                  ["Project", (project: (typeof projects)[number]) => pickLang(lang, project.titleKo, project.titleEn)],
                  ["Need", (project: (typeof projects)[number]) => pickLang(lang, project.currentNeedKo, project.currentNeedEn)],
                  ["Verification", (project: (typeof projects)[number]) => pickLang(lang, project.verificationLabelKo, project.verificationLabelEn)],
                  ["Metrics", (project: (typeof projects)[number]) => (lang === "en" ? project.metricsEn : project.metricsKo).join(", ")],
                  ["Source", (project: (typeof projects)[number]) => project.sourceLabel],
                ].map(([label, getter]) => (
                  <tr key={label as string}>
                    <td className="border-b border-[var(--line)] bg-[#f7f8f4] p-4 font-semibold">
                      {label as string}
                    </td>
                    {projects.map((project) => (
                      <td
                        key={`${project.slug}-${label as string}`}
                        className="border-b border-[var(--line)] bg-white p-4 leading-6 text-[var(--muted)]"
                      >
                        {(getter as (project: (typeof projects)[number]) => string)(project)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="panel mt-8 p-6">
            <p className="text-[var(--muted)]">No selected projects yet.</p>
            <Link
              href="/projects"
              className="mt-4 inline-flex rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-white"
            >
              Back to Projects
            </Link>
          </div>
        )}
      </section>
    </PageShell>
  );
}
