import Link from "next/link";
import { LayoutDashboard, Menu, ShieldCheck, UserRound } from "lucide-react";
import { Suspense } from "react";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

const navItems = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["Dashboard", "/dashboard"],
  ["About Us", "/about"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[#f7f8f4]/94 shadow-sm backdrop-blur">
      <div className="container-page flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--ink)] text-white">
            <ShieldCheck size={18} />
          </span>
          <span>Value-to-Impact Desk</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-[var(--muted)] lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-[var(--ink)]">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Suspense
            fallback={
              <span className="rounded-md border border-[var(--line)] bg-white px-2 py-2 text-xs font-semibold text-[var(--muted)]">
                KR
              </span>
            }
          >
            <LanguageSwitcher />
          </Suspense>
          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold sm:inline-flex"
          >
            <UserRound size={16} />
            Login
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-3 py-2 text-sm font-semibold text-white"
          >
            <LayoutDashboard size={16} />
            Register a Project
          </Link>
          <details className="relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-[var(--line)] bg-white">
              <Menu size={18} />
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-[var(--line)] bg-white p-2 shadow-lg">
              {navItems.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block rounded px-3 py-2 text-sm font-semibold hover:bg-[var(--sage-50)]"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/apply"
                className="mt-2 block rounded bg-[var(--ink)] px-3 py-2 text-sm font-semibold text-white"
              >
                Register a Project
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="font-semibold">Value-to-Impact Desk</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
            좋은 일을 하는 조직과, 근거를 요구하는 자본 사이의
            Verified Impact Infrastructure.
          </p>
          <p className="mt-5 text-xs text-[var(--muted)]">© 2026 Value-to-Impact Desk</p>
        </div>
        <div className="text-sm leading-7 text-[var(--muted)]">
          <p className="font-semibold text-[var(--foreground)]">Explore</p>
          <Link href="/projects" className="block">프로젝트</Link>
          <Link href="/projects" className="block">Projects</Link>
          <Link href="/dashboard" className="block">Dashboard</Link>
        </div>
        <div className="text-sm leading-7 text-[var(--muted)]">
          <p className="font-semibold text-[var(--foreground)]">For</p>
          <Link href="/apply" className="block">Organizations</Link>
          <Link href="/projects" className="block">Donors & Investors</Link>
          <Link href="/dashboard/company" className="block">Companies & CSR</Link>
        </div>
        <div className="text-sm leading-7 text-[var(--muted)]">
          <p className="font-semibold text-[var(--foreground)]">Trust</p>
          <Link href="/#trust" className="block">Verification Levels</Link>
          <Link href="/contact" className="block">Contact</Link>
          <Link href="/about" className="block">About</Link>
        </div>
      </div>
      <div className="border-t border-[var(--line)] py-4">
        <p className="container-page text-xs leading-5 text-[var(--muted)]">
          Value-to-Impact Desk는 현재 결제, 기부금 수납 또는 투자중개 서비스를
          제공하지 않습니다. 프로필의 검증 상태는 각 프로젝트에 표시된
          Verification Level을 기준으로 확인해야 합니다.
        </p>
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
