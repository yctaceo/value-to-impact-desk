import {
  Database,
  FileCheck2,
  LockKeyhole,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { ButtonLink, SectionHeader, StatCard } from "@/components/ui";
import { ProfileCard } from "@/components/profile-card";
import { getPublicProfiles, profiles, roleCards } from "@/lib/seed-data";
import Link from "next/link";

const steps = [
  ["Discover", "공개자료와 추천으로 조직을 발굴"],
  ["Standardize", "조직/고용/재무/요청사항을 표준 구조로 입력"],
  ["Evidence", "사진, 계약서, 입금내역, 활동자료를 증빙으로 연결"],
  ["Verify", "Admin/Reviewer가 Level 0-4를 부여"],
  ["Report", "AI가 출처 필드 기반 리포트 초안을 생성"],
  ["Connect", "후원자/기업/투자자가 문의와 소개 요청"],
];

const trustCards: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Database, title: "Impact Data Room", body: "공개자료/제출자료를 구조화" },
  { icon: FileCheck2, title: "Evidence-based", body: "증빙 상태와 누락 항목 표시" },
  { icon: Sparkles, title: "Trust Report Generator", body: "출처 필드 기반 AI 초안" },
  { icon: LockKeyhole, title: "Private Deal Room", body: "승인된 파트너만 상세 열람" },
];

export default function Home() {
  return (
    <PageShell>
      <section className="border-b border-[var(--line)] bg-[#eef4ed]">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="eyebrow">Verified Impact Profiling Platform</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              흩어진 선한 활동을 검증 가능한 Impact Profile로 바꿉니다.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Value-to-Impact Desk는 Donation Platform이 아닙니다. 사회적기업,
              비영리, BAM, 가치기반 비즈니스의 활동자료와 증빙을 표준화하고,
              AI 리포트 초안과 검증 레벨을 통해 후원자·투자자·기업 CSR팀이
              신뢰할 수 있는 Impact Data Room을 만듭니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/apply">조직 등록하기</ButtonLink>
              <ButtonLink href="/deal-room" variant="secondary">
                Deal Room 보기
              </ButtonLink>
            </div>
          </div>
          <div className="panel p-5">
            <div className="rounded-md bg-[var(--ink)] p-5 text-white">
              <p className="text-sm text-white/70">Core Object</p>
              <h2 className="mt-2 text-2xl font-semibold">
                Organization Impact Profile
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/78">
                조직 기본정보, 핵심가치, 해결문제, 고용현황, 제품/서비스,
                재무 스냅샷, 요청사항, 증빙자료, 검증리뷰, 월간보고,
                생성 리포트를 하나의 신뢰 박스로 묶습니다.
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <StatCard label="Verification" value="Level 0-4" note="AI가 아닌 관리자 검토 기준" />
              <StatCard label="Reports" value="5 Types" note="Mock fallback + OpenAI scaffold" />
              <StatCard label="Roles" value="4 Dashboards" note="Admin, Org, Donor, CSR" />
              <StatCard label="Research" value="Consent-based" note="익명화 연구활용 선택동의" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeader
          eyebrow="Trust Infrastructure"
          title="소개 사이트가 아니라 검증 시스템입니다."
          body="초기 MVP는 기능 수보다 신뢰 데이터 구조에 집중합니다. 결제, 투자중개, 공개 랭킹은 제외하고 증빙, 검토, 리포팅, 문의 흐름만 구현합니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {trustCards.map(({ icon: Icon, title, body }) => (
            <div key={title} className="panel p-5">
              <Icon className="text-[var(--accent)]" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow="Process"
            title="조직 등록부터 월간보고까지 이어지는 표준 흐름"
          />
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {steps.map(([title, body], index) => (
              <div key={title} className="panel p-5">
                <span className="text-sm font-semibold text-[var(--accent)]">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Sample Public Profiles"
            title="Public에는 샘플 프로필을 먼저 노출합니다."
            body="실제 공개자료 기반 조직은 현장검증 전이므로 Deal Room/Admin 쪽에서 Public-source, Not Field Verified로 표시합니다."
          />
          <ButtonLink href="/profiles" variant="secondary">
            전체 Profile
          </ButtonLink>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {getPublicProfiles().map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>

      <section className="bg-[#0b2f2c] py-16 text-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Role-based MVP"
            title="회원가입 시 선택한 역할에 따라 UI와 Dashboard가 달라집니다."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {roleCards.map((card) => (
              <Link
                key={card.role}
                href={card.path}
                className="rounded-md border border-white/15 bg-white/8 p-5"
              >
                <p className="text-sm text-white/60">{card.role}</p>
                <h3 className="mt-2 font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{card.body}</p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/60">
            Seed profiles loaded: {profiles.length}. 실제 조직은 추천/투자 가능
            표현 없이 공개자료 기반 리서치 프로필로만 표시됩니다.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
