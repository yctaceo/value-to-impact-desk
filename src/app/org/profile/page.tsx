import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";
import { IntakeForm } from "@/components/intake-form";

export default function OrgProfilePage() {
  return (
    <PageShell>
      <section className="container-page grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="Organization Profile"
          title="조직 프로필 데이터 수정"
          body="실제 연결 후에는 본인 organization_id에 연결된 impact_profile만 수정할 수 있도록 RLS가 제한합니다."
        />
        <IntakeForm />
      </section>
    </PageShell>
  );
}
