import { IntakeForm } from "@/components/intake-form";
import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";

export default function ApplyPage() {
  return (
    <PageShell>
      <section className="container-page grid gap-8 py-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeader
            eyebrow="Organization Intake"
            title="조직 등록은 소개글 작성이 아니라 증빙 가능한 프로필 생성입니다."
            body="모르면 비워둘 수 있지만, 활동·고용·제품·재무·요청사항·증빙자료가 분리되어 들어와야 AI 리포트와 관리자 검토가 가능합니다."
          />
          <div className="panel mt-8 p-5 text-sm leading-6 text-[var(--muted)]">
            <p className="font-semibold text-[var(--foreground)]">Consent Design</p>
            <p className="mt-2">
              서비스 이용과 리포트 생성 동의는 필수입니다. 논문/학술연구
              활용은 익명화 기준의 선택 동의로 분리됩니다.
            </p>
          </div>
        </div>
        <IntakeForm />
      </section>
    </PageShell>
  );
}
