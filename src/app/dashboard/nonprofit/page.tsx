import Link from "next/link";
import { ClipboardCheck, FileUp, MessageCircle, ShieldCheck } from "lucide-react";
import { DemoActionButton } from "@/components/dashboard/demo-action-button";
import { MonthlyReportForm } from "@/components/monthly-report-form";
import { PageShell } from "@/components/site-shell";
import { SectionHeader, StatCard } from "@/components/ui";

export default function NonprofitDashboardPage() {
  return (
    <PageShell>
      <section className="container-page grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
        <aside className="panel h-fit p-4">
          <p className="text-sm font-semibold">Nonprofit Workspace</p>
          {["Project editor", "Monthly report", "Evidence", "Inquiries"].map((label) => (
            <a key={label} href={`#${label.toLowerCase().replaceAll(" ", "-")}`} className="mt-2 block rounded-md px-3 py-2 text-sm font-semibold hover:bg-[var(--sage-50)]">
              {label}
            </a>
          ))}
        </aside>
        <div className="space-y-8">
          <SectionHeader
            eyebrow="Nonprofit Dashboard"
            title="조직은 복잡한 제안서 대신 월간 성과와 증빙을 올립니다."
            body="프로젝트 설명, 활동, 참여자, 지출, 증빙, 다음 계획을 표준 입력 구조로 관리합니다."
          />

          <div className="grid gap-4 md:grid-cols-4">
            <StatCard label="Report status" value="Draft" />
            <StatCard label="Evidence files" value="7" />
            <StatCard label="Company inquiries" value="3" />
            <StatCard label="Verification" value="Public-source" />
          </div>

          <section id="project-editor" className="panel p-6">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={20} className="text-[var(--accent)]" />
              <h2 className="text-xl font-semibold">Project editor wizard</h2>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {["Problem", "Activities", "Budget", "Outcomes"].map((step, index) => (
                <div key={step} className="rounded-md bg-[#fbfaf8] p-4">
                  <p className="text-xs font-semibold text-[var(--muted)]">Step {index + 1}</p>
                  <p className="mt-2 font-semibold">{step}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">Demo draft saved</p>
                </div>
              ))}
            </div>
          </section>

          <section id="monthly-report" className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <MonthlyReportForm />
            <div className="panel p-6">
              <h2 className="text-xl font-semibold">Monthly report standard</h2>
              <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
                {[
                  "What activities happened this month?",
                  "Who participated and how many people were reached?",
                  "What changed in employment, income, education, or wellbeing?",
                  "What money was spent and what evidence supports it?",
                  "What is the next month plan?",
                ].map((item) => (
                  <p key={item} className="rounded-md bg-[#fbfaf8] p-3">{item}</p>
                ))}
              </div>
            </div>
          </section>

          <section id="evidence" className="panel p-6">
            <div className="flex items-center gap-2">
              <FileUp size={20} className="text-[var(--accent)]" />
              <h2 className="text-xl font-semibold">Evidence upload queue</h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {["Activity photos", "Receipts", "Participant consent"].map((item) => (
                <div key={item} className="rounded-md bg-[#fbfaf8] p-4">
                  <p className="font-semibold">{item}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">Supabase Storage integration point</p>
                  <DemoActionButton label="Demo upload" doneLabel="Queued" />
                </div>
              ))}
            </div>
          </section>

          <section id="inquiries" className="panel p-6">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-[var(--accent)]" />
              <h2 className="text-xl font-semibold">Company inquiries</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {["CSR team requested June impact summary.", "Procurement team asked for gift catalogue.", "Foundation asked for anonymized participant story."].map((item) => (
                <div key={item} className="flex flex-col justify-between gap-3 rounded-md bg-[#fbfaf8] p-4 md:flex-row md:items-center">
                  <p className="text-sm text-[var(--muted)]">{item}</p>
                  <DemoActionButton label="Reply" doneLabel="Reply drafted" />
                </div>
              ))}
            </div>
          </section>

          <section className="panel p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-[var(--accent)]" />
              <h2 className="text-xl font-semibold">Verification status</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              현재 데모는 공개자료 기반 단계입니다. 실제 운영에서는 관리자 검토,
              회계/증빙 확인, 현장 인터뷰 후 검증 레벨이 올라갑니다.
            </p>
            <Link href="/apply" className="mt-4 inline-flex rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-white">
              Edit organization intake
            </Link>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
