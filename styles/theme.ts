/**
 * 컬러 팔레트
 */
export const colors = {
  light: {
    primary: "#4f645b",
    primaryLight: "#d1e8dd",
    primaryDark: "#43574f",
    secondary: "#e4e9e8",
    muted: "#f1f4f3",
    accent: "#acb3b2",
    destructive: "#d4183d",
    card: "#ffffff",
    background: "#ffffff",
    foreground: "#171717",
    mutedForeground: "#6b7280",
  },
  dark: {
    primary: "#5a6b63",
    primaryLight: "#3d4742",
    primaryDark: "#7a8d85",
    secondary: "#2f3336",
    muted: "#2f3336",
    accent: "#3d4742",
    destructive: "#d4183d",
    card: "#25282b",
    background: "#1a1d1f",
    foreground: "#e8eaed",
    mutedForeground: "#9ca3af",
  },
} as const;

/**
 * 태그/배지 색상 (라이트/다크 공용 토큰)
 */
export const tagColors = {
  blue: {
    light: { bg: "#dbeafe", text: "#1e40af" },
    dark: { bg: "#1e3a8a", text: "#bfdbfe" },
  },
  green: {
    light: { bg: "#d1fae5", text: "#065f46" },
    dark: { bg: "#064e3b", text: "#a7f3d0" },
  },
  purple: {
    light: { bg: "#e9d5ff", text: "#6b21a8" },
    dark: { bg: "#581c87", text: "#e9d5ff" },
  },
  orange: {
    light: { bg: "#fed7aa", text: "#c2410c" },
    dark: { bg: "#9a3412", text: "#fed7aa" },
  },
  pink: {
    light: { bg: "#fce7f3", text: "#be185d" },
    dark: { bg: "#9f1239", text: "#fbcfe8" },
  },
  teal: {
    light: { bg: "#ccfbf1", text: "#115e59" },
    dark: { bg: "#134e4a", text: "#99f6e4" },
  },
  yellow: {
    light: { bg: "#fef3c7", text: "#92400e" },
    dark: { bg: "#78350f", text: "#fef3c7" },
  },
  red: {
    light: { bg: "#fee2e2", text: "#b91c1c" },
    dark: { bg: "#991b1b", text: "#fecaca" },
  },
  indigo: {
    light: { bg: "#e0e7ff", text: "#3730a3" },
    dark: { bg: "#312e81", text: "#c7d2fe" },
  },
  gray: {
    light: { bg: "#f3f4f6", text: "#374151" },
    dark: { bg: "#374151", text: "#e5e7eb" },
  },
} as const;

export type TagColor = keyof typeof tagColors;

/**
 * Spacing (4px 단위, 최대 48px)
 */
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
} as const;

/**
 * Border radius (4px 단위, 최대 16px)
 */
export const borderRadius = {
  none: "0px",
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px", // Max
} as const;

/**
 * Shadows
 */
export const shadows = {
  sm: "0 2px 4px -1px rgba(77, 98, 113, 0.06)",
  md: "0 4px 8px -2px rgba(77, 98, 113, 0.08)",
  lg: "0 12px 32px -4px rgba(77, 98, 113, 0.08)",
  xl: "0 20px 40px -8px rgba(77, 98, 113, 0.12)",
} as const;

/**
 * Typography
 */
export const typography = {
  fontFamily: {
    sans: 'var(--font-esamanru), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'var(--font-memoment), sans-serif',
    mono: 'var(--font-geist-mono), "Fira Code", monospace',
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

/**
 * Breakpoints
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Media Queries
 */
export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  "2xl": `@media (min-width: ${breakpoints["2xl"]})`,
} as const;

/**
 * Z-Index
 */
export const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
  tooltip: 600,
} as const;

/**
 * Theme (통합 export)
 */
export const theme = {
  colors,
  tagColors,
  spacing,
  borderRadius,
  shadows,
  typography,
  breakpoints,
  media,
  zIndex,
} as const;

export type Theme = typeof theme;
