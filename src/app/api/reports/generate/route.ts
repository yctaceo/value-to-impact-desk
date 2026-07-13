import { NextResponse } from "next/server";
import type { ImpactProfile } from "@/lib/types";

type ReportRequest = {
  reportType?: string;
  profile?: ImpactProfile;
};

function mockReport(reportType: string, profile?: ImpactProfile) {
  const name = profile?.nameKo ?? profile?.nameEn ?? "샘플 조직";
  const level = profile?.verificationLevel ?? 1;
  const highlights = profile?.impactHighlights?.join(", ") ?? "임팩트 데이터 정리 필요";
  const sourceFields = [
    "조직 미션",
    "사회문제",
    "활동 내역",
    "참여자 변화",
    "예산 집행",
    "증빙자료",
  ].join(", ");

  return `${reportType}

조직: ${name}
검토 상태: Level ${level}
사용한 데이터: ${sourceFields}

1. CSR 보고서 요약
${profile?.oneLine ?? "조직의 활동 데이터가 제출되면 기업 보고서용 요약으로 정리됩니다."}

2. 이번 달 핵심 변화
- ${highlights}
- 공개자료와 조직 제출자료를 기준으로 활동, 예산, 참여자 변화를 구분해 표시합니다.

3. 기업 후원자에게 필요한 정보
${profile?.currentNeeds?.[0]?.label ?? "현재 필요한 지원 항목을 등록해야 합니다."}

4. 증빙 및 주의사항
- 보고서는 공개자료와 제출자료를 바탕으로 자동 작성된 초안입니다.
- 검토 상태, 현장 확인, 회계 검토 여부는 별도 필드로 표시합니다.
- 투자 권유, 기부 권유, 중개 제안으로 사용하지 않습니다.`;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ReportRequest;
  const reportType = payload.reportType ?? "1p Impact Summary";
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      mode: "mock",
      report: mockReport(reportType, payload.profile),
    });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-5.4-mini",
      instructions:
        "You create Korean CSR impact report drafts from nonprofit or social enterprise data. Write natural Korean, use only submitted or public-source fields, separate source/evidence status from narrative, and avoid investment recommendations, donation pressure, or unsupported claims.",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Create a ${reportType} from this profile JSON. Return concise markdown.\n\n${JSON.stringify(
                payload.profile,
                null,
                2,
              )}`,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        mode: "mock_after_openai_error",
        error: await response.text(),
        report: mockReport(reportType, payload.profile),
      },
      { status: 200 },
    );
  }

  const data = await response.json();
  const report =
    data.output_text ??
    data.output?.flatMap((item: { content?: { text?: string }[] }) =>
      item.content?.map((content) => content.text ?? ""),
    )?.join("\n") ??
    mockReport(reportType, payload.profile);

  return NextResponse.json({ mode: "openai", report });
}
