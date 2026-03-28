import { ReactNode } from "react";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { EmotionRegistry } from "@/providers/EmotionRegistry";
import { GlobalStyles } from "@/styles/GlobalStyles";

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
  title: "Deloki",
  description: "Deloki",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <EmotionRegistry>
          <GlobalStyles />
          {children}
        </EmotionRegistry>
      </body>
    </html>
  );
}
