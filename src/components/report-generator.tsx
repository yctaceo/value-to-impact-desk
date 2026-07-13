"use client";

import { useState } from "react";
import { ClipboardCheck, Database, FileText, Loader2 } from "lucide-react";
import { profiles } from "@/lib/seed-data";

const reportTypes = [
  "CSR Executive Summary",
  "Monthly Impact Brief",
  "Corporate Procurement Impact Memo",
  "Annual CSR Appendix",
  "English Impact Profile",
];

export function ReportGenerator() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [reportType, setReportType] = useState(reportTypes[0]);

  async function generateReport() {
    setLoading(true);
    const response = await fetch("/api/reports/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reportType,
        profile: profiles[0],
      }),
    });
    const data = (await response.json()) as { report: string };
    setOutput(data.report);
    setLoading(false);
  }

  return (
    <div className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_24px_70px_rgba(32,26,32,0.10)]">
      <div className="flex items-start gap-3">
        <span className="rounded-md bg-[var(--accent-soft)] p-2 text-[var(--accent)]">
          <FileText size={20} />
        </span>
        <div>
          <h3 className="font-semibold">CSR Report Builder</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
            비영리기업이 공개한 활동 데이터와 증빙 상태를 CSR 담당자가 읽는 형식으로 정리합니다.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-[var(--line)] bg-[#fbfaf8] p-4">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-[var(--accent)]" />
            <h4 className="font-semibold">Source data</h4>
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-[var(--muted)]">Organization</dt>
              <dd className="font-semibold">베어베터</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[var(--muted)]">Updated</dt>
              <dd className="font-semibold">2026.07</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[var(--muted)]">Evidence</dt>
              <dd className="font-semibold">공개자료 + 제출자료</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-md border border-[#d8cff8] bg-[var(--accent-soft)] p-4">
          <div className="flex items-center gap-2">
            <ClipboardCheck size={18} className="text-[var(--accent)]" />
            <h4 className="font-semibold">Report structure</h4>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <li>요약: 후원 목적과 발생한 변화</li>
            <li>지표: 활동, 참여자, 예산, 증빙</li>
            <li>첨부: CSR 보고서용 근거 목록</li>
          </ul>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <select
          className="field"
          value={reportType}
          onChange={(event) => setReportType(event.target.value)}
          aria-label="Report type"
        >
          {reportTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          onClick={generateReport}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--ink)] px-4 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              작성 중
            </span>
          ) : (
            "CSR 보고서 작성"
          )}
        </button>
      </div>

      <pre className="mt-5 min-h-72 whitespace-pre-wrap rounded-md border border-[var(--line)] bg-[#201a28] p-5 text-sm leading-7 text-white">
        {output ||
          `CSR Report Preview

1. 후원 개요
베어베터 포용고용 프로젝트는 기업 구매와 위탁 운영을 발달장애인 일자리 유지로 연결합니다.

2. 이번 달 임팩트
- 고용 유지: 24명
- 기업 파트너십: 6건
- 보고서 준비도: 82%

3. 근거자료
공식 웹사이트, 제품/서비스 공개자료, 조직 제출 월간보고를 함께 표시합니다.`}
      </pre>
    </div>
  );
}
