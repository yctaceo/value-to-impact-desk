import Link from "next/link";
import {
  ArrowRight,
  Download,
  FileDown,
  LineChart,
  PieChart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import type { ProjectDetail } from "@/types/project";

type ImpactRecord = {
  slug: string;
  label: string;
  supportType: string;
  supportAmount: number;
  reportReady: number;
  metrics: {
    primary: string;
    primaryValue: string;
    secondary: string;
    secondaryValue: string;
    reach: number;
    evidence: number;
    budgetUse: number;
    monthScore: number;
  };
  series: number[];
  allocation: { label: string; value: number; color: string }[];
};

const impactRecords: ImpactRecord[] = [
  {
    slug: "bear-better-inclusive-work",
    label: "Inclusive procurement",
    supportType: "기업구매 검토",
    supportAmount: 18500000,
    reportReady: 82,
    metrics: {
      primary: "고용 유지",
      primaryValue: "24명",
      secondary: "기업 파트너십",
      secondaryValue: "6건",
      reach: 72,
      evidence: 84,
      budgetUse: 64,
      monthScore: 88,
    },
    series: [42, 48, 55, 61, 70, 78, 82],
    allocation: [
      { label: "직무 코칭", value: 40, color: "#5b45d6" },
      { label: "운영", value: 36, color: "#c96f3b" },
      { label: "보고", value: 24, color: "#2f2338" },
    ],
  },
  {
    slug: "big-issue-korea-housing-income",
    label: "Donor program",
    supportType: "후원·캠페인",
    supportAmount: 22400000,
    reportReady: 74,
    metrics: {
      primary: "판매원 참여",
      primaryValue: "38명",
      secondary: "정기구독",
      secondaryValue: "410건",
      reach: 68,
      evidence: 72,
      budgetUse: 58,
      monthScore: 79,
    },
    series: [35, 44, 47, 52, 64, 69, 74],
    allocation: [
      { label: "판매원 지원", value: 44, color: "#5b45d6" },
      { label: "캠페인", value: 34, color: "#c96f3b" },
      { label: "보고", value: 22, color: "#2f2338" },
    ],
  },
  {
    slug: "donggubat-inclusive-esg-products",
    label: "ESG gift pipeline",
    supportType: "ESG 구매 후보",
    supportAmount: 13200000,
    reportReady: 69,
    metrics: {
      primary: "제품 구매",
      primaryValue: "1,260개",
      secondary: "고용 연결",
      secondaryValue: "14명",
      reach: 61,
      evidence: 69,
      budgetUse: 55,
      monthScore: 73,
    },
    series: [28, 35, 41, 47, 54, 62, 69],
    allocation: [
      { label: "생산", value: 48, color: "#5b45d6" },
      { label: "고용·훈련", value: 30, color: "#c96f3b" },
      { label: "캠페인", value: 22, color: "#2f2338" },
    ],
  },
];

function formatKrw(value: number) {
  return `${Math.round(value / 10000).toLocaleString("ko-KR")}만원`;
}

function BarMeter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-[var(--muted)]">{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#ebe4dc]">
        <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MiniTrend({ values }: { values: number[] }) {
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 260;
      const y = 92 - (value / 100) * 76;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 260 100" className="h-32 w-full" role="img" aria-label="Monthly impact trend">
      <defs>
        <linearGradient id="impactTrend" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#5b45d6" />
          <stop offset="100%" stopColor="#c96f3b" />
        </linearGradient>
      </defs>
      {[20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" x2="260" y1={y} y2={y} stroke="#e6ded4" strokeWidth="1" />
      ))}
      <polyline fill="none" points={points} stroke="url(#impactTrend)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
      {values.map((value, index) => {
        const x = (index / (values.length - 1)) * 260;
        const y = 92 - (value / 100) * 76;
        return <circle key={`${value}-${index}`} cx={x} cy={y} r="4" fill="#201a28" />;
      })}
    </svg>
  );
}

