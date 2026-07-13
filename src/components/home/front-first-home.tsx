import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
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
  UploadCloud,
} from "lucide-react";
import { getFeaturedDemoProjects } from "@/data/demo/projects";
import type { Lang } from "@/lib/i18n";
import { pickLang } from "@/lib/i18n";

const companyTasks = [
  "구매·후원 후보 비교",
  "검증 상태 확인",
  "월간 업데이트 검토",
  "CSR 리포트 다운로드",
];

const organizationTasks = [
  "조직 프로필 등록",
  "월간 활동보고 제출",
  "사진·문서 증빙 연결",
  "기업 문의 확인",
];

const workflow = [
  {
    icon: Search,
    titleKo: "찾기",
    titleEn: "Find",
    bodyKo: "기업구매, 후원, 임직원 참여, 투자 검토에 맞는 프로젝트를 고릅니다.",
    bodyEn: "Choose projects for procurement, giving, employee engagement, or review.",
  },
  {
    icon: BadgeCheck,
    titleKo: "확인",
    titleEn: "Check",
    bodyKo: "공개자료, 조직 제출, 증빙 검토, 현장 확인 상태를 분리해 봅니다.",
    bodyEn: "See public-source, submitted, evidence-reviewed, and field-verified status separately.",
  },
  {
    icon: ClipboardList,
    titleKo: "업데이트",
    titleEn: "Update",
    bodyKo: "비영리는 월간 활동·지출·성과를 올리고, 기업은 변경 사항을 확인합니다.",
    bodyEn: "Organizations submit monthly activity, spend, and results while companies review updates.",
  },
  {
    icon: FileDown,
    titleKo: "출력",
    titleEn: "Export",
    bodyKo: "후원 증빙, 구매 근거, CSR 보고서 초안을 내려받습니다.",
    bodyEn: "Download donor evidence, procurement notes, and CSR report drafts.",
  },
];

