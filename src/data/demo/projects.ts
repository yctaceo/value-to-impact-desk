import type { ProjectDetail } from "@/types/project";

export const demoProjects: ProjectDetail[] = [
  {
    id: "bear-better-inclusive-work",
    slug: "bear-better-inclusive-work",
    sourceUrl: "https://www.bearbetter.net/mission",
    sourceLabel: "Bear Better official mission page",
    titleKo: "발달장애인 포용고용 확장 파트너십",
    titleEn: "Inclusive employment partnership for workers with developmental disabilities",
    organizationKo: "베어베터",
    organizationEn: "Bear Better",
    organizationType: "social-enterprise",
    region: "Seoul, Korea",
    category: "Developmental disability employment",
    oneLineImpactKo:
      "발달장애인이 자기 속도에 맞춰 일할 수 있는 직무와 기업 파트너십을 확장합니다.",
    oneLineImpactEn:
      "Expands job design and corporate partnerships where workers with developmental disabilities can work at their own pace.",
    currentNeedKo: "기업구매, 카페/매점 위탁, 포용고용 모델 확산 파트너",
    currentNeedEn: "Corporate procurement, cafe operations, inclusive employment replication partners",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
    imageAltKo: "커피와 베이커리 제품이 놓인 테이블",
    imageAltEn: "Coffee and bakery products on a table",
    provenance: "public-source",
    stage: "organization-confirmed",
    partnershipTypes: ["corporate-procurement", "partnership", "volunteering"],
    latestUpdate: "2026.07",
    verificationLabelKo: "공개자료 기반, 현장검증 전",
    verificationLabelEn: "Public-source profile, not field verified",
    partnershipGoalKo: "기업 구매 및 위탁 운영으로 지속 가능한 일자리 확대",
    partnershipGoalEn: "Use procurement and site operations to expand sustainable jobs",
    committedSupportKo: "데모 포트폴리오: 1개 기업 구매 검토",
    committedSupportEn: "Demo portfolio: 1 corporate procurement review",
    targetAmountKrw: 50000000,
    committedAmountKrw: 18500000,
    metricsKo: ["발달장애인 직접고용", "기업 파트너십", "직무 재설계"],
    metricsEn: ["Direct disability employment", "Corporate partnerships", "Job redesign"],
    tags: ["장애인고용", "기업구매", "사회적기업"],
    problemKo:
      "발달장애인은 학교 이후 안정적인 직무와 동료 관계를 유지하기 어렵고, 기업은 포용고용을 운영 가능한 방식으로 설계하기 어렵습니다.",
    problemEn:
      "Workers with developmental disabilities need stable jobs after school, while companies need an operational model for inclusive employment.",
    participantsKo: "발달장애인 근로자, 고용모델을 도입하려는 기업 파트너",
    participantsEn:
      "Workers with developmental disabilities and companies adopting inclusive employment models",
    whyNowKo:
      "ESG와 장애인 고용 의무가 커지는 상황에서 단순 기부보다 구매와 운영 파트너십을 통한 지속 모델이 필요합니다.",
    whyNowEn:
      "Companies need durable procurement and operating partnerships, not only one-off giving, as ESG and disability employment expectations rise.",
    activitiesKo: ["커피·제과·인쇄·플라워 제품 생산", "기업 카페/매점 위탁 운영", "발달장애인에게 맞춘 직무 설계 컨설팅"],
    activitiesEn: ["Coffee, bakery, print, and flower production", "Corporate cafe and store operations", "Job design consulting"],
    intendedOutcomesKo: ["지속 가능한 고용 기회 확대", "기업의 포용고용 실행 모델 확보", "사회공헌 보고서에 쓸 수 있는 구매 기반 임팩트 데이터 축적"],
    intendedOutcomesEn: ["More sustainable employment opportunities", "A repeatable inclusive employment model", "Procurement-linked impact evidence for CSR reports"],
    budget: [
      { labelKo: "직무 코칭/훈련", labelEn: "Job coaching", valueKo: "2,000만원", valueEn: "KRW 20M" },
      { labelKo: "작업공간/운영", labelEn: "Operations", valueKo: "1,800만원", valueEn: "KRW 18M" },
      { labelKo: "측정/보고", labelEn: "Measurement", valueKo: "1,200만원", valueEn: "KRW 12M" },
    ],
    evidenceKo: ["공식 미션 페이지", "제품/서비스 공개자료", "기업 파트너십 공개자료"],
    evidenceEn: ["Official mission page", "Public product/service materials", "Public partnership materials"],
    participantVoiceKo:
      "이 데모 문구는 개인정보 보호를 위해 익명화된 예시입니다. 실제 인터뷰는 동의 후 비공개 데이터룸에서 관리됩니다.",
    participantVoiceEn:
      "This demo voice is anonymized. Real interviews should be consented and stored in a private data room.",
    updates: [
      {
        month: "2026.07",
        activitiesKo: "공개자료 기반 프로젝트 프로필을 생성하고 기업구매형 임팩트 지표를 정리했습니다.",
        activitiesEn: "Created a public-source project profile and mapped procurement-linked impact indicators.",
        metricChangeKo: "신규 검증 지표: 고용, 구매, 운영 파트너십",
        metricChangeEn: "New measurement fields: employment, procurement, operating partnership",
        evidenceKo: ["공식 웹사이트", "서비스 카테고리", "공개 미션 문구"],
        evidenceEn: ["Official website", "Service categories", "Public mission statement"],
        nextPlanKo: "조직 동의 기반 월간보고 입력과 증빙 업로드를 요청합니다.",
        nextPlanEn: "Request organization-consented monthly reporting and evidence uploads.",
      },
    ],
    organization: {
      missionKo: "대한민국 어디에서나 발달장애인이 함께 어울려 일할 수 있는 사회를 꿈꿉니다.",
      missionEn:
        "Aims for a society where people with developmental disabilities can work together across Korea.",
      legalType: "Social enterprise / public-source classification",
      founded: "2012",
      website: "https://www.bearbetter.net/",
    },
  },
  {
    id: "big-issue-korea-housing-income",
    slug: "big-issue-korea-housing-income",
    sourceUrl: "https://bigissue.kr/",
    sourceLabel: "Big Issue Korea official website",
    titleKo: "홈리스 자립 매거진 판매·주거 지원 프로젝트",
    titleEn: "Magazine sales and housing support for people experiencing homelessness",
    organizationKo: "빅이슈코리아",
    organizationEn: "Big Issue Korea",
    organizationType: "nonprofit",
    region: "Seoul, Korea",
    category: "Housing instability and income recovery",
    oneLineImpactKo:
      "홈리스와 주거취약계층이 합법적 소득과 사회적 관계를 회복하도록 매거진 판매와 캠페인을 연결합니다.",
    oneLineImpactEn:
      "Connects magazine sales and campaigns so people experiencing homelessness can rebuild income and social ties.",
    currentNeedKo: "후원, 정기구독, 기업 캠페인, 임직원 참여",
    currentNeedEn: "Donations, subscriptions, corporate campaigns, employee engagement",
    imageUrl:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=80",
    imageAltKo: "잡지와 신문이 놓인 가판대",
    imageAltEn: "Magazines and newspapers on a stand",
    provenance: "public-source",
    stage: "pilot",
    partnershipTypes: ["donation", "partnership", "volunteering"],
    latestUpdate: "2026.07",
    verificationLabelKo: "공개자료 기반, 수혜자 지표 제출 필요",
    verificationLabelEn: "Public-source profile, beneficiary metrics required",
    partnershipGoalKo: "사회공헌 보고서에 쓸 수 있는 자립·소득·참여 지표 확보",
    partnershipGoalEn: "Generate income, self-reliance, and engagement evidence for CSR reports",
    committedSupportKo: "데모 포트폴리오: 임직원 캠페인 후보",
    committedSupportEn: "Demo portfolio: employee campaign candidate",
    targetAmountKrw: 70000000,
    committedAmountKrw: 22400000,
    metricsKo: ["판매원 참여", "정기구독", "주거·자립 지원"],
    metricsEn: ["Vendor participation", "Subscriptions", "Housing and self-reliance support"],
    tags: ["비영리", "홈리스", "자립", "캠페인"],
    problemKo:
      "주거취약계층은 안정적 소득, 관계망, 회복 가능한 사회참여 기회가 부족해 자립 과정이 끊기기 쉽습니다.",
    problemEn:
      "People facing housing instability often lack income, relationships, and dignified participation opportunities.",
    participantsKo: "홈리스, 주거취약계층, 소외된 사람들",
    participantsEn: "People experiencing homelessness, housing instability, and social exclusion",
    whyNowKo:
      "기업 사회공헌은 후원금 사용처뿐 아니라 참여자가 어떤 경로로 자립에 가까워졌는지 설명해야 합니다.",
    whyNowEn:
      "Corporate giving needs to explain not only spending, but how participants move toward self-reliance.",
    activitiesKo: ["라이프스타일 매거진 발행", "판매원 소득 기회 제공", "대행판매와 기업 캠페인 운영"],
    activitiesEn: ["Lifestyle magazine publishing", "Vendor income opportunity", "Corporate campaigns and proxy sales"],
    intendedOutcomesKo: ["참여자의 합법적 소득 기회 확대", "정기구독과 캠페인 기반 지속 수입 확보", "후원자용 월간 보고 지표 표준화"],
    intendedOutcomesEn: ["More legal income opportunities", "Recurring subscription and campaign revenue", "Standardized donor reporting"],
    budget: [
      { labelKo: "판매원 지원", labelEn: "Vendor support", valueKo: "3,000만원", valueEn: "KRW 30M" },
      { labelKo: "캠페인 운영", labelEn: "Campaign operations", valueKo: "2,500만원", valueEn: "KRW 25M" },
      { labelKo: "보고/증빙", labelEn: "Reporting", valueKo: "1,500만원", valueEn: "KRW 15M" },
    ],
    evidenceKo: ["공식 웹사이트", "매거진/구독 공개자료", "캠페인 공개자료"],
    evidenceEn: ["Official website", "Magazine/subscription materials", "Campaign materials"],
    participantVoiceKo: "실제 참여자 발언은 동의·익명화 후 보고서에 포함됩니다.",
    participantVoiceEn: "Real participant voices should be consented and anonymized before reporting.",
    updates: [
      {
        month: "2026.07",
        activitiesKo: "공개자료 기반 프로필을 작성하고 후원자 보고용 월간 지표 초안을 만들었습니다.",
        activitiesEn: "Created the public-source profile and a draft monthly donor reporting structure.",
        metricChangeKo: "신규 지표: 판매원 참여, 구독, 캠페인 참여",
        metricChangeEn: "New metrics: vendor participation, subscriptions, campaign engagement",
        evidenceKo: ["공식 웹사이트", "매거진 공개자료"],
        evidenceEn: ["Official website", "Public magazine materials"],
        nextPlanKo: "조직이 직접 월간 참여자·매출·지원 데이터를 업로드하도록 설계합니다.",
        nextPlanEn: "Enable the organization to upload monthly participant, revenue, and support data.",
      },
    ],
    organization: {
      missionKo: "홈리스와 소외된 사람들이 삶을 긍정적으로 변화시킬 수 있는 해결책을 개발합니다.",
      missionEn:
        "Develops solutions for people experiencing homelessness and exclusion to change their lives positively.",
      legalType: "Nonprofit social enterprise / public-source classification",
      founded: "2010",
      website: "https://bigissue.kr/",
    },
  },
  {
    id: "donggubat-inclusive-esg-products",
    slug: "donggubat-inclusive-esg-products",
    sourceUrl: "https://donggubat.co.kr/",
    sourceLabel: "Donggubat official store",
    titleKo: "친환경 생활용품 기업구매와 발달장애인 고용",
    titleEn: "Eco product procurement linked to employment for workers with developmental disabilities",
    organizationKo: "동구밭",
    organizationEn: "Donggubat",
    organizationType: "social-enterprise",
    region: "Hanam, Korea",
    category: "Inclusive work and low-waste products",
    oneLineImpactKo:
      "고체 비누와 생활용품 구매를 발달장애인 고용과 플라스틱 저감 임팩트로 연결합니다.",
    oneLineImpactEn:
      "Links solid soap and lifestyle product procurement to disability employment and plastic reduction.",
    currentNeedKo: "기업 ESG 기프트, ODM/OEM 구매, 정기 캠페인",
    currentNeedEn: "Corporate ESG gifts, ODM/OEM procurement, recurring campaigns",
    imageUrl:
      "https://images.unsplash.com/photo-1607006483224-16bc32c93691?auto=format&fit=crop&w=1400&q=80",
    imageAltKo: "친환경 비누와 생활용품",
    imageAltEn: "Eco-friendly soaps and lifestyle products",
    provenance: "public-source",
    stage: "organization-confirmed",
    partnershipTypes: ["corporate-procurement", "partnership"],
    latestUpdate: "2026.07",
    verificationLabelKo: "공개자료 기반, 구매/고용 지표 제출 필요",
    verificationLabelEn: "Public-source profile, procurement and employment metrics required",
    partnershipGoalKo: "기업 구매가 고용과 환경성과로 전환되는 과정을 월간 추적",
    partnershipGoalEn: "Monthly tracking of how corporate purchases convert into employment and environmental results",
    committedSupportKo: "데모 포트폴리오: ESG 선물 구매 후보",
    committedSupportEn: "Demo portfolio: ESG gift procurement candidate",
    targetAmountKrw: 45000000,
    committedAmountKrw: 13200000,
    metricsKo: ["발달장애인 고용", "기업 선물 구매", "플라스틱 저감"],
    metricsEn: ["Disability employment", "Corporate gift procurement", "Plastic reduction"],
    tags: ["발달장애", "친환경", "기업기프트", "ESG"],
    problemKo:
      "발달장애인의 장기근속과 기업의 지속가능 구매가 따로 관리되면 사회성과와 구매성과를 연결해 설명하기 어렵습니다.",
    problemEn:
      "When employment and sustainable procurement are tracked separately, companies cannot explain how purchases create social results.",
    participantsKo: "발달장애인 근로자, 기업 구매팀, 지속가능 소비 고객",
    participantsEn:
      "Workers with developmental disabilities, corporate procurement teams, sustainability-minded consumers",
    whyNowKo:
      "기업은 임직원 선물과 ESG 구매를 사회공헌 보고서에 연결할 수 있는 명확한 지표를 요구합니다.",
    whyNowEn:
      "Companies need clear indicators that connect gifts and ESG procurement to CSR reporting.",
    activitiesKo: ["고체 비누·생활용품 제조", "기업 선물 및 ODM/OEM 납품", "저폐기물 제품 캠페인"],
    activitiesEn: ["Solid soap and lifestyle product manufacturing", "Corporate gifts and ODM/OEM supply", "Low-waste product campaigns"],
    intendedOutcomesKo: ["구매 기반 고용 유지 가능성 강화", "기업 ESG 구매 근거자료 확보", "제품 단위 환경성과 기록"],
    intendedOutcomesEn: ["Stronger employment sustainability through purchasing", "Evidence for ESG procurement", "Product-level environmental reporting"],
    budget: [
      { labelKo: "제품 생산/재료", labelEn: "Production materials", valueKo: "2,200만원", valueEn: "KRW 22M" },
      { labelKo: "고용/훈련", labelEn: "Employment and training", valueKo: "1,300만원", valueEn: "KRW 13M" },
      { labelKo: "캠페인/보고", labelEn: "Campaign and reporting", valueKo: "1,000만원", valueEn: "KRW 10M" },
    ],
    evidenceKo: ["공식몰", "제품 카테고리", "언론 공개자료"],
    evidenceEn: ["Official store", "Product categories", "Public media materials"],
    participantVoiceKo: "실제 근로자 인터뷰는 보호 기준에 따라 비식별화해 관리합니다.",
    participantVoiceEn: "Worker interviews should be de-identified under protection rules.",
    updates: [
      {
        month: "2026.07",
        activitiesKo: "기업 구매형 프로젝트 카드와 사회공헌 보고서 지표를 구성했습니다.",
        activitiesEn: "Configured the procurement project card and CSR report indicators.",
        metricChangeKo: "신규 지표: 구매액, 제품 수량, 고용 유지, 저폐기물 제품",
        metricChangeEn: "New metrics: purchase value, units, employment retention, low-waste products",
        evidenceKo: ["공식몰", "제품 공개자료"],
        evidenceEn: ["Official store", "Public product materials"],
        nextPlanKo: "기업 구매 문의와 월간 제품/고용 데이터를 연결합니다.",
        nextPlanEn: "Connect corporate procurement inquiries to monthly product and employment data.",
      },
    ],
    organization: {
      missionKo: "발달장애인 고용과 지속가능한 생활용품을 연결하는 사회적기업입니다.",
      missionEn:
        "A social enterprise connecting disability employment with sustainable lifestyle products.",
      legalType: "Social enterprise / public-source classification",
      founded: "2015",
      website: "https://donggubat.co.kr/",
    },
  },
];

export function getDemoProject(slug: string) {
  return demoProjects.find((project) => project.slug === slug);
}

export function getFeaturedDemoProjects() {
  return demoProjects.slice(0, 3);
}