function Donut({ items }: { items: ImpactRecord["allocation"] }) {
  const segments = items.reduce<Array<ImpactRecord["allocation"][number] & { offset: number }>>(
    (acc, item) => {
      const previous = acc.at(-1);
      const offset = previous ? previous.offset - previous.value : 25;
      return [...acc, { ...item, offset }];
    },
    [],
  );

  return (
    <div className="grid gap-4 sm:grid-cols-[150px_1fr] sm:items-center">
      <svg viewBox="0 0 42 42" className="h-36 w-36" role="img" aria-label="Budget allocation chart">
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ece6de" strokeWidth="7" />
        {segments.map((item) => {
          const dash = `${item.value} ${100 - item.value}`;
          return (
            <circle
              key={item.label}
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke={item.color}
              strokeDasharray={dash}
              strokeDashoffset={item.offset}
              strokeWidth="7"
            />
          );
        })}
      </svg>
      <div className="grid gap-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 rounded-md bg-[#fbfaf8] px-3 py-2 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
            <span className="font-semibold">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdf(record: ImpactRecord, project: ProjectDetail) {
  const lines = [
    "Value-to-Impact Desk CSR Impact Brief",
    `Organization: ${project.organizationEn}`,
    `Project: ${project.titleEn}`,
    `Support type: ${record.supportType}`,
    `Committed support: KRW ${record.supportAmount.toLocaleString("en-US")}`,
    `Primary metric: ${record.metrics.primaryValue}`,
    `Secondary metric: ${record.metrics.secondaryValue}`,
    `Evidence readiness: ${record.metrics.evidence}%`,
    `Monthly impact score: ${record.metrics.monthScore}%`,
    "Note: Demo PDF generated from front-end sample data.",
  ];
  const content = [
    "BT",
    "/F1 18 Tf",
    "56 780 Td",
    `(${escapePdfText(lines[0])}) Tj`,
    "/F1 11 Tf",
    ...lines.slice(1).flatMap((line) => ["0 -28 Td", `(${escapePdfText(line)}) Tj`]),
    "ET",
  ].join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

export function InvestorImpactDashboard({
  projects,
  activeSlug = impactRecords[0].slug,
}: {
  projects: ProjectDetail[];
  activeSlug?: string;
}) {
  const activeRecord = impactRecords.find((record) => record.slug === activeSlug) ?? impactRecords[0];
  const activeProject = projects.find((project) => project.slug === activeRecord.slug) ?? projects[0];

  const totals = {
    support: impactRecords.reduce((sum, item) => sum + item.supportAmount, 0),
    evidence: Math.round(impactRecords.reduce((sum, item) => sum + item.metrics.evidence, 0) / impactRecords.length),
  };

  const pdfHref = `data:application/pdf;charset=utf-8,${encodeURIComponent(
    buildPdf(activeRecord, activeProject),
  )}`;
  const pdfFileName = `${activeProject.organizationEn
    .replace(/\s+/g, "-")
    .toLowerCase()}-csr-impact-brief.pdf`;

  return (
    <div className="space-y-8">
      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <p className="eyebrow">Investor dashboard</p>
          <h1 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
            내가 지원한 비영리 프로젝트의 변화를 관리합니다.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            포트폴리오 카드를 선택하면 활동 수치, 지표 그래프, 예산 구성, 보고서 상태가 같은 화면에서 즉시 바뀝니다.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="panel p-4">
            <p className="text-sm text-[var(--muted)]">지원 포트폴리오</p>
            <p className="mt-2 text-2xl font-semibold">{impactRecords.length}개</p>
          </div>
          <div className="panel p-4">
            <p className="text-sm text-[var(--muted)]">누적 지원</p>
            <p className="mt-2 text-2xl font-semibold">{formatKrw(totals.support)}</p>
          </div>
          <div className="panel p-4">
            <p className="text-sm text-[var(--muted)]">평균 증빙 준비도</p>
            <p className="mt-2 text-2xl font-semibold">{totals.evidence}%</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="grid h-fit gap-3">
          <div className="rounded-lg border border-[var(--line)] bg-white p-4">
            <p className="font-semibold">내가 지원한 비영리기업</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              카드를 선택하면 오른쪽 분석 패널이 해당 조직 기준으로 바뀝니다.
            </p>
          </div>
          {impactRecords.map((record) => {
            const project = projects.find((item) => item.slug === record.slug);
            const selected = record.slug === activeSlug;
            if (!project) return null;
            return (
              <Link
                key={record.slug}
                href={`/dashboard?project=${record.slug}`}
                className={`rounded-lg border p-4 text-left transition ${
                  selected
                    ? "border-[var(--accent)] bg-[var(--ink)] text-white shadow-[0_18px_60px_rgba(32,26,32,0.18)]"
                    : "border-[var(--line)] bg-white hover:border-[var(--accent)]"
                }`}
              >
                <p className={`text-xs font-semibold uppercase ${selected ? "text-[#ffbd8f]" : "text-[var(--accent)]"}`}>
                  {record.label}
                </p>
                <h2 className="korean-copy mt-2 text-lg font-semibold leading-6">{project.organizationKo}</h2>
                <p className={`mt-2 text-sm leading-6 ${selected ? "text-white/74" : "text-[var(--muted)]"}`}>
                  {project.currentNeedKo}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                  <span>{record.supportType}</span>
                  <strong>{formatKrw(record.supportAmount)}</strong>
                </div>
              </Link>
            );
          })}
        </aside>

        <div className="grid gap-6">
          <section className="rounded-lg border border-[var(--line)] bg-white p-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">{activeRecord.supportType}</p>
                <h2 className="korean-copy mt-2 text-3xl font-semibold leading-tight">{activeProject.titleKo}</h2>
                <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">{activeProject.oneLineImpactKo}</p>
              </div>
              <a
                href={pdfHref}
                download={pdfFileName}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-white"
              >
                <Download size={16} />
                CSR 보고서 PDF 다운로드
              </a>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <div className="rounded-md bg-[#fbfaf8] p-4">
                <p className="text-sm text-[var(--muted)]">{activeRecord.metrics.primary}</p>
                <p className="mt-2 text-2xl font-semibold">{activeRecord.metrics.primaryValue}</p>
              </div>
              <div className="rounded-md bg-[#fbfaf8] p-4">
                <p className="text-sm text-[var(--muted)]">{activeRecord.metrics.secondary}</p>
                <p className="mt-2 text-2xl font-semibold">{activeRecord.metrics.secondaryValue}</p>
              </div>
              <div className="rounded-md bg-[#fbfaf8] p-4">
                <p className="text-sm text-[var(--muted)]">보고서 준비도</p>
                <p className="mt-2 text-2xl font-semibold">{activeRecord.reportReady}%</p>
              </div>
              <div className="rounded-md bg-[#fbfaf8] p-4">
                <p className="text-sm text-[var(--muted)]">최근 업데이트</p>
                <p className="mt-2 text-2xl font-semibold">{activeProject.latestUpdate}</p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-lg border border-[var(--line)] bg-white p-5">
              <div className="flex items-center gap-2">
                <LineChart size={20} className="text-[var(--accent)]" />
                <h3 className="font-semibold">월별 임팩트 추이</h3>
              </div>
              <MiniTrend values={activeRecord.series} />
              <div className="mt-4 grid gap-4">
                <BarMeter label="참여자·고용 변화" value={activeRecord.metrics.reach} />
                <BarMeter label="증빙자료 준비도" value={activeRecord.metrics.evidence} />
                <BarMeter label="지원금 사용 보고" value={activeRecord.metrics.budgetUse} />
              </div>
            </div>

            <div className="rounded-lg border border-[var(--line)] bg-white p-5">
              <div className="flex items-center gap-2">
                <PieChart size={20} className="text-[var(--accent)]" />
                <h3 className="font-semibold">지원금 사용 구성</h3>
              </div>
              <div className="mt-5">
                <Donut items={activeRecord.allocation} />
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg border border-[var(--line)] bg-white p-5">
              <ShieldCheck size={20} className="text-[var(--accent)]" />
              <h3 className="mt-4 font-semibold">검증 상태</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{activeProject.verificationLabelKo}</p>
            </div>
            <div className="rounded-lg border border-[var(--line)] bg-white p-5">
              <TrendingUp size={20} className="text-[var(--accent)]" />
              <h3 className="mt-4 font-semibold">이번 달 활동</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{activeProject.updates[0]?.activitiesKo}</p>
            </div>
            <Link href={`/projects/${activeProject.slug}`} className="rounded-lg border border-[var(--line)] bg-[var(--ink)] p-5 text-white">
              <FileDown size={20} className="text-[#ffbd8f]" />
              <h3 className="mt-4 font-semibold">프로젝트 상세 보기</h3>
              <p className="mt-2 text-sm leading-6 text-white/74">지원 전후 맥락과 증빙 목록을 확인합니다.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                열기 <ArrowRight size={15} />
              </span>
            </Link>
          </section>
        </div>
      </section>
    </div>
  );
}
