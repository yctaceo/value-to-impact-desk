export const scoutingDisclaimerKo =
  "본 프로필은 공개자료 기반 1차 스카우팅 정보입니다. 현장검증, 회계검토, 조직 승인 절차를 거치지 않았습니다. 본 정보는 추천, 인증, 투자 의견, 기부 권유로 사용될 수 없습니다. 외부 공유 전 검증등급과 출처 상태를 반드시 확인해야 합니다.";

export const scoutingDisclaimerEn =
  "This profile is based on public-source scouting data only. It has not been field verified, accountant reviewed, or approved by the organization. Do not use this page as a recommendation, certification, investment opinion, or donation solicitation. Verification level and source status must be reviewed before any external use.";

export function contactPriority(score: number) {
  if (score >= 85) return "P1";
  if (score >= 75) return "P2";
  return "P3";
}

export const adminScoutingFilters = [
  "activity_index_score",
  "recommended_action",
  "fit_types",
  "category_tags",
  "homepage_verification_needed",
  "primary_url_confidence",
  "verification_level",
  "public_visibility",
  "contact_priority",
];

export const scoutingActions = [
  "Mark as Contacted",
  "Add Contact Memo",
  "Request Organization Intake",
  "Convert to Verified Impact Profile Draft",
  "Generate Internal AI Brief",
  "Request Evidence Submission",
  "Update Verification Level",
  "Hide from Public / Show in Deal Room",
  "Archive Candidate",
];

export const p1FirstContactCandidates = [
  "베어베터",
  "동구밭",
  "빅이슈코리아",
  "사랑의달팽이",
  "브라더스키퍼",
  "사단법인 점프",
  "피치마켓",
  "소이프스튜디오",
  "터치포굿",
  "안나의집",
  "위스타트",
  "키뮤스튜디오",
  "러블리페이퍼",
];
