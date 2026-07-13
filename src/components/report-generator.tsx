"use client";

import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { profiles } from "@/lib/seed-data";

const reportTypes = [
  "1p Impact Summary",
  "5p Donor / Investor Brief",
  "Monthly Impact Report",
  "Company / CSR Procurement Brief",
  "English Impact Profile Draft",
];

export function ReportGenerator() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  async function generateReport() {
    setLoading(true);
    const response = await fetch("/api/reports/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reportType: reportTypes[0],
        profile: profiles[6],
      }),
    });
    const data = (await response.json()) as { report: string };
    setOutput(data.report);
    setLoading(false);
  }

  return (
    <div className="panel p-6">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-[#e9f5f1] p-2 text-[var(--accent)]">
          <FileText size={20} />
        </span>
        <div>
          <h3 className="font-semibold">AI Report Generator</h3>
          <p className="text-sm text-[var(--muted)]">
            OPENAI_API_KEY가 없으면 mock report가 생성됩니다.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <select className="field">
          {reportTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <button
          onClick={generateReport}
          disabled={loading}
          className="rounded-md bg-[var(--ink)] px-4 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Generating
            </span>
          ) : (
            "Generate Draft"
          )}
        </button>
      </div>
      <pre className="mt-5 min-h-56 whitespace-pre-wrap rounded-md border border-[var(--line)] bg-[#fbfaf8] p-4 text-sm leading-6">
        {output ||
          `Sample Output Preview\n\n1. Impact Summary\n- Organization: Bloom Paper Art Collective\n- Verification: Level 2 - Evidence Submitted\n- Source fields: employmentTotal, monthlyUpdates, evidence\n\n2. Important Notice\nAI does not verify claims. Verification level is assigned only by Admin/Reviewer.`}
      </pre>
    </div>
  );
}
