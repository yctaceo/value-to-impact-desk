export type DataProvenance =
  | "verified-pilot"
  | "organization-provided"
  | "public-source"
  | "illustrative";

export type ProjectStage =
  | "pilot"
  | "organization-confirmed"
  | "evidence-reviewed"
  | "field-visit-completed";

export type PartnershipType =
  | "donation"
  | "corporate-procurement"
  | "volunteering"
  | "mentoring"
  | "partnership";

export type ProjectFilters = {
  query?: string;
  category?: string;
  region?: string;
  partnershipType?: PartnershipType | "all";
  stage?: ProjectStage | "all";
  sort?: "recommended" | "latest" | "support";
};

export type ProjectSummary = {
  id: string;
  slug: string;
  sourceUrl: string;
  sourceLabel: string;
  titleKo: string;
  titleEn: string;
  organizationKo: string;
  organizationEn: string;
  organizationType: "nonprofit" | "social-enterprise" | "impact-venture";
  region: string;
  category: string;
  oneLineImpactKo: string;
  oneLineImpactEn: string;
  currentNeedKo: string;
  currentNeedEn: string;
  imageUrl: string;
  imageAltKo: string;
  imageAltEn: string;
  provenance: DataProvenance;
  stage: ProjectStage;
  partnershipTypes: PartnershipType[];
  latestUpdate: string;
  verificationLabelKo: string;
  verificationLabelEn: string;
  partnershipGoalKo: string;
  partnershipGoalEn: string;
  committedSupportKo: string;
  committedSupportEn: string;
  targetAmountKrw: number;
  committedAmountKrw: number;
  metricsKo: string[];
  metricsEn: string[];
  tags: string[];
};

export type ProjectUpdate = {
  month: string;
  activitiesKo: string;
  activitiesEn: string;
  metricChangeKo: string;
  metricChangeEn: string;
  evidenceKo: string[];
  evidenceEn: string[];
  nextPlanKo: string;
  nextPlanEn: string;
};

export type ProjectDetail = ProjectSummary & {
  problemKo: string;
  problemEn: string;
  participantsKo: string;
  participantsEn: string;
  whyNowKo: string;
  whyNowEn: string;
  activitiesKo: string[];
  activitiesEn: string[];
  intendedOutcomesKo: string[];
  intendedOutcomesEn: string[];
  budget: { labelKo: string; labelEn: string; valueKo: string; valueEn: string }[];
  evidenceKo: string[];
  evidenceEn: string[];
  participantVoiceKo: string;
  participantVoiceEn: string;
  updates: ProjectUpdate[];
  organization: {
    missionKo: string;
    missionEn: string;
    legalType: string;
    founded: string;
    website?: string;
  };
};
