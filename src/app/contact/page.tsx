import { PageShell } from "@/components/site-shell";
import { FieldLabel, SectionHeader } from "@/components/ui";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="container-page grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="Contact / Inquiry"
          title="문의는 결제나 투자중개가 아니라 소개 요청으로 처리합니다."
          body="MVP에서는 Request Introduction, Partnership Inquiry, Contact Admin만 지원합니다."
        />
        <form className="panel grid gap-5 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldLabel label="Name">
              <input className="field" />
            </FieldLabel>
            <FieldLabel label="Email">
              <input className="field" type="email" />
            </FieldLabel>
          </div>
          <FieldLabel label="Inquiry Type">
            <select className="field">
              <option>Request Introduction</option>
              <option>Partnership Inquiry</option>
              <option>Contact Admin</option>
            </select>
          </FieldLabel>
          <FieldLabel label="Message">
            <textarea className="field min-h-32" />
          </FieldLabel>
          <button className="rounded-md bg-[var(--ink)] px-5 py-3 font-semibold text-white">
            Send Inquiry
          </button>
        </form>
      </section>
    </PageShell>
  );
}
