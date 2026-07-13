import {
  BarChart3,
  Building2,
  CheckCircle2,
  FileDown,
  Globe2,
  MapPinned,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";

const operatingSteps = [
  {
    icon: SearchCheck,
    title: "발굴",
    body: "한국에서 실제로 활동하는 비영리와 사회적기업을 공개자료 기준으로 먼저 정리합니다.",
  },
  {
    icon: ShieldCheck,
    title: "구조화",
    body: "조직 미션, 활동, 참여자, 예산, 증빙자료를 기업 담당자가 검토할 수 있는 항목으로 나눕니다.",
  },
  {
    icon: BarChart3,
    title: "추적",
    body: "지원 이후의 변화는 월간 지표, 그래프, 증빙 상태, 다음 계획으로 계속 업데이트합니다.",
  },
  {
    icon: FileDown,
    title: "보고",
    body: "연말 CSR 보고서에 붙일 수 있는 요약, 지표, 근거자료 묶음을 다운로드할 수 있게 만듭니다.",
  },
];

const principles = [
  "기획 문구보다 실제 사용자가 판단할 수 있는 데이터를 우선합니다.",
  "공개자료, 조직 제출자료, 현장 확인, 회계 검토 상태를 섞지 않습니다.",
  "AI는 보고서 문장을 돕는 도구로 사용하고, 근거와 출처는 별도 필드로 남깁니다.",
  "작은 프로젝트라도 기업이 검토할 수 있는 언어와 형식으로 번역합니다.",
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="bg-[#f7f4ef]">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="animate-rise">
            <p className="eyebrow">About Value-to-Impact Desk</p>
            <h1 className="korean-copy mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              기업의 후원이 실제 변화로 이어졌는지 확인할 수 있어야 합니다.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Value-to-Impact Desk는 한국의 비영리 프로젝트를 발굴하고, 기업 후원자가 이해할 수 있는 임팩트 데이터와 CSR 보고서로 정리하는 플랫폼입니다.
            </p>
          </div>

          <div className="animate-rise-delay overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[0_28px_90px_rgba(32,26,32,0.14)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1500&q=80"
              alt="기업 담당자들이 임팩트 데이터를 논의하는 회의"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="grid gap-px bg-[var(--line)] sm:grid-cols-3">
              {[
                ["Projects", "9"],
                ["Impact fields", "36"],
                ["Report output", "CSR"],
              ].map(([label, value]) => (
                <div key={label} className="bg-white p-5">
                  <p className="text-sm text-[var(--muted)]">{label}</p>
                  <p className="mt-2 text-2xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Why this matters</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              좋은 프로젝트가 있어도 기업이 읽을 수 있는 형태가 아니면 연결되기 어렵습니다.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["기업의 문제", "후원 이후 어떤 변화가 있었는지 내부 보고와 CSR 문서로 설명해야 합니다."],
              ["비영리의 문제", "현장 활동은 충분하지만 기업이 요구하는 지표, 증빙, 보고서 포맷을 매번 새로 만들기 어렵습니다."],
              ["플랫폼의 역할", "프로젝트 발견부터 지원 이후 추적, 보고서 다운로드까지 하나의 흐름으로 연결합니다."],
              ["우리가 보는 임팩트", "활동 수가 아니라 참여자 변화, 예산 사용, 증빙 상태, 다음 지원 필요를 함께 봅니다."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-[var(--line)] bg-[#fbfaf8] p-5 hover-lift">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f1ecfb] py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Reference points</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              글로벌 임팩트 플랫폼의 운영 방식에서 배우고, 한국 프로젝트에 맞게 다시 설계합니다.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-[#d8cff8] bg-white p-6 hover-lift">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-[var(--accent-soft)] p-2 text-[var(--accent)]">
                  <Building2 size={20} />
                </span>
                <h3 className="text-2xl font-semibold">Benevity에서 참고한 점</h3>
              </div>
              <p className="mt-4 leading-7 text-[var(--muted)]">
                기업의 기부, 임직원 참여, 그랜트, 보고를 흩어진 도구가 아니라 하나의 임팩트 운영 흐름으로 관리한다는 관점입니다. 우리는 이를 한국의 소규모 비영리 프로젝트와 기업 후원자 사이의 실제 접점으로 좁혀 구현합니다.
              </p>
            </div>

            <div className="rounded-lg border border-[#d8cff8] bg-white p-6 hover-lift">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-[var(--accent-soft)] p-2 text-[var(--accent)]">
                  <Globe2 size={20} />
                </span>
                <h3 className="text-2xl font-semibold">Impact Genome에서 참고한 점</h3>
              </div>
              <p className="mt-4 leading-7 text-[var(--muted)]">
                사회성과를 outcome, evidence, cost, strategy 같은 공통 언어로 정리해야 비교와 학습이 가능하다는 관점입니다. 우리는 이 방식을 그대로 복제하지 않고, 한국 프로젝트가 제출할 수 있는 현실적인 지표와 CSR 보고서 구조로 번역합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff7ed] py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="grid gap-4 md:grid-cols-2">
            {operatingSteps.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-lg border border-[#ead7bf] bg-white p-5 hover-lift">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#fff3e7] text-[var(--gold)]">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="eyebrow">Operating model</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              발굴에서 CSR 보고서까지, 기업 담당자의 업무 흐름에 맞춥니다.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              기업은 대시보드에서 지원한 프로젝트의 지표와 차트를 확인하고, 비영리는 월간 활동과 증빙자료를 제출합니다. 같은 데이터를 기준으로 프로젝트 상세, 임팩트 그래프, PDF 보고서가 함께 업데이트됩니다.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--ink)] py-16 text-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow text-[#ffbd8f]">Social Impact Tracing Map</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              작은 프로젝트를 찾고, 지원 이후의 변화를 계속 따라갑니다.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              한국의 지역 기반 비영리 프로젝트는 글로벌 기업이 찾기 어렵고, 후원 이후의 변화도 흩어져 있습니다. 우리는 프로젝트를 지도처럼 모으고, 같은 기준으로 업데이트하며, 기업과 비영리가 같은 화면을 보도록 만듭니다.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/12 bg-white/8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=80"
              alt="지역사회 프로젝트가 운영되는 도시 풍경"
              className="aspect-[16/10] w-full object-cover opacity-90"
            />
            <div className="grid gap-px bg-white/12 sm:grid-cols-3">
              {[
                ["Discover", "프로젝트 발굴"],
                ["Trace", "변화 추적"],
                ["Report", "CSR 보고"],
              ].map(([label, body]) => (
                <div key={label} className="bg-[var(--ink)] p-5">
                  <p className="font-semibold text-[#ffbd8f]">{label}</p>
                  <p className="mt-2 text-sm text-white/72">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">Trust principles</p>
            <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              신뢰는 멋진 문장보다 구분된 데이터에서 시작합니다.
            </h2>
          </div>
          <div className="grid gap-3">
            {principles.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-[var(--line)] bg-[#fbfaf8] p-5">
                <CheckCircle2 size={20} className="mt-1 shrink-0 text-[var(--accent)]" />
                <p className="leading-7 text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] py-16">
        <div className="container-page rounded-lg border border-[var(--line)] bg-white p-8 md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="eyebrow">Korea first, global ready</p>
              <h2 className="korean-copy mt-3 text-3xl font-semibold leading-tight">
                한국의 현장 언어를 글로벌 기업의 보고 언어로 바꿉니다.
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-[var(--ink)] px-4 py-3 text-white">
              <MapPinned size={20} className="text-[#ffbd8f]" />
              <span className="font-semibold">Impact Tracing Map</span>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
