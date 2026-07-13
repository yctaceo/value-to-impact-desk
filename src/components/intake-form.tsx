"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { FieldLabel } from "./ui";

export function IntakeForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="panel p-8">
        <CheckCircle2 className="text-[var(--accent)]" size={36} />
        <h2 className="mt-4 text-2xl font-semibold">Intake draft saved</h2>
        <p className="mt-3 text-[var(--muted)]">
          Supabase 연결 전에는 데모 제출로 처리됩니다. 연결 후에는
          organizations, impact_profiles, evidence_files, consents 테이블에
          저장됩니다.
        </p>
      </div>
    );
  }

  return (
    <form
      className="panel grid gap-6 p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FieldLabel label="조직명" required>
          <input className="field" placeholder="예: 베어베터" />
        </FieldLabel>
        <FieldLabel label="조직 유형" required>
          <select className="field" defaultValue="social_enterprise">
            <option value="social_enterprise">사회적기업 / 영리형 소셜벤처</option>
            <option value="nonprofit">비영리단체 / 비영리법인</option>
            <option value="cooperative">사회적협동조합</option>
            <option value="bam">BAM / Faith-driven business</option>
          </select>
        </FieldLabel>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FieldLabel label="대표 연락처">
          <input className="field" type="email" placeholder="contact@example.org" />
        </FieldLabel>
        <FieldLabel label="홈페이지 / SNS">
          <input className="field" placeholder="https://..." />
        </FieldLabel>
      </div>
      <FieldLabel label="핵심가치 / 존재 이유" required>
        <textarea
          className="field min-h-28"
          placeholder="이 조직은 왜 존재하나요?"
        />
      </FieldLabel>
      <FieldLabel label="해결하는 사회문제" required>
        <textarea
          className="field min-h-28"
          placeholder="누구의 어떤 문제를 해결하나요?"
        />
      </FieldLabel>
      <div className="grid gap-4 md:grid-cols-3">
        <FieldLabel label="총 고용 인원">
          <input className="field" type="number" min="0" />
        </FieldLabel>
        <FieldLabel label="취약계층 고용 인원">
          <input className="field" type="number" min="0" />
        </FieldLabel>
        <FieldLabel label="월매출 / 후원금">
          <input className="field" placeholder="예: 매출 780만 원" />
        </FieldLabel>
      </div>
      <FieldLabel label="제품 / 서비스 / 기업구매 가능 항목">
        <textarea
          className="field min-h-24"
          placeholder="제품명, 가격대, 월 생산능력, 납품 가능 형태"
        />
      </FieldLabel>
      <FieldLabel label="현재 필요한 도움">
        <textarea
          className="field min-h-24"
          placeholder="후원, 투자, 구매, 파트너십, 멘토링 등"
        />
      </FieldLabel>
      <div className="grid gap-4 md:grid-cols-2">
        <FieldLabel label="활동 사진">
          <input className="field" type="file" multiple accept="image/*" />
        </FieldLabel>
        <FieldLabel label="증빙자료">
          <input className="field" type="file" multiple />
        </FieldLabel>
      </div>
      <div className="grid gap-3 rounded-md bg-[#fbfaf8] p-4 text-sm">
        {[
          "서비스 이용약관과 개인정보 수집/이용에 동의합니다. (필수)",
          "제출자료가 플랫폼 내 리포트 생성과 관리자 검토에 활용되는 것에 동의합니다. (필수)",
          "업로드한 사진/자료의 사용 권한을 보유했음을 확인합니다. (필수)",
          "민감정보 또는 제3자 개인정보 포함 시 제출자가 책임을 확인합니다. (필수)",
          "익명화 데이터의 학술연구 및 서비스 개선 활용에 동의합니다. (선택)",
          "해외 파트너에게 영문 Profile 공유 가능성에 동의합니다. (선택)",
        ].map((label, index) => (
          <label key={label} className="flex items-start gap-3">
            <input
              type="checkbox"
              required={index < 4}
              className="mt-1 h-4 w-4 accent-[var(--accent)]"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
      <button className="rounded-md bg-[var(--ink)] px-5 py-3 font-semibold text-white">
        Intake 제출하기
      </button>
    </form>
  );
}
