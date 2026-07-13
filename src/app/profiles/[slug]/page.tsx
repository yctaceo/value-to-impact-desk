import { redirect } from "next/navigation";

const legacySlugMap: Record<string, string> = {
  "bear-better": "bear-better-inclusive-work",
  "big-issue-korea": "big-issue-korea-housing-income",
  donggubat: "donggubat-inclusive-esg-products",
};

export default async function ProfileDetailRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/projects/${legacySlugMap[slug] ?? slug}`);
}
