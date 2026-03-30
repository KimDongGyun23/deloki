import { ReactNode } from "react";

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";

import { Sidebar } from "@/components/Sidebar/Sidebar";
import { THEME_COOKIE_KEY, THEME_DARK, THEME_LIGHT } from "@/constants/theme";

import "../styles/index.css";

const esamanru = localFont({
  src: [
    {
      path: "../public/fonts/esamanru-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/esamanru-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/esamanru-Bold.ttf",
      weight: "700",
      style: "normal",
    },
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

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const theme = (await cookies()).get(THEME_COOKIE_KEY)?.value ?? THEME_LIGHT;
  const isDarkMode = theme === THEME_DARK;

  return (
    <html
      lang="ko"
      data-theme={theme}
      className={`${esamanru.variable} ${memoment.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground flex h-screen flex-col overflow-hidden font-sans antialiased">
        <div className="flex h-full overflow-hidden">
          <Sidebar isDarkMode={isDarkMode} />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
