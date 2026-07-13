import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileDown,
  FileText,
  FolderCheck,
  Handshake,
  Search,
  TrendingUp,
  UploadCloud,
} from "lucide-react";
import { getFeaturedDemoProjects } from "@/data/demo/projects";
import type { Lang } from "@/lib/i18n";
import { pickLang } from "@/lib/i18n";

const companyTasks = ["지원 프로젝트 비교", "검증 상태 확인", "월간 변화 추적", "CSR 보고서 다운로드"];
const organizationTasks = ["조직 프로필 등록", "활동 보고 제출", "증빙자료 업로드", "기업 문의 확인"];

const chartBars: Array<[string, number]> = [
  ["고용·참여", 82],
  ["활동 증빙", 74],
  ["예산 보고", 68],
  ["CSR 준비", 86],
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

function UserPathCard({
  icon: Icon,
  title,
  body,
  tasks,
  href,
  cta,
  dark = false,
}: {
  icon: typeof BriefcaseBusiness;
  title: string;
  body: string;
  tasks: string[];
  href: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`grid gap-5 rounded-lg border p-5 md:grid-cols-[auto_1fr_auto] md:items-center ${
        dark
          ? "border-[#2e2a37] bg-[var(--ink)] text-white"
          : "border-[var(--line)] bg-white text-[var(--foreground)]"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-md ${
          dark ? "bg-white text-[var(--ink)]" : "bg-[var(--accent-soft)] text-[var(--accent)]"
        }`}
      >
        <Icon size={22} />
      </div>
      <div>
        <h2 className="korean-copy text-2xl font-semibold leading-tight">{title}</h2>
        <p className={`mt-2 leading-7 ${dark ? "text-white/74" : "text-[var(--muted)]"}`}>
          {body}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tasks.map((task) => (
            <span
              key={task}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
                dark ? "bg-white/10 text-white" : "bg-[#f6f2ed] text-[var(--foreground)]"
              }`}
            >
              <CheckCircle2 size={13} className={dark ? "text-[#ffbd8f]" : "text-[var(--accent)]"} />
              {task}
            </span>
          ))}
        </div>
      </div>
      <div className="md:justify-self-end">
        <ActionLink href={href} tone={dark ? "light" : "dark"}>
          {cta}
        </ActionLink>
      </div>
    </div>
  );
}

function DashboardChartPreview({ dark = false }: { dark?: boolean }) {
  const linePoints = "0,92 44,78 88,82 132,55 176,46 220,28 264,34";
  const baseClass = dark
    ? "border-white/12 bg-white/8 text-white"
    : "border-[var(--line)] bg-white text-[var(--foreground)]";

  return (
    <div className={`rounded-lg border p-5 ${baseClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase ${dark ? "text-[#ffbd8f]" : "text-[var(--accent)]"}`}>
            Dashboard preview
          </p>
          <h3 className="korean-copy mt-2 text-xl font-semibold leading-7">
            후원 포트폴리오 임팩트 추이
          </h3>
        </div>
        <span className={`rounded-md px-3 py-2 text-xs font-semibold ${dark ? "bg-white text-[var(--ink)]" : "bg-[var(--accent)] text-white"}`}>
          86%
        </span>
      </div>

      <svg viewBox="0 0 264 110" className="mt-5 h-36 w-full" role="img" aria-label="Impact dashboard trend chart">
        {[22, 48, 74, 100].map((y) => (
          <line key={y} x1="0" x2="264" y1={y} y2={y} stroke={dark ? "rgba(255,255,255,.16)" : "#e6ded4"} />
        ))}
        <polyline
          points={linePoints}
          fill="none"
          stroke={dark ? "#ffbd8f" : "var(--accent)"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        {linePoints.split(" ").map((point) => {
          const [cx, cy] = point.split(",");
          return <circle key={point} cx={cx} cy={cy} r="4" fill={dark ? "white" : "var(--ink)"} />;
        })}
      </svg>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {chartBars.map(([label, value]) => (
          <div key={label} className={`rounded-md p-3 ${dark ? "bg-white/8" : "bg-[#fbfaf8]"}`}>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-semibold">{label}</span>
              <span className={dark ? "text-white/70" : "text-[var(--muted)]"}>{value}%</span>
            </div>
            <div className={`mt-2 h-2 overflow-hidden rounded-full ${dark ? "bg-white/12" : "bg-[#ebe4dc]"}`}>
              <div
                className="h-full rounded-full"
                style={{ width: `${value}%`, backgroundColor: dark ? "#ffbd8f" : "var(--accent)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeWorkspace({ lang }: { lang: Lang }) {
  const [first, second] = getFeaturedDemoProjects();

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[0_24px_80px_rgba(32,26,32,0.12)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] bg-[#fbfaf8] px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-[var(--ink)]">
            {pickLang(lang, "내 임팩트 포트폴리오", "My impact portfolio")}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {pickLang(lang, "지원한 프로젝트의 변화와 보고서를 한곳에서", "Updates and reports for supported projects")}
          </p>
        </div>
        <span className="rounded-md bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white">
          {pickLang(lang, "이번 달", "This month")}
        </span>
      </div>

      <div className="grid gap-px bg-[var(--line)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold">{pickLang(lang, "지원 중인 프로젝트", "Supported projects")}</h3>
            <Link href="/dashboard" className="text-sm font-semibold text-[var(--accent)]">
              {pickLang(lang, "관리하기", "Manage")}
            </Link>
          </div>

          <div className="mt-4 grid gap-3">
            {[first, second].map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="grid gap-3 rounded-md border border-[var(--line)] p-3 transition hover:border-[var(--accent)] sm:grid-cols-[90px_1fr]"
              >
                <div className="h-20 overflow-hidden rounded-md bg-[#ece7df]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.imageUrl}
                    alt={pickLang(lang, project.imageAltKo, project.imageAltEn)}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[#f5e9ff] px-2 py-1 text-xs font-semibold text-[#6935a6]">
                      {index === 0 ? "Evidence review" : "Public source"}
                    </span>
                    <span className="text-xs font-semibold text-[var(--muted)]">
                      {project.latestUpdate}
                    </span>
                  </div>
                  <p className="korean-copy mt-2 text-sm font-semibold leading-5">
                    {pickLang(lang, project.titleKo, project.titleEn)}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                    {pickLang(lang, project.currentNeedKo, project.currentNeedEn)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid bg-white">
          <div className="border-b border-[var(--line)] p-5">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-[var(--accent)]" />
              <h3 className="font-semibold">{pickLang(lang, "Tracing Impact", "Tracing Impact")}</h3>
            </div>
            <div className="mt-4">
              <DashboardChartPreview />
            </div>
          </div>

          <div className="bg-[#2f2338] p-5 text-white">
            <p className="text-xs font-semibold uppercase text-[#ffbd8f]">Ready to export</p>
            <h3 className="korean-copy mt-2 text-2xl font-semibold leading-8">
              {pickLang(lang, "7월 임팩트 요약이 준비되었습니다.", "Your July impact brief is ready.")}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/74">
              {pickLang(
                lang,
                "지원한 프로젝트의 활동, 지출, 증빙 상태를 CSR 보고서 형식으로 확인하세요.",
                "Review activities, spending and evidence status in a CSR-ready format.",
              )}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <ActionLink href="/dashboard" tone="light">
                {pickLang(lang, "대시보드 열기", "Open dashboard")}
              </ActionLink>
              <ActionLink href="/sample-report" tone="light">
                {pickLang(lang, "샘플 리포트", "Sample report")}
              </ActionLink>
            </div>
          </div>
        </section>
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
              {pickLang(lang, "실제로 활동하는 프로젝트를 엄선하였습니다.", "Curated projects already doing the work.")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "지원이 필요한 이유, 최근 활동, 검증 상태를 확인하고 다음 파트너를 선택하세요.",
                "Review why support is needed, what changed recently and what has been verified.",
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
        <div className="container-page grid min-h-[calc(100vh-68px)] gap-10 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="eyebrow">Social impact, made accountable</p>
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
              <ActionLink href="/apply" tone="outline">
                <Building2 size={16} />
                {pickLang(lang, "조직 등록하기", "Register organization")}
              </ActionLink>
            </div>
          </div>

          <HomeWorkspace lang={lang} />

          <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
            <UserPathCard
              icon={BriefcaseBusiness}
              title={pickLang(lang, "기업·후원자", "Companies and donors")}
              body={pickLang(
                lang,
                "지원한 프로젝트의 활동과 성과를 한곳에서 추적하고, 내부 보고에 필요한 파일을 바로 내려받습니다.",
                "Track the projects you support and download files for internal reporting.",
              )}
              tasks={companyTasks}
              href="/login"
              cta={pickLang(lang, "임팩트 관리하기", "Manage impact")}
              dark
            />
            <UserPathCard
              icon={Building2}
              title={pickLang(lang, "비영리·사회적기업", "Nonprofits and social enterprises")}
              body={pickLang(
                lang,
                "월간 활동과 증빙자료를 정리해 기업과 후원자가 읽을 수 있는 보고서로 만듭니다.",
                "Turn monthly activities and evidence into reports companies and donors can read.",
              )}
              tasks={organizationTasks}
              href="/apply"
              cta={pickLang(lang, "프로필 시작하기", "Start profile")}
            />
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
                "후원금이 어디에 쓰였는지, 어떤 활동이 진행됐는지, 다음 달에는 무엇이 필요한지 한 화면에서 확인할 수 있습니다.",
                "See where support was used, what happened this month and what the project needs next.",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ActionLink href="/dashboard">
                <FolderCheck size={16} />
                {pickLang(lang, "내 임팩트 보기", "View my impact")}
              </ActionLink>
              <ActionLink href="/projects/compare" tone="outline">
                <BarChart3 size={16} />
                {pickLang(lang, "프로젝트 비교", "Compare projects")}
              </ActionLink>
            </div>
          </div>

          <div className="rounded-lg border border-[#d7c7e5] bg-[#2f2338] p-5 shadow-[0_24px_80px_rgba(32,26,32,0.16)]">
            <DashboardChartPreview dark />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["지원 프로젝트", "9개"],
                ["평균 증빙 준비", "78%"],
                ["보고서 상태", "다운로드 가능"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md bg-white/8 p-3 text-white">
                  <p className="text-xs text-white/60">{label}</p>
                  <p className="mt-2 text-lg font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="order-2 rounded-lg border border-[var(--line)] bg-[#fbfaf8] p-5 lg:order-1">
            {[
              { icon: UploadCloud, title: "활동 데이터", body: "월간 활동, 참여자 변화, 지출 내역을 같은 구조로 정리합니다." },
              { icon: FileText, title: "CSR 보고서 포맷", body: "연말 보고서에 붙일 수 있는 요약, 지표, 증빙 목록을 자동 구성합니다." },
              { icon: Handshake, title: "파트너 커뮤니케이션", body: "기업 문의, 추가 자료 요청, 다음 지원 계획을 한곳에서 확인합니다." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="mb-3 rounded-md bg-white p-4 last:mb-0">
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-[var(--accent)]" />
                  <p className="font-semibold">{title}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <p className="eyebrow">Impact reports</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(lang, "사회적기업의 활동을 한 번에 보고서로 받아보세요.", "Receive social enterprise activity as a ready report.")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "연말 CSR 보고서에 맞춰 프로젝트 활동, 사용 내역, 성과 지표, 증빙자료를 다운로드할 수 있습니다.",
                "Download project activity, spending, outcome metrics and evidence in a CSR-friendly format.",
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
