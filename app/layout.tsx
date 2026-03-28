import { ReactNode } from "react";

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className={`${esamanru.variable} ${memoment.variable} ${geistMono.variable}`}>
      <body>
        <EmotionRegistry>
          <GlobalStyles />
          {children}
        </EmotionRegistry>
      </body>
    </html>
  );
}
