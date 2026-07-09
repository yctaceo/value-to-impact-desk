import { PageShell } from "@/components/site-shell";
import { SectionHeader, StatCard } from "@/components/ui";
import {
  adminScoutingFilters,
  p1FirstContactCandidates,
  scoutingActions,
  scoutingDisclaimerEn,
  scoutingDisclaimerKo,
} from "@/lib/scouting";

export default function AdminScoutingPage() {
  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="Admin / Korea Scouting Seeds"
          title="50개 조직 seed data는 공개 프로필이 아니라 내부 스카우팅 레코드입니다."
          body="기본값은 admin_only, Level 1, public_web, not field verified입니다. activity_index_score는 내부 접촉 우선순위일 뿐 공개 랭킹으로 사용하지 않습니다."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label="Seed Records" value="50" note="MD import source" />
          <StatCard label="Default Visibility" value="admin_only" />
          <StatCard label="Verification" value="Level 1" note="Not field verified" />
          <StatCard label="Contact Priority" value="P1/P2/P3" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="panel p-6">
            <h2 className="text-xl font-semibold">Recommended Admin Filters</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {adminScoutingFilters.map((filter) => (
                <span
                  key={filter}
                  className="rounded-full bg-[#edf2ec] px-3 py-1 text-sm"
                >
                  {filter}
                </span>
              ))}
            </div>
            <div className="mt-8 rounded-md border border-amber-200 bg-amber-50 p-4">
              <p className="font-semibold text-amber-950">Trust Disclaimer</p>
              <p className="mt-3 text-sm leading-6 text-amber-950">
                {scoutingDisclaimerKo}
              </p>
              <p className="mt-3 text-sm leading-6 text-amber-900">
                {scoutingDisclaimerEn}
              </p>
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="text-xl font-semibold">Admin Actions to Build</h2>
            <div className="mt-5 grid gap-2">
              {scoutingActions.map((action) => (
                <div
                  key={action}
                  className="rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm"
                >
                  {action}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel mt-8 p-6">
          <h2 className="text-xl font-semibold">P1 First-contact Candidates</h2>
          <div className="mt-5 grid gap-2 md:grid-cols-3">
            {p1FirstContactCandidates.map((name, index) => (
              <div key={name} className="rounded-md bg-[#f7f8f4] px-4 py-3">
                <span className="mr-2 text-sm text-[var(--muted)]">
                  {index + 1}.
                </span>
                <span className="font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
