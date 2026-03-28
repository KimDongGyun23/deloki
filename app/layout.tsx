import { ReactNode } from "react";

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";

import { Sidebar } from "@/components/Sidebar/Sidebar";
import { THEME_COOKIE_KEY, THEME_DARK, THEME_LIGHT } from "@/constants/theme";
import { EmotionRegistry } from "@/providers/EmotionRegistry";
import { GlobalStyles } from "@/styles/GlobalStyles";

import "./globals.css";

const esamanru = localFont({
  src: [
    { path: "../public/fonts/esamanru-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/esamanru-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/esamanru-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-esamanru",
});

const memoment = localFont({
  src: "../public/fonts/MemomentKkukkukk.ttf",
  variable: "--font-memoment",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deloki",
  description: "Deloki",
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  // 쿠키에서 테마 읽기
  const theme = (await cookies()).get(THEME_COOKIE_KEY)?.value ?? THEME_LIGHT;
  const isDarkMode = theme === THEME_DARK;

  return (
    <html
      lang="ko"
      data-theme={theme}
      className={`${esamanru.variable} ${memoment.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <EmotionRegistry>
          <GlobalStyles />
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar isDarkMode={isDarkMode} />
            <main style={{ flex: 1 }}>{children}</main>
          </div>
        </EmotionRegistry>
      </body>
    </html>
  );
}
