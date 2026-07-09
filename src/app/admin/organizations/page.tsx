import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";
import { profiles } from "@/lib/seed-data";

export default function AdminOrganizationsPage() {
  return (
    <PageShell>
      <section className="container-page py-14">
        <SectionHeader
          eyebrow="Admin / Organizations"
          title="조직별 검토 상태와 누락 증빙"
        />
        <div className="panel mt-8 overflow-hidden">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-[#eef4ed]">
              <tr>
                {["Organization", "Category", "Verification", "Source", "Missing Evidence"].map(
                  (head) => (
                    <th key={head} className="px-4 py-3 font-semibold">
                      {head}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="px-4 py-4">
                    <p className="font-semibold">{profile.nameKo}</p>
                    <p className="text-[var(--muted)]">{profile.nameEn}</p>
                  </td>
                  <td className="px-4 py-4">{profile.category}</td>
                  <td className="px-4 py-4">
                    Level {profile.verificationLevel} / {profile.verificationStatus}
                  </td>
                  <td className="px-4 py-4">{profile.sourceType}</td>
                  <td className="px-4 py-4">
                    {profile.evidence
                      .filter((item) => item.status === "not_submitted")
                      .map((item) => item.label)
                      .join(", ") || "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}
