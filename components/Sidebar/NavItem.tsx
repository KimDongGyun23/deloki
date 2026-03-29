"use client";

import { ElementType, SVGProps } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

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
  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-medium transition-[background-color,color] duration-150 ease-in",
        isActive
          ? "bg-primary text-card hover:bg-primary-dark"
          : "bg-transparent text-foreground hover:bg-muted",
      )}
    >
      <Icon width={18} height={18} />
      {label}
    </Link>
  );
};
