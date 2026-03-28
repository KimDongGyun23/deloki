"use client";

import { ElementType } from "react";
import { SVGProps } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styled from "@emotion/styled";

import { borderRadius, spacing, typography } from "@/styles/theme";

type NavItemProps = {
  href: string;
  label: string;
  Icon: ElementType<SVGProps<SVGSVGElement>>;
};

/**
 * 네비게이션 아이템 컴포넌트
 * - 사이드바의 각 메뉴 항목을 나타냄
 * - 현재 경로와 비교하여 활성화 상태를 결정
 * - 아이콘과 레이블을 함께 표시
 *
 * @param href 이동할 경로
 * @param label 메뉴 레이블
 * @param Icon 메뉴 아이콘 컴포넌트
 */
export const NavItem = ({ href, label, Icon }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <StyledLink href={href} isActive={isActive}>
      <Icon width={18} height={18} />
      {label}
    </StyledLink>
  );
};

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.md};
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${({ isActive }) => (isActive ? "var(--color-card)" : "var(--color-foreground)")};
  background-color: ${({ isActive }) => (isActive ? "var(--color-primary)" : "transparent")};
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "var(--color-primary-dark)" : "var(--color-muted)"};
  }
`;
