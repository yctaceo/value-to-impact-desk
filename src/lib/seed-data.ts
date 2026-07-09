import type { ImpactProfile, VerificationLevel } from "./types";

export const verificationLabels: Record<VerificationLevel, string> = {
  0: "Level 0 - Draft",
  1: "Level 1 - Public/Self-Reported",
  2: "Level 2 - Evidence Submitted",
  3: "Level 3 - Accountant Reviewed",
  4: "Level 4 - Field Verified",
};

export const profiles: ImpactProfile[] = [
  {
    id: "bear-better",
    slug: "bear-better",
    nameKo: "베어베터",
    nameEn: "Bear Better",
    category: "social_enterprise",
    visibility: "deal_room",
    location: "Seoul, Korea",
    foundedYear: 2012,
    website: "https://www.bearbetter.net/",
    sourceUrl: "https://www.bearbetter.net/mission",
    sourceType: "Public Source",
    verificationLevel: 1,
    verificationStatus: "Not Field Verified",
    lastUpdated: "2026-07-09",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "커피와 베이커리 제품이 놓인 테이블",
    problemLabel: "발달장애인 고용",
    beneficiaryLabel: "발달장애인 근로자",
    currentNeedLabel: "기업구매 / 정기 파트너십",
    requestedAmount: 30000000,
    raisedAmount: 12400000,
    monthlyReportStatus: "제출완료",
    lastReportMonth: "2026.07",
    favoriteCount: 128,
    oneLine:
      "발달장애인이 일하는 방식을 기업 서비스와 제품으로 구조화한 한국 사회적기업.",
    missionKo:
      "대한민국 어디에서나 발달장애인이 함께 어울려 일할 수 있는 사회를 만드는 것을 지향합니다.",
    missionEn:
      "Creating a society where people with developmental disabilities can work together across Korea.",
    socialProblem:
      "발달장애인의 안정적 고용 기회 부족과 기업의 포용고용 실행 방법 부족.",
    beneficiaries: "발달장애인 근로자와 포용고용을 도입하려는 기업 파트너.",
    activities: [
      "발달장애인에게 적합한 직무 개발",
      "커피, 제과, 인쇄, 플라워, 카페/매점 위탁 운영",
      "기업 파트너십 기반 장애인 고용 모델 확산",
    ],
    productsServices: ["커피", "제과/제빵", "인쇄물", "플라워", "카페 위탁 운영"],
    employmentTotal: "공개자료 기준 약 300명 규모의 직접 일자리 창출 이력",
    vulnerableEmployment: "발달장애인 고용 중심",
    financialSnapshot:
      "공개 채용자료에는 연매출 159억 원 및 600여 개 기업 파트너십 언급이 있으나 현장/회계 검증 전입니다.",
    currentNeeds: [
      {
        type: "procurement",
        label: "기업 구매/위탁 파트너십",
        expectedImpact: "기업 구매와 위탁 운영을 통해 지속 가능한 고용을 확대",
      },
      {
        type: "research",
        label: "포용고용 모델 사례연구",
        expectedImpact: "Value-driven business의 고용 임팩트 전환 메커니즘 분석",
      },
    ],
    impactHighlights: [
      "발달장애인 고용 특화",
      "기업 파트너십 기반 수익모델",
      "제품/서비스 실체성이 높은 B2B 모델",
    ],
    risks: [
      "공개자료 기반 요약이며 현장 검증 전",
      "민감정보와 근로자 개인정보는 플랫폼에 공개하지 않음",
    ],
    evidence: [
      { label: "공식 웹사이트", status: "submitted" },
      { label: "회계자료", status: "not_submitted" },
      { label: "현장 인터뷰", status: "not_submitted" },
    ],
    monthlyUpdates: [
      {
        month: "2026-07",
        activities: "Public-source desk research profile created.",
        employmentChange: "No new self-reported update submitted.",
        revenueNote: "Public figures only; not verified by platform.",
        evidence: ["Official website", "Public recruiting page references"],
        nextPlan: "Request consent-based organization intake if selected for pilot.",
      },
    ],
    tags: ["장애인고용", "기업구매", "사회적기업", "B2B"],
    investorFit: ["Corporate CSR", "Inclusive procurement", "Research case"],
  },
  {
    id: "donggubat",
    slug: "donggubat",
    nameKo: "동구밭",
    nameEn: "Donggubat",
    category: "social_enterprise",
    visibility: "deal_room",
    location: "Hanam, Korea",
    website: "https://donggubat.co.kr/",
    sourceUrl: "https://donggubat.co.kr/",
    sourceType: "Public Source",
    verificationLevel: 1,
    verificationStatus: "Not Field Verified",
    lastUpdated: "2026-07-09",
    imageUrl:
      "https://images.unsplash.com/photo-1607006483224-16bc32c93691?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "친환경 비누와 생활용품",
    problemLabel: "발달장애 / 환경",
    beneficiaryLabel: "발달장애인 근로자",
    currentNeedLabel: "기업 선물 / ESG 구매",
    requestedAmount: 20000000,
    raisedAmount: 8600000,
    monthlyReportStatus: "검토중",
    lastReportMonth: "2026.07",
    favoriteCount: 94,
    oneLine:
      "발달장애인 고용과 플라스틱 저감 생활용품을 결합한 제품 기반 사회적기업.",
    missionKo:
      "발달장애인의 근속연수 문제 해결을 넘어 기후정의를 실천하는 생활용품 브랜드.",
    socialProblem:
      "발달장애인의 장기근속 문제와 생활용품 소비에서 발생하는 불필요한 플라스틱 사용.",
    beneficiaries: "발달장애인 근로자, 지속가능 소비를 원하는 고객과 기업 구매팀.",
    activities: [
      "고체 비누/생활용품 제조 및 판매",
      "플라스틱 저감 제품과 패키지 개발",
      "ODM/OEM 문의 채널 운영",
    ],
    productsServices: ["비누", "샴푸바/트리트먼트바", "생활용품", "ODM/OEM"],
    employmentTotal: "공개자료 기준 세부 고용 수 미확인",
    vulnerableEmployment: "발달장애인 고용 미션",
    financialSnapshot:
      "공식몰 기반 제품 판매와 OEM 문의 채널이 확인되나 재무자료는 미제출.",
    currentNeeds: [
      {
        type: "procurement",
        label: "기업 ESG 기프트/구매",
        expectedImpact: "친환경 소비와 발달장애인 고용 임팩트를 동시에 창출",
      },
    ],
    impactHighlights: [
      "제품 실체성 명확",
      "기업 선물/임직원 캠페인 적합",
      "환경 가치와 고용 임팩트 결합",
    ],
    risks: ["현장 및 회계 검증 전", "고용 지표는 직접 제출 필요"],
    evidence: [
      { label: "공식몰/사업자 정보", status: "submitted" },
      { label: "고용 증빙", status: "not_submitted" },
      { label: "매출 증빙", status: "not_submitted" },
    ],
    monthlyUpdates: [
      {
        month: "2026-07",
        activities: "Public-source product and mission profile created.",
        employmentChange: "No verified employment update.",
        revenueNote: "No platform-reviewed revenue document.",
        evidence: ["Official store", "Public company footer"],
        nextPlan: "Invite to submit procurement capacity and impact metrics.",
      },
    ],
    tags: ["발달장애", "친환경", "기업기프트", "OEM"],
    investorFit: ["CSR procurement", "ESG gifting", "Impact commerce"],
  },
  {
    id: "big-issue-korea",
    slug: "big-issue-korea",
    nameKo: "빅이슈코리아",
    nameEn: "Big Issue Korea",
    category: "nonprofit",
    visibility: "deal_room",
    location: "Seoul, Korea",
    foundedYear: 2010,
    website: "https://bigissue.kr/",
    sourceUrl: "https://bigissue.kr/about/mission",
    sourceType: "Public Source",
    verificationLevel: 1,
    verificationStatus: "Not Field Verified",
    lastUpdated: "2026-07-09",
    imageUrl:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "잡지와 신문이 놓인 가판대",
    problemLabel: "홈리스 자립",
    beneficiaryLabel: "주거취약계층",
    currentNeedLabel: "후원 / 캠페인 파트너십",
    requestedAmount: 50000000,
    raisedAmount: 18200000,
    monthlyReportStatus: "제출완료",
    lastReportMonth: "2026.07",
    favoriteCount: 151,
    oneLine:
      "주거취약계층 홈리스의 자립을 잡지 판매와 비즈니스 솔루션으로 지원하는 비영리 사회적기업.",
    missionKo:
      "주거취약계층인 홈리스의 자립을 위해 운영되며, A Hand Up, Not a Hand Out을 지향합니다.",
    socialProblem:
      "홈리스와 주거취약계층이 합법적 소득, 자립 기회, 사회적 존엄을 회복하기 어려운 문제.",
    beneficiaries: "홈리스, 주거취약계층, 소외된 사람들.",
    activities: [
      "라이프스타일 매거진 발행",
      "판매원을 통한 소득 기회 제공",
      "자립 지원 캠페인과 네트워크 활동",
    ],
    productsServices: ["매거진", "대행판매", "캠페인 협력", "콘텐츠 파트너십"],
    employmentTotal: "판매원/참여자 지표는 조직 직접 제출 필요",
    vulnerableEmployment: "홈리스 판매원 중심",
    financialSnapshot:
      "후원/판매 기반 구조로 보이나 플랫폼 검토 재무자료는 아직 없음.",
    currentNeeds: [
      {
        type: "donation",
        label: "자립 지원 후원",
        expectedImpact: "주거취약계층의 소득과 자립 기회 확대",
      },
      {
        type: "partnership",
        label: "기업 캠페인/대행판매",
        expectedImpact: "기업 임직원 참여와 사회공헌 콘텐츠 확보",
      },
    ],
    impactHighlights: [
      "글로벌 Big Issue 모델과 연결",
      "소득 기회 중심 자립 접근",
      "기업 캠페인 스토리텔링 적합",
    ],
    risks: ["취약계층 개인정보 보호 필요", "성과 지표는 조직 제출 및 검증 필요"],
    evidence: [
      { label: "공식 미션 페이지", status: "submitted" },
      { label: "후원금 사용 증빙", status: "not_submitted" },
      { label: "현장 인터뷰", status: "not_submitted" },
    ],
    monthlyUpdates: [
      {
        month: "2026-07",
        activities: "Public-source mission profile created.",
        employmentChange: "No platform-reviewed update.",
        revenueNote: "No platform-reviewed financial snapshot.",
        evidence: ["Official mission page"],
        nextPlan: "Define monthly vendor participation and support metrics.",
      },
    ],
    tags: ["비영리", "홈리스", "자립", "콘텐츠"],
    investorFit: ["Corporate giving", "Foundation", "CSR campaign"],
  },
  {
    id: "dot-inc",
    slug: "dot-inc",
    nameKo: "닷",
    nameEn: "Dot Inc.",
    category: "impact_venture",
    visibility: "deal_room",
    location: "Korea / Global",
    foundedYear: 2015,
    website: "https://www.dotincorp.com/en",
    sourceUrl: "https://www.dotincorp.com/en",
    sourceType: "Public Source",
    verificationLevel: 1,
    verificationStatus: "Not Field Verified",
    lastUpdated: "2026-07-09",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "접근성 기술 장비와 전자기기",
    problemLabel: "장애 접근성",
    beneficiaryLabel: "시각장애인 / 교통약자",
    currentNeedLabel: "투자 검토 / 공공구매",
    requestedAmount: 100000000,
    raisedAmount: 37000000,
    monthlyReportStatus: "작성중",
    lastReportMonth: "2026.07",
    favoriteCount: 73,
    oneLine:
      "시각장애인과 교통약자를 위한 촉각 디스플레이와 배리어프리 키오스크를 개발하는 소셜벤처.",
    missionKo:
      "정보 접근 장벽을 낮추고 장애 여부와 관계없이 누구나 디지털 정보를 사용할 수 있는 환경을 만듭니다.",
    socialProblem:
      "시각장애인, 저시력자, 이동약자가 공공시설과 디지털 정보에 접근하기 어려운 문제.",
    beneficiaries: "시각장애인, 저시력자, 이동약자, 공공시설 이용자.",
    activities: [
      "Dot Pad 촉각 디스플레이 개발",
      "배리어프리 키오스크 개발",
      "교육, 재활, 예술, 업무 환경 접근성 솔루션 제공",
    ],
    productsServices: ["Dot Pad", "Dot Kiosk", "접근성 솔루션", "촉각 그래픽 기술"],
    financialSnapshot:
      "영리형 impact venture로 판단되며, 투자/조달 검토 전 재무자료 제출 필요.",
    currentNeeds: [
      {
        type: "investment",
        label: "접근성 기술 확장 자본",
        expectedImpact: "교육/공공/문화 시설의 정보 접근성 확대",
      },
      {
        type: "procurement",
        label: "공공/기업 접근성 구매",
        expectedImpact: "장애친화적 키오스크와 업무환경 확산",
      },
    ],
    impactHighlights: [
      "제품 기술력과 사회문제 직접성",
      "영리형 소셜임팩트 투자 검토 가능",
      "공공조달/기업 접근성 예산과 연결 가능",
    ],
    risks: ["투자 권유가 아닌 리서치 프로필", "기술 성능과 재무자료 별도 검증 필요"],
    evidence: [
      { label: "공식 제품 페이지", status: "submitted" },
      { label: "특허/인증 자료", status: "not_submitted" },
      { label: "매출/고객 자료", status: "not_submitted" },
    ],
    monthlyUpdates: [
      {
        month: "2026-07",
        activities: "Public-source technology profile created.",
        employmentChange: "No employment update.",
        revenueNote: "Financials not submitted.",
        evidence: ["Official website"],
        nextPlan: "Collect procurement cases and deployment metrics.",
      },
    ],
    tags: ["소셜벤처", "장애접근성", "AI", "공공조달"],
    investorFit: ["Impact investor", "Corporate accessibility", "Public procurement"],
  },
  {
    id: "thistle-farms",
    slug: "thistle-farms",
    nameKo: "Thistle Farms",
    nameEn: "Thistle Farms",
    category: "nonprofit",
    visibility: "deal_room",
    location: "Nashville, United States",
    foundedYear: 1997,
    website: "https://thistlefarms.org/",
    sourceUrl: "https://thistlefarms.org/pages/financials",
    sourceType: "Public Source",
    verificationLevel: 1,
    verificationStatus: "Not Field Verified",
    lastUpdated: "2026-07-09",
    imageUrl:
      "https://images.unsplash.com/photo-1603006905393-c6335182aac1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "캔들과 바디케어 제품",
    problemLabel: "여성 회복 / 고용",
    beneficiaryLabel: "생존 여성",
    currentNeedLabel: "후원 / 기업 선물 구매",
    requestedAmount: 60000000,
    raisedAmount: 22100000,
    monthlyReportStatus: "승인",
    lastReportMonth: "2026.07",
    favoriteCount: 116,
    oneLine:
      "성착취, 인신매매, 중독 생존 여성에게 주거, 회복, 고용을 제공하는 비영리 사회적기업.",
    missionKo:
      "생존 여성들이 회복하고 삶을 재건하도록 안전한 거처, 의미 있는 일, 평생 공동체를 제공합니다.",
    missionEn:
      "A nonprofit social enterprise helping women survivors recover and heal through housing, meaningful jobs, and lifelong community.",
    socialProblem:
      "상업적 성착취, 인신매매, 중독 이후 생존자가 안전한 회복과 경제적 자립으로 이어지기 어려운 문제.",
    beneficiaries: "여성 생존자, 회복 프로그램 참여자, 글로벌 artisan 파트너.",
    activities: [
      "2년 주거 회복 프로그램",
      "사회적기업 제품 제조/카페/상점 운영",
      "Shared Trade 글로벌 파트너 지원",
    ],
    productsServices: ["바디케어", "캔들", "카페", "Shared Trade 제품"],
    employmentTotal: "공개 연례자료 기준 의미 있는 고용시간 지표 공개",
    vulnerableEmployment: "생존 여성과 프로그램 졸업생 중심",
    financialSnapshot:
      "연례보고서 공개. 플랫폼 자체 회계 검토 전이므로 Level 1로 유지.",
    currentNeeds: [
      {
        type: "donation",
        label: "회복 프로그램 후원",
        expectedImpact: "주거, 치유, 고용 기반 회복 지원",
      },
      {
        type: "procurement",
        label: "기업 선물 구매",
        expectedImpact: "제품 구매가 생존 여성의 고용과 경제적 자유로 연결",
      },
    ],
    impactHighlights: [
      "공개 연례보고서와 임팩트 지표 보유",
      "회복 프로그램과 제품 매출 결합",
      "기업 선물/사회공헌 보고서 사례로 적합",
    ],
    risks: ["미국 조직으로 한국 MVP에서는 리서치/벤치마크 사례", "현장 검증 전"],
    evidence: [
      { label: "공식 미션 페이지", status: "submitted" },
      { label: "Annual Report", status: "submitted" },
      { label: "플랫폼 직접 인터뷰", status: "not_submitted" },
    ],
    monthlyUpdates: [
      {
        month: "2026-07",
        activities: "Benchmark profile created from public annual report.",
        employmentChange: "Public annual indicators only.",
        revenueNote: "Annual report available; not platform-reviewed.",
        evidence: ["Official annual report page"],
        nextPlan: "Use as benchmark for monthly performance report format.",
      },
    ],
    tags: ["비영리", "Freedom Business", "여성회복", "기업기프트"],
    investorFit: ["Corporate giving", "Faith-driven donors", "Procurement benchmark"],
  },
  {
    id: "nomi-network",
    slug: "nomi-network",
    nameKo: "Nomi Network",
    nameEn: "Nomi Network",
    category: "nonprofit",
    visibility: "deal_room",
    location: "Cambodia / India / United States",
    foundedYear: 2009,
    website: "https://nominetwork.org/",
    sourceUrl: "https://nominetwork.org/year-in-review/",
    sourceType: "Public Source",
    verificationLevel: 1,
    verificationStatus: "Not Field Verified",
    lastUpdated: "2026-07-09",
    imageUrl:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "교육 워크숍을 위한 노트와 자료",
    problemLabel: "여성 경제자립",
    beneficiaryLabel: "취약 여성과 소녀",
    currentNeedLabel: "후원 / 고용 파트너십",
    requestedAmount: 80000000,
    raisedAmount: 30400000,
    monthlyReportStatus: "제출완료",
    lastReportMonth: "2026.07",
    favoriteCount: 88,
    oneLine:
      "인신매매의 경제적 취약성을 줄이기 위해 여성과 소녀에게 안전한 고용 경로를 만드는 비영리.",
    missionKo:
      "여성과 소녀가 착취의 순환을 끊고 경제적 기회를 얻도록 안전한 고용과 생태계를 만듭니다.",
    socialProblem:
      "빈곤, 안전한 고용 부족, 경제적 충격이 인신매매와 착취 취약성을 높이는 문제.",
    beneficiaries: "인신매매 생존자, 취약 여성과 소녀, 지역 커뮤니티.",
    activities: [
      "직업훈련과 취업 연계",
      "고위험 지역 프로그램 운영",
      "기업/비영리 생태계 협력",
    ],
    productsServices: ["후원 프로그램", "기업 파트너십", "직업훈련 모델"],
    employmentTotal: "2024년 고용 또는 자영업 수입 창출 연결 지표 공개",
    vulnerableEmployment: "취약 여성과 소녀 중심",
    financialSnapshot:
      "Annual Report와 financial stewardship 자료가 있으나 플랫폼 회계 검토 전.",
    currentNeeds: [
      {
        type: "donation",
        label: "여성 경제자립 후원",
        expectedImpact: "안전한 고용과 자영업 전환 지원",
      },
      {
        type: "partnership",
        label: "기업 공급망/고용 파트너십",
        expectedImpact: "생존자 중심의 경제 생태계 확장",
      },
    ],
    impactHighlights: [
      "직접 수혜자와 고용연계 지표 공개",
      "글로벌 프로그램 운영",
      "논문용 Value-to-Impact 전환 사례로 적합",
    ],
    risks: ["글로벌 조직이므로 국내 파트너십 적용성 별도 검토", "현장 검증 전"],
    evidence: [
      { label: "공식 웹사이트", status: "submitted" },
      { label: "Year in Review", status: "submitted" },
      { label: "현장 검증", status: "not_submitted" },
    ],
    monthlyUpdates: [
      {
        month: "2026-07",
        activities: "Benchmark profile created from public impact pages.",
        employmentChange: "Public annual indicators only.",
        revenueNote: "Financial documents not reviewed by platform.",
        evidence: ["Official website", "Year in Review"],
        nextPlan: "Use as reference for donor/investor brief structure.",
      },
    ],
    tags: ["인신매매예방", "여성고용", "글로벌비영리", "경제자립"],
    investorFit: ["Foundation", "Faith-driven donor", "Corporate partnership"],
  },
  {
    id: "bloom-paper-art",
    slug: "bloom-paper-art",
    nameKo: "Bloom Paper Art Collective",
    nameEn: "Bloom Paper Art Collective",
    category: "sample",
    visibility: "public",
    location: "Seoul, Korea",
    sourceType: "Fictional Sample",
    verificationLevel: 2,
    verificationStatus: "Sample Evidence Submitted",
    lastUpdated: "2026-07-09",
    imageUrl:
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "종이 공예 재료와 꽃 장식",
    problemLabel: "경계선지능 청년 고용",
    beneficiaryLabel: "경계선지능 청년",
    currentNeedLabel: "후원 / 기업행사 설치",
    requestedAmount: 30000000,
    raisedAmount: 8400000,
    monthlyReportStatus: "제출완료",
    lastReportMonth: "2026.07",
    favoriteCount: 67,
    oneLine:
      "경계선지능 청년에게 대형 종이꽃 공예를 교육하고 기업 행사 아트 설치로 연결하는 샘플 프로필.",
    missionKo:
      "느린 학습자가 자신의 속도로 기술을 배우고 기업 현장에서 존중받는 작업자가 되도록 돕습니다.",
    socialProblem:
      "경계선지능 청년이 학교 이후 안정적인 기술훈련과 dignified work에 접근하기 어려운 문제.",
    beneficiaries: "경계선지능 청년과 가족.",
    activities: ["종이꽃 공예 교육", "기업 행사 설치", "청년 작업자 코칭"],
    productsServices: ["대형 종이꽃 설치", "기업행사 포토존", "임직원 참여 워크숍"],
    employmentTotal: "12 workers",
    vulnerableEmployment: "8 young adults with borderline intellectual functioning",
    financialSnapshot:
      "월매출 780만 원 샘플, 후원금 300만 원 샘플. 실제 조직이 아닌 데모 데이터입니다.",
    currentNeeds: [
      {
        type: "donation",
        label: "KRW 30M training space and materials",
        amount: "KRW 30M",
        expectedImpact: "6개월간 추가 20명 훈련",
      },
      {
        type: "procurement",
        label: "Corporate event installation",
        expectedImpact: "월 2건 납품 시 고용 지속성 강화",
      },
    ],
    impactHighlights: ["8명 취약계층 고용", "월 3회 교육", "기업 납품 2건"],
    risks: ["작업공간 부족", "재료비 변동", "훈련생 안전관리 필요"],
    evidence: [
      { label: "활동사진", status: "submitted" },
      { label: "거래명세서", status: "submitted" },
      { label: "급여대장 일부", status: "reviewed" },
    ],
    monthlyUpdates: [
      {
        month: "2026-06",
        activities: "교육 3회, 종이꽃 40세트 제작, 기업 행사 2건 납품.",
        employmentChange: "신규 훈련생 1명 참여, 취약계층 근로자 수 유지.",
        revenueNote: "매출 780만 원, 후원금 300만 원.",
        evidence: ["활동사진 5장", "거래명세서 2건", "입금내역"],
        nextPlan: "기업 납품 준비와 교육생 모집.",
      },
    ],
    tags: ["샘플", "경계선지능", "기업구매", "청년고용"],
    investorFit: ["CSR procurement", "Donor briefing", "Employee volunteering"],
  },
  {
    id: "freedom-craft-studio",
    slug: "freedom-craft-studio",
    nameKo: "Freedom Craft Studio",
    nameEn: "Freedom Craft Studio",
    category: "sample",
    visibility: "public",
    location: "Asia",
    sourceType: "Fictional Sample",
    verificationLevel: 1,
    verificationStatus: "Sample Self-Reported",
    lastUpdated: "2026-07-09",
    imageUrl:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "수공예 제품과 작업 도구",
    problemLabel: "여성 회복 / 안전한 일",
    beneficiaryLabel: "취약 여성",
    currentNeedLabel: "기업 선물 구매",
    requestedAmount: 25000000,
    raisedAmount: 5900000,
    monthlyReportStatus: "검토중",
    lastReportMonth: "2026.07",
    favoriteCount: 44,
    oneLine:
      "착취 피해 여성의 회복과 경제적 독립을 수공예 제품 생산으로 연결하는 Freedom Business 샘플.",
    missionKo:
      "회복 중인 여성이 안전한 일, 공동체, 장기 소득을 통해 독립을 경험하도록 돕습니다.",
    socialProblem:
      "착취와 폭력 경험 이후 안전한 소득, 커뮤니티, 직업기술이 부족한 문제.",
    beneficiaries: "착취 피해 여성과 취약 여성.",
    activities: ["수공예 훈련", "생활용품 생산", "홀리스틱 케어 연계"],
    productsServices: ["핸드메이드 라이프스타일 제품", "기업 선물 세트", "윤리적 리테일"],
    employmentTotal: "20 participants",
    vulnerableEmployment: "15 women in paid work",
    financialSnapshot: "샘플 데이터. 실제 재무자료 없음.",
    currentNeeds: [
      {
        type: "procurement",
        label: "Corporate gift procurement partnership",
        expectedImpact: "15명 여성의 월 소득 안정화",
      },
    ],
    impactHighlights: ["15명 유급 작업 참여", "신제품 라인 개발", "기업 구매처 탐색"],
    risks: ["수혜자 보호와 익명화 필수", "생산 품질관리 필요", "현지 법규 검토 필요"],
    evidence: [
      { label: "제품사진", status: "submitted" },
      { label: "참여자 동의서", status: "not_submitted" },
      { label: "재무자료", status: "not_submitted" },
    ],
    monthlyUpdates: [
      {
        month: "2026-06",
        activities: "신제품 샘플 30개 제작, 품질검수 2회.",
        employmentChange: "참여자 수 유지.",
        revenueNote: "리테일 매출 샘플 입력 전.",
        evidence: ["제품사진", "작업일지"],
        nextPlan: "기업 선물 카탈로그 정리.",
      },
    ],
    tags: ["샘플", "Freedom Business", "여성회복", "기업기프트"],
    investorFit: ["Faith-driven donor", "Corporate gifting", "Foundation"],
  },
];

export function getProfile(slug: string) {
  return profiles.find((profile) => profile.slug === slug);
}

export function getPublicProfiles() {
  return profiles.filter((profile) => profile.visibility === "public");
}

export function getDealRoomProfiles() {
  return profiles.filter((profile) => profile.visibility !== "public");
}

export const roleCards = [
  {
    role: "Organization",
    path: "/org",
    title: "사회적기업/비영리",
    body: "조직 정보, 증빙자료, 월간보고를 제출하고 AI 리포트 초안을 확인합니다.",
  },
  {
    role: "Admin",
    path: "/admin",
    title: "관리자/검토자",
    body: "신규 조직, 증빙자료, 검증 레벨, 공개 범위, 리포트 생성을 관리합니다.",
  },
  {
    role: "Donor / Investor",
    path: "/deal-room",
    title: "후원자/투자자",
    body: "검증상태와 증빙 수준을 확인하고 소개 요청을 남깁니다.",
  },
  {
    role: "Company / CSR",
    path: "/deal-room",
    title: "기업 CSR/ESG",
    body: "사회공헌 보고서와 기업구매에 쓸 수 있는 Opportunity Brief를 검토합니다.",
  },
];
