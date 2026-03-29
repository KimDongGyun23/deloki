import { PropsWithChildren, ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/lib/cn";

/**
 * 페이지 제목 (h1)
 */
const Title = ({ children }: PropsWithChildren) => {
  return <h1 className="text-foreground text-2xl font-bold">{children}</h1>;
};

type NewButtonProps = {
  href: string;
  children: ReactNode;
};

/**
 * 새 항목 생성 링크 버튼
 * - href: 이동할 경로
 * - children: 버튼 내부 문구
 */
const NewButton = ({ href, children }: NewButtonProps) => {
  return (
    <Link
      href={href}
      className="bg-primary hover:bg-primary/90 font-display rounded-xl px-3 py-1.5 text-sm font-medium text-white transition-colors duration-150"
    >
      {children}
    </Link>
  );
};

type PageHeaderRootProps = PropsWithChildren<{ className?: string }>;

/**
 * 페이지 헤더 루트 컴포넌트
 * - className: 추가 스타일 (기본 스타일에 병합됨)
 */
const PageHeaderRoot = ({ children, className }: PageHeaderRootProps) => {
  return (
    <header
      className={cn("border-secondary bg-card border-b px-6 py-4", className)}
    >
      {children}
    </header>
  );
};

/**
 * 페이지 헤더 컴포넌트
 * - Title: 페이지 제목 (h1)
 * - NewButton: 새 항목 생성 링크 버튼 (href, children 수신)
 */
export const PageHeader = Object.assign(PageHeaderRoot, {
  Title,
  NewButton,
});