function PrimaryLink({
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
      ? "bg-[var(--ink)] text-white hover:bg-[#111018]"
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
      className={`flex h-full flex-col rounded-lg border p-5 ${
        dark
          ? "border-[#2e2a37] bg-[var(--ink)] text-white"
          : "border-[var(--line)] bg-white text-[var(--foreground)]"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-md ${
          dark ? "bg-white text-[var(--ink)]" : "bg-[var(--accent-soft)] text-[var(--accent)]"
        }`}
      >
        <Icon size={20} />
      </div>
      <h2 className="mt-5 text-2xl font-semibold leading-tight">{title}</h2>
      <p className={`mt-3 leading-7 ${dark ? "text-white/72" : "text-[var(--muted)]"}`}>
        {body}
      </p>
      <div className="mt-5 grid gap-2">
        {tasks.map((task) => (
          <div key={task} className="flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} className={dark ? "text-[#ffbd8f]" : "text-[var(--accent)]"} />
            <span>{task}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6">
        <PrimaryLink href={href} tone={dark ? "light" : "dark"}>
          {cta}
        </PrimaryLink>
      </div>
    </div>
  );
}

function HomeWorkspace({ lang }: { lang: Lang }) {
  const projects = getFeaturedDemoProjects();
  const [first, second] = projects;

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[0_24px_80px_rgba(32,26,32,0.12)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] bg-[#fbfaf8] px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-[var(--ink)]">
            {pickLang(lang, "오늘의 작업", "Today")}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {pickLang(lang, "기업 검토와 조직 보고가 만나는 곳", "Where company review meets organization reporting")}
          </p>
        </div>
        <span className="rounded-md bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white">
          {pickLang(lang, "3개 후보", "3 candidates")}
        </span>
      </div>

      <div className="grid gap-px bg-[var(--line)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold">{pickLang(lang, "검토 후보", "Shortlist")}</h3>
            <Link href="/projects" className="text-sm font-semibold text-[var(--accent)]">
              {pickLang(lang, "전체 보기", "View all")}
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
                  <p className="mt-2 text-sm font-semibold leading-5">
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
              <FileText size={18} className="text-[var(--accent)]" />
              <h3 className="font-semibold">{pickLang(lang, "리포트 준비", "Report readiness")}</h3>
            </div>
            <div className="mt-4 grid gap-3">
              {[
                ["프로젝트 근거", "2/3 complete"],
                ["월간 활동보고", "submitted"],
                ["사진·문서 증빙", "needs review"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 rounded-md bg-[#f6f2ed] px-3 py-3">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-xs font-semibold text-[var(--muted)]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#2f2338] p-5 text-white">
            <p className="text-xs font-semibold uppercase text-[#ffbd8f]">Next action</p>
            <h3 className="mt-2 text-2xl font-semibold leading-8">
              {pickLang(
                lang,
                "베어베터 구매형 임팩트 브리프를 검토하세요.",
                "Review the Bear Better procurement impact brief.",
              )}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/72">
              {pickLang(
                lang,
                "기업 구매가 고용 유지와 어떤 지표로 연결되는지 확인할 수 있습니다.",
                "Check how procurement connects to employment retention metrics.",
              )}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <PrimaryLink href={`/projects/${first.slug}`} tone="light">
                {pickLang(lang, "프로젝트 보기", "Open project")}
              </PrimaryLink>
              <PrimaryLink href="/sample-report" tone="light">
                {pickLang(lang, "리포트 보기", "View report")}
              </PrimaryLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function WorkflowCard({
  item,
  lang,
  index,
}: {
  item: (typeof workflow)[number];
  lang: Lang;
  index: number;
}) {
  const Icon = item.icon;

  return (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5">
      <div className="flex items-center justify-between">
        <Icon size={22} className="text-[var(--accent)]" />
        <span className="text-sm font-semibold text-[var(--muted)]">0{index + 1}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold">{pickLang(lang, item.titleKo, item.titleEn)}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        {pickLang(lang, item.bodyKo, item.bodyEn)}
      </p>
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
            <p className="eyebrow">Project discovery</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(lang, "먼저 프로젝트를 보고 판단합니다.", "Start with projects, then decide.")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "각 카드는 필요한 지원, 검증 상태, 월간 업데이트, 보고서 근거로 이어집니다.",
                "Each card leads to requested support, verification status, monthly updates, and reporting evidence.",
              )}
            </p>
          </div>
          <PrimaryLink href="/projects" tone="outline">
            {pickLang(lang, "프로젝트 전체 보기", "Browse projects")}
          </PrimaryLink>
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
      <section className="bg-[var(--background)]">
        <div className="container-page grid min-h-[calc(100vh-68px)] gap-10 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="eyebrow">Value-to-Impact Desk</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              {pickLang(
                lang,
                "지원할 프로젝트를 찾고, 보고할 변화를 정리하세요.",
                "Find projects to support, then track what changed.",
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "기업은 검토할 프로젝트와 리포트를 확인하고, 비영리·사회적기업은 조직 프로필과 월간보고를 제출합니다.",
                "Companies review projects and reports. Organizations submit profiles and monthly updates.",
              )}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <UserPathCard
                icon={BriefcaseBusiness}
                title={pickLang(lang, "기업·후원자", "Companies and donors")}
                body={pickLang(
                  lang,
                  "지원 후보를 비교하고, 구매·후원·CSR 보고에 필요한 근거를 확인합니다.",
                  "Compare candidates and review evidence for procurement, giving, and CSR reporting.",
                )}
                tasks={companyTasks}
                href="/projects"
                cta={pickLang(lang, "프로젝트 찾기", "Find projects")}
                dark
              />
              <UserPathCard
                icon={Building2}
                title={pickLang(lang, "비영리·사회적기업", "Organizations")}
                body={pickLang(
                  lang,
                  "우리 조직의 활동과 증빙을 등록하고, 기업과 후원자가 읽을 수 있게 정리합니다.",
                  "Register your work and evidence so companies and donors can review it.",
                )}
                tasks={organizationTasks}
                href="/apply"
                cta={pickLang(lang, "조직 등록", "Register organization")}
              />
            </div>
          </div>

          <HomeWorkspace lang={lang} />
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white py-12">
        <div className="container-page grid gap-4 md:grid-cols-4">
          {workflow.map((item, index) => (
            <WorkflowCard key={item.titleEn} item={item} index={index} lang={lang} />
          ))}
        </div>
      </section>

      <section className="bg-[#f4eef9] py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">For companies</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(lang, "사회공헌과 기업구매 후보를 한 화면에서 비교합니다.", "Compare giving and procurement candidates in one place.")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "검증 상태, 필요한 지원, 최신 보고, 다운로드 가능한 브리프를 기준으로 다음 파트너를 고릅니다.",
                "Choose the next partner by verification status, requested support, latest updates, and downloadable briefs.",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryLink href="/dashboard/company">
                <FolderCheck size={16} />
                {pickLang(lang, "기업 대시보드", "Company dashboard")}
              </PrimaryLink>
              <PrimaryLink href="/projects/compare" tone="outline">
                <BarChart3 size={16} />
                {pickLang(lang, "프로젝트 비교", "Compare projects")}
              </PrimaryLink>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-[#d7c7e5] bg-white p-5">
            {[
              ["Candidate shortlist", "3 projects", "장애인 고용 · 홈리스 자립 · ESG 구매"],
              ["Open requests", "2 needs", "조직 제출자료 · 월간 성과 확인"],
              ["Ready exports", "4 files", "CSR evidence pack · Board one-page brief"],
            ].map(([title, value, body]) => (
              <div key={title} className="rounded-md border border-[var(--line)] bg-[#fbfaf8] p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold">{title}</p>
                  <p className="rounded-md bg-[var(--accent)] px-2 py-1 text-xs font-semibold text-white">
                    {value}
                  </p>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="order-2 rounded-lg border border-[var(--line)] bg-[#fbfaf8] p-5 lg:order-1">
            {[
              { icon: UploadCloud, title: "이번 달 활동", body: "교육 3회, 기업 납품 2건, 참여자 변화 기록" },
              { icon: FileText, title: "증빙자료", body: "사진, 영수증, 공식 링크, 익명화된 참여자 이야기" },
              { icon: Handshake, title: "기업 문의", body: "구매 가능 수량, 캠페인 일정, 담당자 연결 요청" },
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
            <p className="eyebrow">For organizations</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(lang, "반복되는 설명을 프로필과 월간보고로 줄입니다.", "Turn repeated explanations into a profile and monthly report.")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              {pickLang(
                lang,
                "활동, 지출, 고용, 제품 판매, 다음 계획을 같은 구조로 올리면 기업과 후원자가 읽을 수 있는 자료가 됩니다.",
                "Submit activities, spending, jobs, product sales, and next plans in one structure companies and donors can read.",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryLink href="/apply">
                <Building2 size={16} />
                {pickLang(lang, "조직 프로필 시작", "Start profile")}
              </PrimaryLink>
              <PrimaryLink href="/org/monthly-report" tone="outline">
                <ClipboardList size={16} />
                {pickLang(lang, "월간보고 작성", "Submit monthly report")}
              </PrimaryLink>
            </div>
          </div>
        </div>
      </section>

      <ProjectGallery lang={lang} />

      <section className="bg-[var(--ink)] py-16 text-white">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div>
            <p className="eyebrow text-[#ffbd8f]">Get started</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {pickLang(lang, "오늘은 하나만 시작하면 됩니다.", "Start with one action today.")}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
              {pickLang(
                lang,
                "기업은 프로젝트를 고르고, 비영리는 조직 프로필을 등록하세요. 그 다음 보고와 증빙은 같은 Desk에서 이어집니다.",
                "Companies can choose a project. Organizations can register a profile. Updates and evidence continue in the same Desk.",
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <PrimaryLink href="/projects" tone="light">
              {pickLang(lang, "프로젝트 찾기", "Find projects")}
            </PrimaryLink>
            <PrimaryLink href="/apply" tone="light">
              {pickLang(lang, "조직 등록", "Register organization")}
            </PrimaryLink>
          </div>
        </div>
      </section>
    </>
  );
}
