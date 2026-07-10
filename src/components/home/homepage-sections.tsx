import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Download,
  FileText,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { ProjectCard } from "@/components/profile-card";
import { ButtonLink } from "@/components/ui";
import { profiles } from "@/lib/seed-data";

const loopSteps = [
  ["Discover", "사회문제, 대상, 지역, 제품, 필요한 지원으로 프로젝트를 찾습니다."],
  ["Verify", "공개자료, 제출자료, 증빙, 검토 이력에 따라 검증 단계를 표시합니다."],
  ["Track", "월별 활동, 후원금, 제품 판매, 고용, 수혜자 변화를 업데이트합니다."],
  ["Report", "출처가 연결된 보고서 초안을 만들고 승인 후 이해관계자에게 공유합니다."],
];

const problemCards = [
  [
    "조직의 기록은 흩어져 있습니다",
    "사진, 엑셀, 영수증, SNS, 제안서, 후원기관별 양식이 서로 연결되지 않습니다.",
  ],
  [
    "지원자는 지원 후 변화를 보기 어렵습니다",
    "돈이 어디에 쓰였는지, 활동이 실제 진행됐는지, 최근 보고가 언제인지 확인하기 어렵습니다.",
  ],
  [
    "기업 CSR은 보고 가능한 근거가 필요합니다",
    "내부 결재, 감사 대응, ESG/CSR 보고에 쓸 수 있는 증빙과 결과 데이터가 부족합니다.",
  ],
];

const audienceCards = [
  {
    title: "사회적기업·비영리·BAM",
    headline: "활동을 반복 설명하지 말고, 축적되는 Impact Profile로 만드세요.",
    items: ["조직 프로필", "월간 성과보고", "증빙자료", "고용·매출·활동 추적", "후원자·기업용 보고서"],
    href: "/apply",
    cta: "조직 프로필 시작하기",
  },
  {
    title: "후원자·투자자",
    headline: "지원 전에는 근거를 확인하고, 지원 후에는 변화를 추적하세요.",
    items: ["관심 프로젝트", "지원 기록", "최근 월간보고", "사용 내역", "보고서 다운로드"],
    href: "/profiles",
    cta: "프로젝트 탐색하기",
  },
  {
    title: "기업·CSR",
    headline: "사회공헌과 기업구매의 결과를 보고 가능한 데이터로 관리하세요.",
    items: ["구매 가능 제품·서비스", "CSR 후보 프로젝트", "임직원 참여", "월간 임팩트", "감사 가능한 보고서"],
    href: "/dashboard?role=company_csr",
    cta: "기업 활용 방식 보기",
  },
];

const trustCards: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Database,
    title: "증빙자료",
    body: "사진, 계약서, 영수증, 월간보고, 공개자료를 프로필에 연결합니다.",
  },
  {
    icon: ShieldCheck,
    title: "검증 단계",
    body: "Sample, 공개자료 기반, 자체 제출, 증빙 제출, 현장 확인을 구분합니다.",
  },
  {
    icon: ClipboardCheck,
    title: "AI의 역할",
    body: "AI는 보고서 초안을 만들지만 검증 판단은 사람과 증거가 담당합니다.",
  },
];

