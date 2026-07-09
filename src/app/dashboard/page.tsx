import Link from "next/link";
import { Download, FileText, Heart, ShoppingBag } from "lucide-react";
import { MonthlyReportForm } from "@/components/monthly-report-form";
import { ProfileCard } from "@/components/profile-card";
import { PageShell } from "@/components/site-shell";
import { SectionHeader, StatCard } from "@/components/ui";
import {
  companyDashboard,
  donorDashboard,
  formatKRW,
  organizationDashboard,
} from "@/lib/dashboard-data";
import { profiles } from "@/lib/seed-data";

type DashboardRole = "donor_investor" | "organization" | "company_csr" | "admin";

const roleTabs: { role: DashboardRole; label: string }[] = [
  { role: "donor_investor", label: "Donor / Investor" },
  { role: "organization", label: "Organization" },
  { role: "company_csr", label: "Company / CSR" },
  { role: "admin", label: "Admin" },
];

function RoleSwitcher({ role }: { role: DashboardRole }) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {roleTabs.map((tab) => (
        <Link
          key={tab.role}
          href={`/dashboard?role=${tab.role}`}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
            role === tab.role
              ? "border-[var(--ink)] bg-[var(--ink)] text-white"
              : "border-[var(--line)] bg-white text-[var(--muted)]"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

function ReportButton({ label = "보고서 다운로드" }: { label?: string }) {
  return (
    <button className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold">
      <Download size={16} />
      {label}
    </button>
  );
}

function DonorInvestorDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-5">
        <StatCard label="총 후원금" value={formatKRW(donorDashboard.totalDonations)} />
        <StatCard label="총 투자금" value={formatKRW(donorDashboard.totalInvestments)} />
        <StatCard label="지원 조직 수" value={`${donorDashboard.supportedOrganizations}개`} />
        <StatCard label="이번 달 임팩트" value="12명 / 38명" note={donorDashboard.monthlyImpact} />
        <StatCard label="다운로드 보고서" value={`${donorDashboard.downloadableReports}개`} />
      </div>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Heart size={20} className="text-[var(--accent)]" />
          <h2 className="text-2xl font-semibold">즐겨찾기한 프로젝트</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {donorDashboard.favorites.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>

      <section className="panel p-6">
        <h2 className="text-2xl font-semibold">후원한 기업 / 비영리</h2>
        <div className="mt-5 grid gap-4">
          {donorDashboard.donations.map((item) => (
            <div
              key={item.profile.id}
              className="grid gap-4 rounded-md bg-[#f7f8f4] p-4 lg:grid-cols-[160px_1fr_auto]"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-md bg-[#dfe8df]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.profile.imageUrl}
                  alt={item.profile.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{item.profile.nameKo}</h3>
                <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                  <p>내 후원금: {formatKRW(item.myAmount)}</p>
                  <p>누적 후원금: {formatKRW(item.totalRaised)}</p>
                  <p>최근 보고: {item.recentReport}</p>
                  <p>기부영수증: {item.receiptStatus}</p>
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  이번 달 사용: {item.usage}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/profiles/${item.profile.slug}`}
                  className="rounded-md bg-[var(--ink)] px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  월간보고 보기
                </Link>
                <ReportButton />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel p-6">
        <h2 className="text-2xl font-semibold">투자 관심 / 기록</h2>
        <div className="mt-5 grid gap-4">
          {donorDashboard.investments.map((item) => (
            <div key={item.profile.id} className="rounded-md bg-[#f7f8f4] p-4">
              <div className="flex flex-col justify-between gap-3 md:flex-row">
                <div>
                  <h3 className="text-xl font-semibold">{item.profile.nameKo}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.status}</p>
                </div>
                <p className="text-lg font-semibold">{formatKRW(item.amount)}</p>
              </div>
              <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                <p>비즈니스 성과 지표: {item.businessMetric}</p>
                <p>사회적 임팩트 지표: {item.impactMetric}</p>
              </div>
              <div className="mt-4">
                <ReportButton label="투자 관심 리포트" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function OrganizationDashboard() {
  const { profile } = organizationDashboard;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="이번 달 보고" value={organizationDashboard.reportStatus} />
          <StatCard label="이번 달 후원금" value={formatKRW(organizationDashboard.donationThisMonth)} />
          <StatCard label="누적 후원금" value={formatKRW(organizationDashboard.totalDonations)} />
          <StatCard label="기부영수증 필요" value={`${organizationDashboard.receiptsNeeded}건`} />
        </div>
        <MonthlyReportForm />
        <section className="panel p-6">
          <h2 className="text-2xl font-semibold">제출한 보고서 목록</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-[#eef4ed]">
                <tr>
                  {["월", "제출일", "상태", "다운로드"].map((head) => (
                    <th key={head} className="px-4 py-3 font-semibold">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {organizationDashboard.submittedReports.map((report) => (
                  <tr key={report.month}>
                    <td className="px-4 py-3">{report.month}</td>
                    <td className="px-4 py-3">{report.submittedAt}</td>
                    <td className="px-4 py-3">{report.status}</td>
                    <td className="px-4 py-3">
                      {report.download ? <ReportButton label="다운로드" /> : "보완 후 가능"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <aside className="space-y-5">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">내 프로젝트 카드 미리보기</h2>
          <ProfileCard profile={profile} />
        </div>
        <div className="panel p-5">
          <h3 className="font-semibold">제품 판매 / 고용 현황</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <p>이번 달 제품 판매액: {formatKRW(organizationDashboard.productSalesThisMonth)}</p>
            <p>이번 달 고용 인원: 12명</p>
            <p>취약계층 고용 인원: 8명</p>
            <p>신규 고용 인원: 1명</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function CompanyDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="추적 중 CSR 예산" value={formatKRW(companyDashboard.csrBudgetTracked)} />
        <StatCard label="구매 후보" value={`${companyDashboard.procurementCandidates}개`} />
        <StatCard label="보고서 다운로드" value={`${companyDashboard.reportDownloads}개`} />
        <StatCard label="직원 참여 후보" value={`${companyDashboard.employeePrograms}개`} />
      </div>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <ShoppingBag size={20} className="text-[var(--accent)]" />
          <h2 className="text-2xl font-semibold">구매 가능 제품 / 서비스</h2>
        </div>
        <div className="grid gap-4">
          {companyDashboard.procurement.map((item) => (
            <div
              key={item.profile.id}
              className="grid gap-4 rounded-md border border-[var(--line)] bg-white p-4 md:grid-cols-[150px_1fr_auto]"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.profile.imageUrl}
                  alt={item.profile.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{item.profile.nameKo}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.service}</p>
                <p className="mt-2 text-sm">구매 준비도: {item.readiness}</p>
                <p className="mt-2 text-sm">CSR 지표: {item.csrMetric}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="rounded-md bg-[var(--ink)] px-3 py-2 text-sm font-semibold text-white">
                  기업구매 문의
                </button>
                <ReportButton label="CSR 보고서" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">관심 프로젝트</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {companyDashboard.favorites.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>
    </div>
  );
}

function AdminSummaryDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="조직 목록" value={`${profiles.length}개`} />
        <StatCard label="신규 등록 검토" value="3건" />
        <StatCard label="월간보고 검토" value="5건" />
        <StatCard label="Seed Data" value="50 records" />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <Link href="/admin" className="panel p-6">
          <FileText className="text-[var(--accent)]" />
          <h2 className="mt-4 text-xl font-semibold">Admin Review</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            조직 공개/비공개, Verification Level, 문의 확인
          </p>
        </Link>
        <Link href="/admin/organizations" className="panel p-6">
          <FileText className="text-[var(--accent)]" />
          <h2 className="mt-4 text-xl font-semibold">Organizations</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            누락 증빙과 검토 상태 확인
          </p>
        </Link>
        <Link href="/admin/scouting" className="panel p-6">
          <FileText className="text-[var(--accent)]" />
          <h2 className="mt-4 text-xl font-semibold">Seed Scouting</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            50개 public-source scouting record 관리
          </p>
        </Link>
      </div>
    </div>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: DashboardRole }>;
}) {
  const { role: queryRole } = await searchParams;
  const role: DashboardRole = queryRole ?? "donor_investor";

  return (
    <PageShell>
      <section className="container-page py-10">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Role-based Dashboard"
            title={
              role === "organization"
                ? "Organization Dashboard"
                : role === "company_csr"
                  ? "Company / CSR Dashboard"
                  : role === "admin"
                    ? "Admin Dashboard"
                    : "Donor / Investor Dashboard"
            }
            body="실제 Supabase Auth 연결 후에는 user role에 따라 자동 분기됩니다. 현재 MVP에서는 역할 탭으로 화면을 확인합니다."
          />
          <RoleSwitcher role={role} />
        </div>

        {role === "organization" ? <OrganizationDashboard /> : null}
        {role === "company_csr" ? <CompanyDashboard /> : null}
        {role === "admin" ? <AdminSummaryDashboard /> : null}
        {role === "donor_investor" ? <DonorInvestorDashboard /> : null}
      </section>
    </PageShell>
  );
}
