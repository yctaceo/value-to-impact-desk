"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { FieldLabel } from "./ui";

export function MonthlyReportForm() {
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <div className="panel p-8">
        <CheckCircle2 className="text-[var(--accent)]" size={34} />
        <h2 className="mt-4 text-2xl font-semibold">Monthly report draft saved</h2>
        <p className="mt-3 text-[var(--muted)]">
          실제 연결 후에는 monthly_reports, evidence_files, generated_reports에
          저장되고 관리자 검토 후 후원자/기업 대시보드에 공개됩니다.
        </p>
      </div>
    );
  }

  return (
    <form
      className="panel grid gap-6 p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <FieldLabel label="보고월" required>
          <input className="field" type="month" required />
        </FieldLabel>
        <FieldLabel label="매출">
          <input className="field" placeholder="예: 7,800,000 KRW" />
        </FieldLabel>
        <FieldLabel label="후원금 / 보조금">
          <input className="field" placeholder="예: 3,000,000 KRW" />
        </FieldLabel>
      </div>
      <FieldLabel label="이번 달 주요 활동" required>
        <textarea
          className="field min-h-28"
          placeholder="교육 3회, 생산 200개, 납품 2건 등"
          required
        />
      </FieldLabel>
      <div className="grid gap-4 md:grid-cols-2">
        <FieldLabel label="고용 변화">
          <textarea
            className="field min-h-24"
            placeholder="취약계층 근로자 2명 신규 채용, 퇴사 1명 등"
          />
        </FieldLabel>
        <FieldLabel label="제품 생산 / 판매">
          <textarea
            className="field min-h-24"
            placeholder="제품 수량, 기업 납품, 재고, 생산능력"
          />
        </FieldLabel>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FieldLabel label="문제 / 요청사항">
          <textarea
            className="field min-h-24"
            placeholder="작업공간 부족, 재료비 지원 필요 등"
          />
        </FieldLabel>
        <FieldLabel label="다음 달 계획">
          <textarea
            className="field min-h-24"
            placeholder="기업 납품 준비, 교육생 모집 등"
          />
        </FieldLabel>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FieldLabel label="활동사진">
          <input className="field" type="file" multiple accept="image/*" />
        </FieldLabel>
        <FieldLabel label="증빙자료">
          <input className="field" type="file" multiple />
        </FieldLabel>
      </div>
      <label className="flex items-start gap-3 rounded-md bg-[#f7f8f4] p-4 text-sm">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-[var(--accent)]" />
        <span>
          제출 자료가 월간 리포트 생성, 관리자 검토, 승인된 이해관계자 공유에
          활용되는 것에 동의합니다.
        </span>
      </label>
      <button className="rounded-md bg-[var(--ink)] px-5 py-3 font-semibold text-white">
        월간보고 제출하기
      </button>
    </form>
  );
}
