import { FrontFirstHome } from "@/components/home/front-first-home";
import { PageShell } from "@/components/site-shell";
import { getLang } from "@/lib/i18n";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = getLang(await searchParams);

  return (
    <PageShell>
      <FrontFirstHome lang={lang} />
    </PageShell>
  );
}