function ProductPreview() {
  return (
    <div className="marketing-panel overflow-hidden bg-white shadow-sm">
      <div className="border-b border-[var(--line)] bg-[var(--sage-50)] px-5 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Impact Dashboard Preview</p>
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold">
            보고서 4개 다운로드 가능
          </span>
        </div>
      </div>
      <div className="grid gap-4 p-5 md:grid-cols-[1fr_1.1fr]">
        <div className="grid gap-3">
          {[
            ["총 후원금", "3,000,000원"],
            ["지원 조직 수", "4개"],
            ["이번 달 임팩트", "고용 유지 12명 / 교육 38명"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-[var(--line)] bg-white p-4">
              <p className="text-xs text-[var(--muted)]">{label}</p>
              <p className="mt-1 text-lg font-semibold text-[var(--ink)]">{value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-[var(--ink)] p-5 text-white">
          <p className="text-sm text-white/70">Monthly Report</p>
          <h3 className="mt-2 text-2xl font-semibold">소이프스튜디오 7월 보고</h3>
          <div className="mt-5 space-y-3 text-sm text-white/80">
            <p>교육재료비 42% · 강사비 35% · 공간운영비 23%</p>
            <p>최근 보고: 제출완료 · 기부영수증: 발행완료</p>
          </div>
          <button className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-[var(--ink)]">
            <Download size={16} />
            후원증빙 리포트 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="marketing-section bg-[var(--sage-100)]">
      <div className="container-page grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <p className="eyebrow">Verified Impact Infrastructure</p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            좋은 프로젝트가 신뢰를 얻으려면, 변화가 증거로 남아야 합니다.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Value-to-Impact Desk는 사회적기업·비영리·BAM 프로젝트의 활동과
            증빙을 검증 가능한 Impact Profile로 구조화하고, 지원 이후의
            변화까지 추적하도록 돕습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/profiles">프로젝트 탐색하기</ButtonLink>
            <ButtonLink href="/apply" variant="secondary">
              우리 조직 등록하기
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm font-semibold text-[var(--muted)]">
            Where verified impact meets decision-makers.
          </p>
        </div>
        <ProductPreview />
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section className="marketing-section bg-white" id="problem">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">Why this exists</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em]">
            사회적 프로젝트는 성과를 만들지만, 신뢰할 수 있는 기록으로 축적되지 않습니다.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {problemCards.map(([title, body]) => (
            <div key={title} className="marketing-panel p-6">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-4 leading-7 text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PositioningStatement() {
  return (
    <section className="dark-section marketing-section">
      <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <p className="text-3xl font-semibold leading-tight md:text-5xl">
          좋은 일을 하는 조직과, 근거를 요구하는 자본 사이의 신뢰 인프라.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["조직", "활동·사진·증빙·스토리를 축적되는 신뢰 자산으로 전환"],
            ["후원자·투자자", "비교 가능하고 추적 가능한 근거로 의사결정"],
            ["기업 CSR", "감사·보고 가능한 성과 데이터와 구매 후보 관리"],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-white/15 bg-white/8 p-5">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/72">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="marketing-section bg-[var(--background)]" id="how-it-works">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.02em]">
            Discover, Verify, Track, Report.
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            프로젝트 카드는 입구이고, 월간보고와 증빙은 시간이 지날수록
            쌓이는 신뢰 자산입니다.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {loopSteps.map(([title, body], index) => (
            <div key={title} className="marketing-panel p-6">
              <p className="text-sm font-semibold text-[var(--accent)]">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductProof() {
  return (
    <section className="marketing-section bg-white">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">Product proof</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em]">
            대시보드에서는 지원 현황, 월간보고, 리포트 다운로드가 한 화면에 보입니다.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            후원자와 기업은 지원한 프로젝트의 최근 보고와 후원증빙 리포트를
            확인하고, 조직은 간단한 월간보고를 올립니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/dashboard">Dashboard 미리보기</ButtonLink>
            <ButtonLink href="/sample-report" variant="secondary">
              보고서 예시 보기
            </ButtonLink>
          </div>
        </div>
        <ProductPreview />
      </div>
    </section>
  );
}

export function TrustArchitecture() {
  return (
    <section className="marketing-section bg-[var(--sage-50)]" id="trust">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">Trust architecture</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em]">
            모든 주장에는 출처가 연결되고, 모든 보고에는 검증 상태가 표시됩니다.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {trustCards.map(({ icon: Icon, title, body }) => (
            <div key={title} className="marketing-panel p-6">
              <Icon className="text-[var(--accent)]" />
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProjects() {
  const featured = [profiles[0], profiles[6], profiles[3]];

  return (
    <section className="marketing-section bg-[var(--background)]">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Featured projects</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.02em]">
              프로젝트를 발견하고, 변화가 이어지는지 확인하세요.
            </h2>
          </div>
          <ButtonLink href="/profiles" variant="secondary">
            모든 프로젝트 보기
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((profile) => (
            <ProjectCard key={profile.id} profile={profile} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AudiencePaths() {
  return (
    <section className="marketing-section bg-white" id="audiences">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">Audience paths</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em]">
            각자의 역할은 달라도, 같은 임팩트 기록을 봅니다.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {audienceCards.map((card) => (
            <div key={card.title} className="marketing-panel flex flex-col p-6">
              <p className="text-sm font-semibold text-[var(--accent)]">{card.title}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight">{card.headline}</h3>
              <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={card.href}
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[var(--ink)]"
              >
                {card.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="marketing-section bg-[var(--cream)]">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow">Mission</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em]">
            좋은 프로젝트가 홍보 능력이 아니라 실제 결과로 발견되는 시장을 만듭니다.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            작은 조직도 공통된 구조 안에서 활동과 증빙을 축적하고,
            후원자·투자자·기업은 더 명확한 근거로 의사결정할 수 있어야 합니다.
          </p>
        </div>
        <div className="marketing-panel overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80"
            alt="현장 활동을 준비하는 워크숍 자료와 노트"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="dark-section marketing-section">
      <div className="container-page text-center">
        <h2 className="mx-auto max-w-4xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-tight tracking-[-0.02em]">
          변화를 만드는 프로젝트를 발견하고, 그 변화가 계속 이어지는지 확인하세요.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/profiles"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-[var(--ink)]"
          >
            <Search size={17} />
            프로젝트 탐색하기
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 font-semibold text-white"
          >
            <FileText size={17} />
            우리 조직 등록하기
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 font-semibold text-white"
          >
            Dashboard 미리보기
          </Link>
        </div>
      </div>
    </section>
  );
}
