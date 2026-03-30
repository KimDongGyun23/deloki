import { PropsWithChildren } from "react";

import { CloseIcon } from "@/components/Icons";
import { cn } from "@/lib/cn";

type ClassNameProps = {
  className?: string;
};

/**
 * 섹션 카드 공통 래퍼
 */
export const SectionCard = ({
  children,
  className,
}: PropsWithChildren<ClassNameProps>) => (
  <section
    className={cn("bg-card border-secondary rounded-2xl border p-6", className)}
  >
    {children}
  </section>
);

/**
 * 섹션 헤더 타이틀 (h2)
 */
export const SectionTitle = ({ children }: PropsWithChildren) => (
  <h2 className="text-foreground mb-4 text-lg font-bold">{children}</h2>
);

/**
 * 항목 추가 버튼
 */
export const AddButton = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) => (
  <button
    type="button"
    onClick={onClick}
    className="text-muted-foreground font-display hover:text-primary mt-3 text-sm transition-colors duration-150"
  >
    {children}
  </button>
);

type RemoveButtonProps = {
  onClick: () => void;
  label: string;
  size?: number;
};

/**
 * 항목 제거 버튼 (✕)
 */
export const RemoveButton = ({ onClick, label, size }: RemoveButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="text-muted-foreground hover:text-destructive shrink-0 transition-colors duration-150"
  >
    <CloseIcon size={size || 14} />
  </button>
);

/**
 * 필드 레이블 (uppercase 소형 텍스트)
 */
export const FieldLabel = ({
  children,
  className,
}: PropsWithChildren<ClassNameProps>) => (
  <span
    className={cn(
      "text-muted-foreground text-xs font-semibold tracking-wider uppercase",
      className,
    )}
  >
    {children}
  </span>
);

/** 공통 인풋 클래스 */
export const inputCls =
  "w-full rounded-xl bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none";
