import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileDown,
  FileText,
  Gauge,
  HandCoins,
  Layers3,
  Search,
  ShieldCheck,
} from "lucide-react";
import { getFeaturedDemoProjects } from "@/data/demo/projects";
import type { Lang } from "@/lib/i18n";
import { pickLang } from "@/lib/i18n";

const deskStats = [
  { value: "03", labelKo: "검토 중인 한국 파일럿", labelEn: "Korea pilot projects in review" },
  { value: "4", labelKo: "검증 레벨", labelEn: "verification levels" },
  { value: "30d", labelKo: "월간보고 주기", labelEn: "monthly reporting cadence" },
];

const pipeline = [
  {
    icon: Search,
    labelKo: "발견",
    labelEn: "Discover",
    bodyKo: "사회문제, 지역, 기업구매 가능성, 필요한 지원으로 프로젝트를 찾습니다.",
    bodyEn: "Find projects by issue, region, procurement fit, and requested support.",
  },
  {
    icon: ShieldCheck,
    labelKo: "검증",
    labelEn: "Verify",
    bodyKo: "공개자료, 조직 제출자료, 증빙, 리뷰 이력을 분리해 표시합니다.",
    bodyEn: "Separate public sources, organization submissions, evidence, and review history.",
  },
  {
    icon: BarChart3,
    labelKo: "추적",
    labelEn: "Track",
    bodyKo: "지원 이후 활동, 지출, 참여자, 고용, 다음 계획을 월별로 갱신합니다.",
    bodyEn: "Update activities, spending, participants, jobs, and next plans each month.",
  },
  {
    icon: FileDown,
    labelKo: "출력",
    labelEn: "Report",
    bodyKo: "CSR팀과 후원자가 바로 읽을 수 있는 근거 연결 리포트를 만듭니다.",
    bodyEn: "Produce source-linked reports for CSR teams and sponsors.",
  },
];

const roleCards = [
  {
    icon: Building2,
    titleKo: "현장 조직",
    titleEn: "Organizations",
    bodyKo: "프로젝트 설명, 활동 사진, 지출, 참여자 변화, 다음 달 계획을 반복 가능한 월간보고로 올립니다.",
    bodyEn: "Submit project context, activity evidence, spend, participant change, and next plans as repeatable monthly reports.",
    href: "/apply",
    ctaKo: "프로젝트 등록",
    ctaEn: "Register project",
  },
  {
    icon: BriefcaseBusiness,
    titleKo: "기업 CSR·구매팀",
    titleEn: "Companies",
    bodyKo: "후원, 구매, 임직원 참여 후보를 비교하고 내부 보고에 필요한 근거를 한 흐름으로 관리합니다.",
    bodyEn: "Compare giving, procurement, and employee engagement candidates with evidence ready for internal reporting.",
    href: "/dashboard/company",
    ctaKo: "기업 대시보드",
    ctaEn: "Company dashboard",
  },
  {
    icon: HandCoins,
    titleKo: "후원자·투자자",
    titleEn: "Donors and investors",
    bodyKo: "지원 전에는 검증 상태를 보고, 지원 후에는 변화와 보고서 출력물을 확인합니다.",
    bodyEn: "Check verification status before support, then follow updates and downloadable reports after support.",
    href: "/projects",
    ctaKo: "프로젝트 탐색",
    ctaEn: "Explore projects",
  },
];

const verificationRows = [
  ["Public-source", "공개자료 기반", "Official links, media, public product pages"],
  ["Submitted", "조직 제출", "Monthly activity, spend, evidence files"],
  ["Evidence-reviewed", "증빙 검토", "Reviewer checks claims against source fields"],
  ["Field-verified", "현장 확인", "Offline review or partner verification"],
];

