import {
  AudiencePaths,
  FeaturedProjects,
  FinalCta,
  HomeHero,
  HowItWorks,
  MissionSection,
  PositioningStatement,
  ProblemSection,
  ProductProof,
  TrustArchitecture,
} from "@/components/home/homepage-sections";
import { PageShell } from "@/components/site-shell";

export default function Home() {
  return (
    <PageShell>
      <HomeHero />
      <ProblemSection />
      <PositioningStatement />
      <HowItWorks />
      <ProductProof />
      <TrustArchitecture />
      <FeaturedProjects />
      <AudiencePaths />
      <MissionSection />
      <FinalCta />
    </PageShell>
  );
}
