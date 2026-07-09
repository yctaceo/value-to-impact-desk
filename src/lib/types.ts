export type UserRole =
  | "admin"
  | "reviewer"
  | "organization"
  | "donor_investor"
  | "company_csr";

export type OrganizationCategory =
  | "social_enterprise"
  | "nonprofit"
  | "impact_venture"
  | "bam"
  | "faith_driven"
  | "sample";

export type NeedType =
  | "donation"
  | "investment"
  | "procurement"
  | "partnership"
  | "mentoring"
  | "research";

export type Visibility = "public" | "private" | "deal_room";

export type VerificationLevel = 0 | 1 | 2 | 3 | 4;

export type FundingRequest = {
  type: NeedType;
  label: string;
  amount?: string;
  expectedImpact: string;
};

export type MonthlyUpdate = {
  month: string;
  activities: string;
  employmentChange: string;
  revenueNote: string;
  evidence: string[];
  nextPlan: string;
};

export type EvidenceItem = {
  label: string;
  status: "not_submitted" | "submitted" | "reviewed";
};

export type ImpactProfile = {
  id: string;
  slug: string;
  nameKo: string;
  nameEn: string;
  category: OrganizationCategory;
  visibility: Visibility;
  location: string;
  foundedYear?: number;
  website?: string;
  sourceUrl?: string;
  sourceType: "Public Source" | "Self-Reported" | "Fictional Sample";
  verificationLevel: VerificationLevel;
  verificationStatus: string;
  lastUpdated: string;
  imageUrl?: string;
  imageAlt?: string;
  problemLabel: string;
  beneficiaryLabel: string;
  currentNeedLabel: string;
  requestedAmount?: number;
  raisedAmount: number;
  monthlyReportStatus: "미제출" | "작성중" | "제출완료" | "검토중" | "승인" | "보완요청";
  lastReportMonth: string;
  favoriteCount: number;
  oneLine: string;
  missionKo: string;
  missionEn?: string;
  socialProblem: string;
  beneficiaries: string;
  activities: string[];
  productsServices: string[];
  employmentTotal?: string;
  vulnerableEmployment?: string;
  financialSnapshot: string;
  currentNeeds: FundingRequest[];
  impactHighlights: string[];
  risks: string[];
  evidence: EvidenceItem[];
  monthlyUpdates: MonthlyUpdate[];
  tags: string[];
  investorFit: string[];
};
