import Link from "next/link";
import { LayoutDashboard, ShieldCheck, UserRound } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[#f7f8f4]/92 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--ink)] text-white">
            <ShieldCheck size={18} />
          </span>
          <span>Value-to-Impact Desk</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="hidden rounded-md border border-[var(--line)] bg-white p-1 text-xs font-semibold sm:flex">
            <button className="rounded bg-[var(--ink)] px-2 py-1 text-white">KR</button>
            <button className="px-2 py-1 text-[var(--muted)]">EN</button>
          </div>
          <Link
            href="/dashboard"
            className="hidden items-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold sm:inline-flex"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-3 py-2 text-sm font-semibold text-white"
          >
            <UserRound size={16} />
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="container-page grid gap-6 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-semibold">Value-to-Impact Desk</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
            앞단은 쉽게 탐색하는 Project Discovery Wall, 뒷단은 증빙자료와
            월간보고 기반의 Verified Impact Profile로 운영됩니다.
          </p>
        </div>
        <div className="text-sm leading-7 text-[var(--muted)]">
          <p className="font-semibold text-[var(--foreground)]">MVP Scope</p>
          <p>No payments</p>
          <p>No investment brokerage</p>
          <p>No public ranking</p>
        </div>
        <div className="text-sm leading-7 text-[var(--muted)]">
          <p className="font-semibold text-[var(--foreground)]">Research Note</p>
          <p>익명화 연구활용 동의는 선택 동의로 분리됩니다.</p>
          <p>IRB/지도교수 지침에 맞춰 확장 가능합니다.</p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
