"use client";

import { css, Global } from "@emotion/react";

import { colors, typography } from "./theme";

/**
 * camelCase -> kebab-case
 */
const toKebab = (str: string) => {
  const kebab = str.replace(/([A-Z])/g, "-$1").toLowerCase();
  return kebab;
};

/**
 * colors.light/dark 객체 -> CSS 변수 문자열 생성
 *
 * @param colorMap colors.light 또는 colors.dark 객체
 * @returns CSS 변수 문자열 (예: "--color-primary: #0070f3;")
 */
const toCssVars = (colorMap: Record<string, string>) => {
  const cssVars = Object.entries(colorMap)
    .map(([key, value]) => `  --color-${toKebab(key)}: ${value};`)
    .join("\n");

  return cssVars;
};

/**
 * 글로벌 스타일 컴포넌트
 */
const globalStyles = css`
  :root {
    // Light Mode - theme.ts colors.light에서 자동 생성
    ${toCssVars(colors.light)}
  }

  /* 시스템 설정 기반 다크모드 (data-theme 미설정 시 fallback) */
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      ${toCssVars(colors.dark)}
    }
  }

  /* 토글로 명시 설정된 다크모드 */
  [data-theme="dark"] {
    ${toCssVars(colors.dark)}
  }

  body {
    font-family: ${typography.fontFamily.sans};
    font-size: ${typography.fontSize.base};
    line-height: ${typography.lineHeight.normal};
    color: var(--color-foreground);
    background-color: var(--color-background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code,
  pre {
    font-family: ${typography.fontFamily.mono};
  }

  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  img,
  video {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
  }

  input,
  textarea,
  select {
    font: inherit;
  }
`;

export const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};
