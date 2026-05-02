import type { Metadata } from "next";
import "@/assets/scss/globals.scss";
import { localFonts } from "@/styles/font";

export const metadata: Metadata = {
  title: "Trip Weaver",
  description: "여행 코스 추천 서비스",
  icons: {
    icon: "favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={localFonts.className}>
      <body>
        <a href="#main-content" className="skip-nav">
          본문 바로가기
        </a>
        {children}
      </body>
    </html>
  );
}
