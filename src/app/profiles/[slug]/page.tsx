import { notFound } from "next/navigation";
import { CalendarCheck, Heart, MessageCircle } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { ProfileEvidenceBox, VerificationBadge } from "@/components/profile-card";
import { ButtonLink, StatCard } from "@/components/ui";
import { getProfile, profiles } from "@/lib/seed-data";
import { moneyLabel } from "@/lib/utils";
import { formatKRW } from "@/lib/dashboard-data";

export function generateStaticParams() {
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export default async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getProfile(slug);

  if (!profile) {
    notFound();
  }

  return (
    <PageShell>
      <section className="border-b border-[var(--line)] bg-white">
        <div className="container-page grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">{profile.category.replaceAll("_", " ")}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              {profile.nameKo}
            </h1>
            <p className="mt-2 text-xl text-[var(--muted)]">{profile.nameEn}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {profile.oneLine}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <VerificationBadge
                level={profile.verificationLevel}
                status={profile.verificationStatus}
              />
              <span className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-[#edf2ec] px-3 py-2 text-xs font-semibold">
                <CalendarCheck size={14} />
                {profile.lastReportMonth} {profile.monthlyReportStatus}
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/contact">소개 요청</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                파트너십 문의
              </ButtonLink>
              <ButtonLink href="/sample-report" variant="secondary">
                보고서 요청
              </ButtonLink>
            </div>
          </div>
          <div className="panel overflow-hidden">
            <div className="relative aspect-[4/3] bg-[#dfe8df]">
              {profile.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.imageUrl}
                  alt={profile.imageAlt ?? profile.nameKo}
                  className="h-full w-full object-cover"
                />
              ) : null}
              <button className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-sm font-semibold">
                <Heart size={17} />
                관심 등록
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--muted)]">누적 후원/구매</p>
                  <p className="text-3xl font-semibold text-[var(--ink)]">
                    {formatKRW(profile.raisedAmount)}
                  </p>
                </div>
                {profile.requestedAmount ? (
                  <p className="text-sm font-semibold text-[var(--muted)]">
                    요청 {formatKRW(profile.requestedAmount)}
                  </p>
                ) : null}
              </div>
              {profile.requestedAmount ? (
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#e8ede6]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round((profile.raisedAmount / profile.requestedAmount) * 100),
                      )}%`,
                    }}
                  />
                </div>
              ) : null}
              <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
                <p>
                  <strong>해결문제</strong>
                  <br />
                  {profile.problemLabel}
                </p>
                <p>
                  <strong>대상자</strong>
                  <br />
                  {profile.beneficiaryLabel}
                </p>
                <p>
                  <strong>현재 필요</strong>
                  <br />
                  {profile.currentNeedLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_330px]">
        <div className="space-y-8">
          <div className="panel p-6">
            <h2 className="text-2xl font-semibold">Impact Thesis</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">Mission</p>
                <p className="mt-2 leading-7 text-[var(--muted)]">
                  {profile.missionKo}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">
                  Social Problem
                </p>
                <p className="mt-2 leading-7 text-[var(--muted)]">
                  {profile.socialProblem}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">
                  Beneficiaries
                </p>
                <p className="mt-2 leading-7 text-[var(--muted)]">
                  {profile.beneficiaries}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">
                  Financial Snapshot
                </p>
                <p className="mt-2 leading-7 text-[var(--muted)]">
                  {profile.financialSnapshot}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <StatCard label="Employment" value={profile.employmentTotal ?? "TBC"} />
            <StatCard
              label="Vulnerable Employment"
              value={profile.vulnerableEmployment ?? "TBC"}
            />
            <StatCard label="누적 후원/구매" value={formatKRW(profile.raisedAmount)} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="panel p-6">
              <h2 className="font-semibold">Activities</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                {profile.activities.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <h2 className="font-semibold">Products / Services</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                {profile.productsServices.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="font-semibold">월간 활동 타임라인</h2>
            <div className="mt-5 space-y-4">
              {profile.monthlyUpdates.map((update) => (
                <div key={update.month} className="rounded-md bg-[#f7f8f4] p-4">
                  <p className="font-semibold">{update.month}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {update.activities}
                  </p>
                  <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                    <p>Employment: {update.employmentChange}</p>
                    <p>Revenue: {update.revenueNote}</p>
                  </div>
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    Evidence: {update.evidence.join(", ")}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold">
                      최근 보고서 보기
                    </button>
                    <button className="rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold">
                      리포트 다운로드
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <ProfileEvidenceBox profile={profile} />
          <div className="panel p-5">
            <h2 className="font-semibold">Current Requests</h2>
            <div className="mt-4 space-y-4">
              {profile.currentNeeds.map((need) => (
                <div key={need.label} className="rounded-md bg-[#f7f8f4] p-4">
                  <p className="text-xs font-semibold uppercase text-[var(--accent)]">
                    {need.type}
                  </p>
                  <p className="mt-2 font-semibold">{need.label}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {moneyLabel(need.amount)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {need.expectedImpact}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <h2 className="font-semibold">Risks / Due Diligence</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
              {profile.risks.map((risk) => (
                <li key={risk}>- {risk}</li>
              ))}
            </ul>
          </div>
          <div className="panel p-5">
            <h2 className="font-semibold">문의 액션</h2>
            <div className="mt-4 grid gap-2">
              {["관심 등록", "소개 요청", "기업구매 문의", "후원 상담 요청"].map((label) => (
                <button
                  key={label}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold"
                >
                  <MessageCircle size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <h2 className="font-semibold">Investor / CSR Fit</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.investorFit.map((fit) => (
                <span key={fit} className="rounded-full bg-[#edf2ec] px-3 py-1 text-xs">
                  {fit}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
