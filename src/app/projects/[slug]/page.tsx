import { notFound } from "next/navigation";
import { ProjectActionPanel } from "@/components/projects/project-action-panel";
import { PageShell } from "@/components/site-shell";
import { StatCard } from "@/components/ui";
import { demoProjects, getDemoProject } from "@/data/demo/projects";
import { getLang, pickLang } from "@/lib/i18n";

function formatKrw(value: number) {
  return `${Math.round(value / 10000).toLocaleString("ko-KR")}만원`;
}

export function generateStaticParams() {
  return demoProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const lang = getLang(query);
  const project = getDemoProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <section className="border-b border-[var(--line)] bg-white">
        <div className="container-page grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              {pickLang(lang, project.titleKo, project.titleEn)}
            </h1>
            <p className="mt-3 text-xl text-[var(--muted)]">
              {pickLang(lang, project.organizationKo, project.organizationEn)} · {project.region}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {pickLang(lang, project.oneLineImpactKo, project.oneLineImpactEn)}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-2 text-[var(--accent)]">
                {project.organizationType}
              </span>
              <span className="rounded-full bg-[#eef1ea] px-3 py-2 text-[var(--muted)]">
                {pickLang(lang, project.verificationLabelKo, project.verificationLabelEn)}
              </span>
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--line)] px-3 py-2 text-[var(--muted)]"
              >
                {project.sourceLabel}
              </a>
            </div>
          </div>
          <div className="panel overflow-hidden">
            <div className="aspect-[4/3] bg-[#dfe8df]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.imageUrl}
                alt={pickLang(lang, project.imageAltKo, project.imageAltEn)}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-3">
              <StatCard label="Target" value={formatKrw(project.targetAmountKrw)} />
              <StatCard label="Committed" value={formatKrw(project.committedAmountKrw)} />
              <StatCard label="Latest update" value={project.latestUpdate} />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          {[
            {
              id: "story",
              title: "Story",
              body: pickLang(lang, project.problemKo, project.problemEn),
              extra: pickLang(lang, project.whyNowKo, project.whyNowEn),
            },
            {
              id: "impact",
              title: "Impact",
              body: pickLang(lang, project.participantsKo, project.participantsEn),
              list: lang === "en" ? project.intendedOutcomesEn : project.intendedOutcomesKo,
            },
            {
              id: "updates",
              title: "Updates",
              body: pickLang(
                lang,
                project.updates[0]?.activitiesKo ?? "",
                project.updates[0]?.activitiesEn ?? "",
              ),
              list:
                lang === "en"
                  ? project.updates[0]?.evidenceEn ?? []
                  : project.updates[0]?.evidenceKo ?? [],
            },
            {
              id: "evidence",
              title: "Evidence",
              body: pickLang(lang, project.participantVoiceKo, project.participantVoiceEn),
              list: lang === "en" ? project.evidenceEn : project.evidenceKo,
            },
          ].map((section) => (
            <section key={section.id} id={section.id} className="panel p-6">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-4 leading-7 text-[var(--muted)]">{section.body}</p>
              {section.extra ? (
                <p className="mt-4 leading-7 text-[var(--muted)]">{section.extra}</p>
              ) : null}
              {section.list ? (
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-[var(--muted)] md:grid-cols-2">
                  {section.list.map((item) => (
                    <li key={item} className="rounded-md bg-[#f7f8f4] p-3">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section id="budget" className="panel p-6">
            <h2 className="text-2xl font-semibold">Budget</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {project.budget.map((item) => (
                <div key={item.labelKo} className="rounded-md bg-[#f7f8f4] p-4">
                  <p className="text-sm text-[var(--muted)]">
                    {pickLang(lang, item.labelKo, item.labelEn)}
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    {pickLang(lang, item.valueKo, item.valueEn)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="organization" className="panel p-6">
            <h2 className="text-2xl font-semibold">Organization</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <p className="leading-7 text-[var(--muted)]">
                {pickLang(lang, project.organization.missionKo, project.organization.missionEn)}
              </p>
              <div className="rounded-md bg-[#f7f8f4] p-4 text-sm leading-7 text-[var(--muted)]">
                <p>Legal type: {project.organization.legalType}</p>
                <p>Founded: {project.organization.founded}</p>
                {project.organization.website ? (
                  <a href={project.organization.website} target="_blank" rel="noreferrer">
                    Website: {project.organization.website}
                  </a>
                ) : null}
              </div>
            </div>
          </section>
        </div>
        <aside>
          <ProjectActionPanel projectSlug={project.slug} />
        </aside>
      </section>
    </PageShell>
  );
}
