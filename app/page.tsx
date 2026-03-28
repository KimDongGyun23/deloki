/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import type { TagColor } from "@/styles/theme";
import { borderRadius, shadows, spacing, tagColors, typography } from "@/styles/theme";

// ─── Styled Components 방식 ───────────────────────────────────────────────────

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.xl} ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: var(--color-foreground);
`;

// ─── css prop 방식 ────────────────────────────────────────────────────────────

const colorCardStyle = css`
  padding: ${spacing.lg};
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  box-shadow: ${shadows.md};
`;

const colorGridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.md};
`;

const tagStyle = css`
  display: inline-flex;
  align-items: center;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
`;

const tagWrapStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`;

// CSS 변수 적용 확인용 카드
const COLOR_TOKENS = [
  { label: "Primary", bg: "var(--color-primary)", color: "#fff" },
  { label: "Primary Light", bg: "var(--color-primary-light)", color: "var(--color-primary-dark)" },
  { label: "Primary Dark", bg: "var(--color-primary-dark)", color: "#fff" },
  { label: "Secondary", bg: "var(--color-secondary)", color: "var(--color-foreground)" },
  { label: "Muted", bg: "var(--color-muted)", color: "var(--color-muted-foreground)" },
  { label: "Destructive", bg: "var(--color-destructive)", color: "#fff" },
] as const;

const TAG_COLORS: TagColor[] = [
  "blue",
  "green",
  "purple",
  "orange",
  "pink",
  "teal",
  "yellow",
  "red",
  "indigo",
  "gray",
];

export default function Home() {
  return (
    <Container>
      {/* CSS 변수 (라이트/다크 자동 전환) 확인 */}
      <Section>
        <SectionTitle>Colors (CSS Variables)</SectionTitle>
        <div css={colorGridStyle}>
          {COLOR_TOKENS.map(({ label, bg, color }) => (
            <div key={label} css={colorCardStyle} style={{ backgroundColor: bg, color }}>
              {label}
            </div>
          ))}
        </div>
      </Section>

      {/* emotion styled + theme 토큰 확인 */}
      <Section>
        <SectionTitle>Shadows</SectionTitle>
        <div css={colorGridStyle}>
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <div
              key={size}
              css={css`
                padding: ${spacing.lg};
                border-radius: ${borderRadius.md};
                box-shadow: ${shadows[size]};
                background: var(--color-card);
                color: var(--color-foreground);
                font-size: ${typography.fontSize.sm};
                text-align: center;
              `}
            >
              shadow-{size}
            </div>
          ))}
        </div>
      </Section>

      {/* tagColors 토큰 확인 */}
      <Section>
        <SectionTitle>Tag Colors</SectionTitle>
        <div css={tagWrapStyle}>
          {TAG_COLORS.map((color) => (
            <span
              key={color}
              css={tagStyle}
              style={{
                // prefers-color-scheme 감지 없이 light 값으로만 미리보기
                backgroundColor: tagColors[color].light.bg,
                color: tagColors[color].light.text,
              }}
            >
              {color}
            </span>
          ))}
        </div>
      </Section>
    </Container>
  );
}
