import type { Metadata } from "next";
import "@/assets/scss/globals.scss";
import { localFonts } from "@/styles/font";

export const metadata: Metadata = {
  title: "Trip Weaver",
  description: "여행 코스 추천 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={localFonts.className}>
      <body>{children}</body>
    </html>
  );
}
