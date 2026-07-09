import { LoginForm } from "@/components/login-form";
import { PageShell } from "@/components/site-shell";
import { SectionHeader } from "@/components/ui";

export default function LoginPage() {
  return (
    <PageShell>
      <section className="container-page grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="Supabase Auth"
          title="역할 기반 Dashboard의 입구"
          body="Supabase 환경변수가 설정되면 magic link 로그인으로 동작합니다. 아직 연결 전이면 데모 역할 바로가기를 제공합니다."
        />
        <LoginForm />
      </section>
    </PageShell>
  );
}
