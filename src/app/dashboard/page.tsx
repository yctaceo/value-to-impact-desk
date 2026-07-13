import Link from "next/link";
import { Building2, HeartHandshake } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";

export default function DashboardEntryPage() {
  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="Dashboard"
          title="로그인 역할에 따라 다른 작업공간으로 들어갑니다."
          body="Supabase Auth 연동 후에는 가입 시 선택한 후원/투자 기업, 사회적기업, 비영리단체 역할에 따라 자동 분기합니다. 현재는 데모 입구를 제공합니다."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Link href="/dashboard/company" className="panel p-8">
            <Building2 size={28} className="text-[var(--accent)]" />
            <h2 className="mt-5 text-2xl font-semibold">Company / Donor / Investor</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              후원·투자·기업구매 프로젝트 포트폴리오, CSR 보고서 초안,
              다운로드 가능한 증빙 패키지를 확인합니다.
            </p>
          </Link>
          <Link href="/dashboard/nonprofit" className="panel p-8">
            <HeartHandshake size={28} className="text-[var(--accent)]" />
            <h2 className="mt-5 text-2xl font-semibold">Nonprofit / Social Enterprise</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              프로젝트 정보, 월간 성과 보고, 증빙 업로드, 기업 문의를 관리합니다.
            </p>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
