import Link from "next/link";
import { ArrowRight, BarChart3, FileDown, Globe2, ShieldCheck } from "lucide-react";
import { getFeaturedDemoProjects } from "@/data/demo/projects";
import type { Lang } from "@/lib/i18n";
import { pickLang } from "@/lib/i18n";

const sections = [
  {
    eyebrow: "Korea's Hidden Gap",
    title: "좋은 프로젝트는 많지만, 기업이 바로 검토할 수 있는 자료는 부족합니다.",
    body: "현장 조직은 활동을 하고, 기업은 사회공헌 보고서와 검증 가능한 지표를 원합니다. Value-to-Impact Desk는 그 사이의 자료 구조를 만듭니다.",
  },
  {
    eyebrow: "One Platform",
    title: "프로젝트 발견, 검증, 월간보고, 다운로드까지 한 흐름으로 연결합니다.",
    body: "Benevity의 기업 활용성, Indiegogo식 프로젝트 탐색, Impact Genome식 지표 구조, 60 Decibels식 신호 수집을 한국 파일럿에 맞춥니다.",
  },
  {
    eyebrow: "For Companies",
    title: "기업 대시보드는 후원·투자·구매 후보를 포트폴리오로 관리합니다.",
    body: "Sean Kouplen의 Regent Bank 같은 기업 오너가 궁금해할 정보: 누가, 어떤 문제를, 어떤 증빙으로, 이번 달 무엇을 바꿨는지 한 화면에서 봅니다.",
  },
  {
    eyebrow: "Impact Tracing",
    title: "돈이 나간 뒤의 활동, 산출, 증빙, 다음 계획을 월별로 추적합니다.",
    body: "기부금 사용처만 쓰지 않습니다. 프로젝트가 사회공헌 보고서에 들어갈 수 있는 문장과 지표로 바뀌는 과정을 기록합니다.",
  },
  {
    eyebrow: "For Grassroots Nonprofits",
    title: "비영리와 사회적기업은 복잡한 보고서 대신 표준 월간보고를 올립니다.",
    body: "활동, 참여자, 지출, 고용, 사진/문서 증빙, 다음 달 계획을 간단히 입력하면 후원자용 리포트 초안으로 전환됩니다.",
  },
  {
    eyebrow: "From Evidence to Signal",
    title: "AI는 검증자가 아니라 읽히는 보고서 초안을 만드는 도구입니다.",
    body: "AI 리포트는 원천 필드에 근거해야 하며, 검증 레벨은 관리자 또는 리뷰어가 부여합니다.",
  },
  {
    eyebrow: "Trust Architecture",
    title: "Public-source, organization-provided, evidence-reviewed, field-verified를 분리합니다.",
    body: "실제 서비스에서는 Supabase RLS, 파일 증빙, 승인 워크플로우를 연결해 공개 가능한 정보와 비공개 데이터룸을 구분합니다.",
  },
  {
    eyebrow: "Global Expansion",
    title: "한국에서 시작하되, 글로벌 기업 후원자와 투자자가 읽을 수 있는 언어로 확장합니다.",
    body: "KR/EN 토글과 표준 프로젝트 구조를 기반으로 국내 파일럿을 글로벌 CSR·임팩트 투자 문법으로 번역합니다.",
  },
];

function MiniProjectCard({
  project,
  lang,
}: {
  project: ReturnType<typeof getFeaturedDemoProjects>[number];
  lang: Lang;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="panel flex h-full flex-col overflow-hidden">
      <div className="aspect-[4/3] bg-[#dfe8df]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageUrl}
          alt={pickLang(lang, project.imageAltKo, project.imageAltEn)}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase text-[var(--accent)]">
          {project.organizationType}
        </p>
        <h3 className="mt-3 text-xl font-semibold leading-7">
          {pickLang(lang, project.titleKo, project.titleEn)}
        </h3>
        <p className="mt-2 text-sm font-semibold text-[var(--muted)]">
          {pickLang(lang, project.organizationKo, project.organizationEn)}
        </p>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
          {pickLang(lang, project.currentNeedKo, project.currentNeedEn)}
        </p>
      </div>
    </Link>
  );
}

export function FrontFirstHome({ lang }: { lang: Lang }) {
  const projects = getFeaturedDemoProjects();

  return (
    <>
      <section className="border-b border-[var(--line)] bg-white">
        <div className="container-page grid gap-8 py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Value-to-Impact Desk</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Projects first. Evidence always. Reports ready for companies.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              비영리와 사회적기업의 프로젝트를 기업 후원자·투자자·CSR팀이 바로
              검토할 수 있는 검증형 정보와 월간 성과 리포트로 바꾸는 플랫폼입니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white"
              >
                Explore Projects <ArrowRight size={16} />
              </Link>
              <Link
                href="/dashboard/company"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold"
              >
                View Dashboard
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              ["3", "Korea-first pilot verticals"],
              ["KR/EN", "Global-ready project profile"],
              ["Monthly", "Nonprofit performance report"],
            ].map(([value, label]) => (
              <div key={label} className="panel p-5">
                <p className="text-3xl font-semibold text-[var(--ink)]">{value}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {sections.slice(0, 2).map((section) => (
        <section key={section.eyebrow} className="marketing-section">
          <div className="container-page max-w-4xl">
            <p className="eyebrow">{section.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              {section.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{section.body}</p>
          </div>
        </section>
      ))}

      <section className="marketing-section bg-white">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Featured Korean Projects</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                프로젝트가 전면에 보이는 구조입니다.
              </h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold">
              All projects <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <MiniProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {sections.slice(2, 8).map((section, index) => (
        <FeatureSection key={section.eyebrow} section={section} index={index} />
      ))}

      <section className="dark-section">
        <div className="container-page py-14">
          <p className="eyebrow text-[#bfe4d5]">Final CTA</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            후원과 투자를 “좋은 의도”에서 “증빙 가능한 임팩트”로 옮깁니다.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-[var(--ink)]"
            >
              Explore Projects
            </Link>
            <Link
              href="/apply"
              className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white"
            >
              Register a Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureSection({
  section,
  index,
}: {
  section: (typeof sections)[number];
  index: number;
}) {
  const Icon = [BarChart3, FileDown, ShieldCheck, Globe2][index % 4];

  return (
    <section className={index % 2 ? "marketing-section bg-white" : "marketing-section"}>
      <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="panel p-6">
          <Icon size={28} className="text-[var(--accent)]" />
          <p className="mt-5 eyebrow">{section.eyebrow}</p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {section.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{section.body}</p>
        </div>
      </div>
    </section>
  );
}
