import { profiles } from "./seed-data";

export const donorDashboard = {
  totalDonations: 3000000,
  totalInvestments: 10000000,
  supportedOrganizations: 4,
  monthlyImpact: "고용 유지 12명 / 교육 참여 38명",
  downloadableReports: 4,
  favorites: [profiles[0], profiles[1], profiles[6]],
  donations: [
    {
      profile: profiles[7],
      myAmount: 1000000,
      totalRaised: 8200000,
      recentReport: "2026년 7월 제출완료",
      usage: "교육재료비 42%, 강사비 35%, 공간운영비 23%",
      receiptStatus: "발행완료",
    },
    {
      profile: profiles[2],
      myAmount: 2000000,
      totalRaised: 18200000,
      recentReport: "2026년 7월 제출완료",
      usage: "자립지원 51%, 캠페인 운영 29%, 상담/관리 20%",
      receiptStatus: "발행대기",
    },
  ],
  investments: [
    {
      profile: profiles[3],
      amount: 10000000,
      status: "관심 기록 / Due diligence required",
      businessMetric: "공공/기업 접근성 구매 검토",
      impactMetric: "시각장애인 정보 접근성 확대 가능성",
    },
  ],
};

export const organizationDashboard = {
  profile: profiles[6],
  reportStatus: "2026년 7월 보고서: 미제출",
  donationThisMonth: 1200000,
  totalDonations: 8400000,
  productSalesThisMonth: 3100000,
  receiptsNeeded: 3,
  submittedReports: [
    { month: "2026.06", submittedAt: "2026.07.03", status: "승인", download: true },
    { month: "2026.05", submittedAt: "2026.06.04", status: "승인", download: true },
    { month: "2026.04", submittedAt: "2026.05.02", status: "보완요청", download: false },
  ],
};

export const companyDashboard = {
  csrBudgetTracked: 18000000,
  procurementCandidates: 5,
  reportDownloads: 3,
  employeePrograms: 2,
  favorites: [profiles[0], profiles[1], profiles[4]],
  procurement: [
    {
      profile: profiles[1],
      service: "친환경 생활용품 / 기업 선물 세트",
      readiness: "OEM 문의 가능",
      csrMetric: "발달장애인 고용 + 플라스틱 저감",
    },
    {
      profile: profiles[0],
      service: "커피, 제과, 인쇄, 플라워, 카페 위탁",
      readiness: "정기 구매/위탁 가능",
      csrMetric: "포용고용 및 B2B 구매 임팩트",
    },
    {
      profile: profiles[6],
      service: "기업행사 종이꽃 설치 / 임직원 워크숍",
      readiness: "샘플 프로젝트",
      csrMetric: "경계선지능 청년 훈련과 고용",
    },
  ],
};

export function formatKRW(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value);
}
