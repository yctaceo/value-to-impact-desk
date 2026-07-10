import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Value-to-Impact Desk | 검증 가능한 임팩트 프로필과 성과 추적",
  description:
    "사회적기업·비영리·BAM 프로젝트의 활동과 증빙을 검증 가능한 Impact Profile로 연결하고, 후원자·투자자·기업이 지원 이후의 변화를 추적하도록 돕습니다.",
  openGraph: {
    title: "Value-to-Impact Desk | 검증 가능한 임팩트 프로필과 성과 추적",
    description:
      "사회적 프로젝트의 활동과 증빙을 Impact Profile로 구조화하고 지원 이후의 변화를 추적합니다.",
    locale: "ko_KR",
    type: "website",
    siteName: "Value-to-Impact Desk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
