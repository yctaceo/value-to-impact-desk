import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileDown,
  FolderCheck,
  Search,
} from "lucide-react";
import { getFeaturedDemoProjects } from "@/data/demo/projects";
import type { Lang } from "@/lib/i18n";
import { pickLang } from "@/lib/i18n";

const chartBars: Array<[string, number]> = [
  ["활동", 82],
  ["증빙", 74],
  ["예산", 68],
  ["보고", 86],
];

const steps = [
  {
    title: "프로젝트를 선택합니다",
    body: "공개자료 기반 프로젝트를 보고 기업의 후원 목적과 맞는 대상을 고릅니다.",
  },
  {
    title: "변화를 추적합니다",
    body: "지원 이후의 활동, 참여자 변화, 예산 사용, 증빙 상태를 월별로 봅니다.",
  },
  {
    title: "보고서로 정리합니다",
    body: "CSR 보고서에 바로 넣을 수 있는 요약과 근거자료를 다운로드합니다.",
  },
];

function ActionLink({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light" | "outline";
}) {
  const className =
    tone === "dark"
      ? "bg-[var(--ink)] text-white hover:bg-[var(--ink-strong)]"
      : tone === "light"
        ? "bg-white text-[var(--ink)] hover:bg-[#f4f1ed]"
        : "border border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--accent)]";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition ${className}`}
    >
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

function DashboardChartPreview({ dark = false }: { dark?: boolean }) {
  const linePoints = "0,92 44,78 88,82 132,55 176,46 220,28 264,34";

  return (
    <div
      className={`rounded-lg border p-5 ${
        dark
          ? "border-[#3f344a] bg-[var(--ink)] text-white shadow-[0_24px_70px_rgba(32,26,40,0.18)]"
          : "border-[var(--line)] bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase ${dark ? "text-[#ffc08f]" : "text-[var(--accent)]"}`}>
            Impact dashboard
          </p>
          <h3 className="korean-copy mt-2 text-xl font-semibold leading-7">후원 이후의 변화</h3>
        </div>
        <span className={`rounded-md px-3 py-2 text-xs font-semibold ${dark ? "bg-white text-[var(--ink)]" : "bg-[var(--accent)] text-white"}`}>
          86%
        </span>
      </div>

      <svg viewBox="0 0 264 110" className="mt-5 h-32 w-full" role="img" aria-label="Impact trend chart">
        {[22, 48, 74, 100].map((y) => (
          <line key={y} x1="0" x2="264" y1={y} y2={y} stroke={dark ? "rgba(255,255,255,.16)" : "#e6ded4"} />
        ))}
        <polyline
          points={linePoints}
          fill="none"
          stroke={dark ? "#ffb16d" : "var(--accent)"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        {linePoints.split(" ").map((point) => {
          const [cx, cy] = point.split(",");
          return <circle key={point} cx={cx} cy={cy} r="4" fill={dark ? "#fff7ed" : "var(--ink)"} />;
        })}
      </svg>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {chartBars.map(([label, value]) => (
          <div key={label} className={`rounded-md p-3 ${dark ? "bg-white/10" : "bg-[#fbfaf8]"}`}>
            <p className={`text-xs ${dark ? "text-white/72" : "text-[var(--muted)]"}`}>{label}</p>
            <p className="mt-1 text-lg font-semibold">{value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AudienceCard({
  icon: Icon,
  title,
  body,
  href,
  cta,
  dark = false,
}: {
  icon: typeof BriefcaseBusiness;
  title: string;
  body: string;
  href: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-5 ${
        dark ? "border-[#2e2a37] bg-[var(--ink)] text-white" : "border-[var(--line)] bg-white"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${
            dark ? "bg-white text-[var(--ink)]" : "bg-[var(--accent-soft)] text-[var(--accent)]"
          }`}
        >
          <Icon size={20} />
        </span>
        <div>
          <h2 className="korean-copy text-xl font-semibold leading-7">{title}</h2>
          <p className={`mt-2 text-sm leading-6 ${dark ? "text-white/72" : "text-[var(--muted)]"}`}>
            {body}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <ActionLink href={href} tone={dark ? "light" : "dark"}>
          {cta}
        </ActionLink>
      </div>
    </div>
  );
}

function ProjectGallery({ lang }: { lang: Lang }) {
  const projects = getFeaturedDemoProjects();

  return (
    <section className="bg-[#fbfaf8] py-16">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Curated projects</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(lang, "실제로 활동하는 프로젝트를 먼저 확인하세요.", "Start with projects already doing the work.")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "후원 목적, 최근 활동, 필요한 지원을 한눈에 비교할 수 있습니다.",
                "Compare purpose, recent activity, and support needs at a glance.",
              )}
            </p>
          </div>
          <ActionLink href="/projects" tone="outline">
            {pickLang(lang, "프로젝트 전체 보기", "Browse projects")}
          </ActionLink>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-lg border border-[var(--line)] bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(32,26,32,0.12)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#ece7df]">
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
                <h3 className="korean-copy mt-3 text-xl font-semibold leading-7">
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
      <section className="bg-[var(--background)]">
        <div className="container-page grid gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="eyebrow">Social Impact Tracing Map</p>
            <h1 className="korean-copy mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              {lang === "ko" ? (
                <>
                  <span className="block">기업의 후원이 실제 </span>
                  <span className="block">변화로 이어졌는지 </span>
                  <span className="block">확인하세요.</span>
                </>
              ) : (
                "See whether corporate support became real change."
              )}
            </h1>
            <p className="korean-copy mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "기업의 후원으로 발생한 소셜 임팩트를 투명하게 공개합니다. #Impact Tracing Map",
                "We make the social impact created by corporate support transparent. #Impact Tracing Map",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="/projects">
                <Search size={16} />
                {pickLang(lang, "프로젝트 찾기", "Find projects")}
              </ActionLink>
              <ActionLink href="/login" tone="outline">
                <FolderCheck size={16} />
                {pickLang(lang, "임팩트 관리하기", "Manage impact")}
              </ActionLink>
            </div>
          </div>

          <DashboardChartPreview />
        </div>

        <div className="container-page grid gap-4 pb-14 lg:grid-cols-2">
          <AudienceCard
            icon={BriefcaseBusiness}
            title={pickLang(lang, "기업·후원자", "Companies and donors")}
            body={pickLang(
              lang,
              "지원한 프로젝트의 변화와 보고서 상태를 한 화면에서 확인합니다.",
              "Track supported projects and report readiness in one view.",
            )}
            href="/login"
            cta={pickLang(lang, "로그인 후 관리", "Sign in to manage")}
            dark
          />
          <AudienceCard
            icon={Building2}
            title={pickLang(lang, "비영리·사회적기업", "Nonprofits and social enterprises")}
            body={pickLang(
              lang,
              "월간 활동과 증빙자료를 정리해 기업이 읽을 수 있는 보고서로 만듭니다.",
              "Turn monthly activity and evidence into company-ready reports.",
            )}
            href="/apply"
            cta={pickLang(lang, "조직 등록하기", "Register organization")}
          />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">How it works</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(lang, "필요한 정보만 단계별로 확인합니다.", "See only what matters at each step.")}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-[var(--line)] bg-[#fbfaf8] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4eef9] py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Tracing Impact</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(lang, "내가 후원한 프로젝트의 임팩트를 한 번에 관리해보세요.", "Manage the impact of every project you support.")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "후원금 사용, 활동 변화, 증빙 준비도, CSR 보고서 상태를 같은 화면에서 확인할 수 있습니다.",
                "Review spending, activity changes, evidence readiness, and CSR report status in one place.",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ActionLink href="/dashboard">
                <BarChart3 size={16} />
                {pickLang(lang, "대시보드 보기", "Open dashboard")}
              </ActionLink>
              <ActionLink href="/sample-report" tone="outline">
                <FileDown size={16} />
                {pickLang(lang, "보고서 샘플", "Sample report")}
              </ActionLink>
            </div>
          </div>

          <DashboardChartPreview dark />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">CSR reports</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(lang, "사회적기업의 활동을 보고서로 받아보세요.", "Receive social enterprise activity as a report.")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "활동, 지출, 참여자 변화, 증빙자료를 CSR 보고서 포맷으로 정리합니다.",
                "Organize activity, spending, participant change, and evidence in a CSR-ready format.",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ActionLink href="/sample-report">
                <FileDown size={16} />
                {pickLang(lang, "보고서 샘플 보기", "View sample report")}
              </ActionLink>
              <ActionLink href="/org/monthly-report" tone="outline">
                <ClipboardList size={16} />
                {pickLang(lang, "월간보고 작성", "Submit monthly report")}
              </ActionLink>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-[#fbfaf8] p-5">
            {[
              "활동과 지출을 같은 구조로 정리",
              "증빙 상태와 출처를 보고서에 함께 표시",
              "CSR 담당자가 읽기 쉬운 요약으로 변환",
            ].map((item) => (
              <div key={item} className="flex gap-3 border-b border-[var(--line)] py-4 last:border-b-0">
                <CheckCircle2 size={18} className="mt-1 shrink-0 text-[var(--accent)]" />
                <p className="leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectGallery lang={lang} />

      <section className="bg-[var(--ink)] py-16 text-white">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <p className="eyebrow text-[#ffbd8f]">Social Impact Tracing Map</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(
                lang,
                "한국의 비영리 프로젝트를 '가치 중심의 글로벌 기업'과 연결합니다.",
                "Connecting Korean nonprofit projects with value-led global companies.",
              )}
            </h2>
            <p className="korean-copy mt-5 max-w-3xl text-lg leading-8 text-white/74">
              {pickLang(
                lang,
                "한국의 작은 비영리 프로젝트를 직접 발굴하고 검증해 기업과 연결하며, 지원 이후의 변화를 지속적으로 추적, 보고하는 플랫폼입니다.",
                "We discover and review local nonprofit projects in Korea, connect them with companies, then continuously trace and report the change after support.",
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ActionLink href="/projects" tone="light">
              {pickLang(lang, "프로젝트 찾기", "Find projects")}
            </ActionLink>
            <ActionLink href="/apply" tone="light">
              {pickLang(lang, "조직 등록", "Register organization")}
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