function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
}) {
  const className =
    variant === "primary"
      ? "bg-[var(--ink)] text-white hover:bg-[var(--ink-strong)]"
      : variant === "light"
        ? "border border-white/25 text-white hover:bg-white/10"
        : "border border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--accent)]";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition ${className}`}
    >
      {children}
    </Link>
  );
}

function DeskPreview({ lang }: { lang: Lang }) {
  const [primary, secondary] = getFeaturedDemoProjects();

  return (
    <div className="border border-[var(--line)] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[#f8faf8] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[var(--ink)]">Impact Desk</p>
          <p className="text-xs text-[var(--muted)]">
            {pickLang(lang, "기업 검토용 라이브 워크스페이스", "Live workspace for company review")}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-soft)] px-3 py-2 text-xs font-semibold text-[var(--accent)]">
          <Gauge size={14} />
          {pickLang(lang, "Supabase 없이 데모 구동", "Demo runs without Supabase")}
        </span>
      </div>

      <div className="grid gap-px bg-[var(--line)] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="bg-white p-4">
          <p className="text-xs font-bold uppercase text-[var(--muted)]">Project Queue</p>
          <div className="mt-4 grid gap-3">
            {[primary, secondary].map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="grid gap-3 border border-[var(--line)] bg-white p-3 hover:border-[var(--accent)] sm:grid-cols-[86px_1fr]"
              >
                <div className="h-20 overflow-hidden bg-[#e7edf4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.imageUrl}
                    alt={pickLang(lang, project.imageAltKo, project.imageAltEn)}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--accent)]">
                    {index === 0 ? "Evidence-reviewed candidate" : "Public-source candidate"}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5">
                    {pickLang(lang, project.titleKo, project.titleEn)}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    {pickLang(lang, project.currentNeedKo, project.currentNeedEn)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-4">
          <div className="grid gap-3 md:grid-cols-3">
            {deskStats.map((stat) => (
              <div key={stat.value} className="border border-[var(--line)] bg-[#fbfcfb] p-3">
                <p className="text-2xl font-semibold text-[var(--ink)]">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  {pickLang(lang, stat.labelKo, stat.labelEn)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 border border-[var(--line)]">
            <div className="border-b border-[var(--line)] bg-[#fff8eb] px-4 py-3">
              <p className="text-sm font-semibold">
                {pickLang(lang, "이번 달 보고서 초안", "Monthly report draft")}
              </p>
            </div>
            <div className="grid gap-4 p-4 md:grid-cols-[1fr_0.86fr]">
              <div>
                <p className="text-xs font-semibold text-[var(--muted)]">
                  {pickLang(lang, primary.organizationKo, primary.organizationEn)}
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-8">
                  {pickLang(lang, "기업 구매가 고용과 보고 가능한 임팩트로 이어지는지 확인합니다.", "Check whether procurement turns into employment and reportable impact.")}
                </h3>
                <div className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
                  <p>Evidence: {pickLang(lang, primary.evidenceKo[0], primary.evidenceEn[0])}</p>
                  <p>Metric: {pickLang(lang, primary.metricsKo[0], primary.metricsEn[0])}</p>
                  <p>Update: {primary.latestUpdate}</p>
                </div>
              </div>
              <div className="bg-[var(--ink)] p-4 text-white">
                <p className="text-xs font-semibold text-white/70">Release Gate</p>
                <div className="mt-4 grid gap-3">
                  {["Claim source", "Evidence status", "Downloadable report"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="shrink-0 text-[#8be0bf]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <CtaLink href="/sample-report" variant="light">
                  <FileDown size={16} />
                  {pickLang(lang, "리포트 보기", "View report")}
                </CtaLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineStep({
  step,
  index,
  lang,
}: {
  step: (typeof pipeline)[number];
  index: number;
  lang: Lang;
}) {
  const Icon = step.icon;

  return (
    <div className="border border-[var(--line)] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <Icon size={22} className="text-[var(--accent)]" />
        <span className="text-sm font-semibold text-[var(--muted)]">0{index + 1}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold">{pickLang(lang, step.labelKo, step.labelEn)}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        {pickLang(lang, step.bodyKo, step.bodyEn)}
      </p>
    </div>
  );
}

function RoleCard({
  card,
  lang,
}: {
  card: (typeof roleCards)[number];
  lang: Lang;
}) {
  const Icon = card.icon;

  return (
    <div className="flex h-full flex-col border border-[var(--line)] bg-white p-6">
      <Icon size={24} className="text-[var(--accent)]" />
      <h3 className="mt-5 text-2xl font-semibold">{pickLang(lang, card.titleKo, card.titleEn)}</h3>
      <p className="mt-4 leading-7 text-[var(--muted)]">{pickLang(lang, card.bodyKo, card.bodyEn)}</p>
      <Link
        href={card.href}
        className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[var(--ink)]"
      >
        {pickLang(lang, card.ctaKo, card.ctaEn)}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function FeaturedProjectStrip({ lang }: { lang: Lang }) {
  const projects = getFeaturedDemoProjects();

  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Live Demo Projects</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(
                lang,
                "첫 화면의 판단은 실제 프로젝트 카드로 이어져야 합니다.",
                "The front page should lead directly into real project cards.",
              )}
            </h2>
          </div>
          <CtaLink href="/projects" variant="secondary">
            {pickLang(lang, "전체 프로젝트", "All projects")}
            <ArrowRight size={16} />
          </CtaLink>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden border border-[var(--line)] bg-white"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#e7edf4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageUrl}
                  alt={pickLang(lang, project.imageAltKo, project.imageAltEn)}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase text-[var(--accent)]">
                  {project.organizationType} · {project.region}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-7">
                  {pickLang(lang, project.titleKo, project.titleEn)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {pickLang(lang, project.oneLineImpactKo, project.oneLineImpactEn)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FrontFirstHome({ lang }: { lang: Lang }) {
  return (
    <>
      <section className="border-b border-[var(--line)] bg-[#f4f7f5]">
        <div className="container-page grid min-h-[calc(100vh-68px)] gap-8 py-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="eyebrow">Value-to-Impact Desk</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              {pickLang(
                lang,
                "좋은 프로젝트를 기업이 검토할 수 있는 증거와 보고서로 바꿉니다.",
                "Turn good projects into evidence and reports companies can review.",
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "후원·구매·투자 후보를 발견하고, 검증 상태와 월간 성과를 따라가며, CSR팀이 바로 쓸 수 있는 출력물까지 연결하는 프론트 데스크입니다.",
                "A front desk for discovering giving, procurement, and investment candidates, tracking verification and monthly results, then producing CSR-ready outputs.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/projects">
                <Search size={16} />
                {pickLang(lang, "프로젝트 탐색", "Explore projects")}
              </CtaLink>
              <CtaLink href="/dashboard/company" variant="secondary">
                <Layers3 size={16} />
                {pickLang(lang, "기업 데스크 보기", "Open company desk")}
              </CtaLink>
            </div>
            <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
              {pickLang(
                lang,
                "현재 프론트는 Supabase 없이 데모 데이터로 작동합니다. 데이터베이스가 아니라 판단 흐름을 먼저 보여줍니다.",
                "This front runs on demo data without Supabase. It shows the decision flow before adding a database.",
              )}
            </p>
          </div>
          <DeskPreview lang={lang} />
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[#fff8eb] py-14">
        <div className="container-page grid gap-5 md:grid-cols-4">
          {pipeline.map((step, index) => (
            <PipelineStep key={step.labelEn} step={step} index={index} lang={lang} />
          ))}
        </div>
      </section>

      <section className="bg-[#eef4fb] py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">Operating Context</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(
                lang,
                "Value는 의도에서 시작하지만 Impact는 증거와 시간으로 남아야 합니다.",
                "Value starts with intent. Impact has to remain as evidence over time.",
              )}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "이 화면의 목적은 예쁜 소개가 아니라 다음 행동을 분명하게 만드는 것입니다. 어떤 프로젝트를 볼지, 어떤 근거가 부족한지, 어떤 리포트를 출력할지 바로 판단하게 합니다.",
                "This screen is not a brochure. It makes the next decision obvious: which project to inspect, what evidence is missing, and which report can be produced.",
              )}
            </p>
          </div>
          <div className="grid gap-3">
            {verificationRows.map(([level, ko, evidence]) => (
              <div key={level} className="grid gap-3 border border-[var(--line)] bg-white p-4 md:grid-cols-[0.55fr_0.7fr_1fr]">
                <p className="font-semibold text-[var(--ink)]">{level}</p>
                <p className="text-sm font-semibold text-[var(--accent)]">{ko}</p>
                <p className="text-sm leading-6 text-[var(--muted)]">{evidence}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Role Workflows</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(
                lang,
                "한 장의 홍보 페이지가 아니라 세 역할이 같은 기록을 보는 구조입니다.",
                "Not a promo page: three roles work from the same impact record.",
              )}
            </h2>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {roleCards.map((card) => (
              <RoleCard key={card.titleEn} card={card} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <FeaturedProjectStrip lang={lang} />

      <section className="dark-section py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow text-[#8be0bf]">Release Ready</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(
                lang,
                "후원 이후의 변화까지 읽히는 자료로 남겨야 합니다.",
                "After support, change still has to be readable.",
              )}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
              {pickLang(
                lang,
                "프로젝트 카드에서 끝나지 않고 월간보고, 증빙 상태, 다운로드 가능한 리포트까지 이어지는 전면 화면으로 다시 만들었습니다.",
                "The front now continues from project card to monthly update, evidence status, and downloadable reporting.",
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <CtaLink href="/apply" variant="light">
              <ClipboardCheck size={16} />
              {pickLang(lang, "프로젝트 등록", "Register project")}
            </CtaLink>
            <CtaLink href="/sample-report" variant="light">
              <FileText size={16} />
              {pickLang(lang, "샘플 리포트", "Sample report")}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
