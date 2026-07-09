import { NextResponse } from "next/server";
import type { ImpactProfile } from "@/lib/types";

type ReportRequest = {
  reportType?: string;
  profile?: ImpactProfile;
};

function mockReport(reportType: string, profile?: ImpactProfile) {
  const name = profile?.nameEn ?? "Sample Organization";
  const level = profile?.verificationLevel ?? 1;
  const highlights = profile?.impactHighlights?.join("; ") ?? "Impact data pending";
  const sourceFields = [
    "missionKo",
    "socialProblem",
    "employmentTotal",
    "currentNeeds",
    "evidence",
    "monthlyUpdates",
  ].join(", ");

  return `${reportType}

Organization: ${name}
Verification: Level ${level} - AI does not verify claims.
Source fields: ${sourceFields}

Executive Summary
${profile?.oneLine ?? "This organization needs a structured intake before review."}

Impact Evidence
- ${highlights}
- Evidence status must be reviewed by Admin/Reviewer before any verified language is used.

Current Opportunity
${profile?.currentNeeds?.[0]?.label ?? "Request to be defined"}

Due Diligence Notes
- This draft is generated from submitted or public-source fields.
- Not an investment recommendation, donation solicitation, or brokerage offer.
- Field verification and financial review remain pending unless explicitly marked by an authorized reviewer.`;
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
        "You create donor, investor, and CSR impact report drafts. You must not verify claims. Always mention verification level and source fields. Avoid investment recommendations or donation pressure.",
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
