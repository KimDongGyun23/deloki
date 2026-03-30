"use client";

import { useLayoutEffect, useRef } from "react";

import { cn } from "@/shared/lib/cn";

import { MIN_TEXTAREA_ROWS } from "../constants";

type AutoResizeTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  className?: string;
};

/**
 * 자동 높이 조절 textarea 컴포넌트
 * - 최소 행 수(minRows)만 고정, 내용이 늘어나면 자동 확장
 * - useLayoutEffect로 깜빡임 없이 높이 업데이트
 * - overflow: hidden으로 스크롤바 방지
 *
 * @param value: textarea 내용
 * @param onChange: 내용 변경 시 호출되는 콜백
 * @param placeholder: 입력 안내 텍스트 (선택)
 * @param minRows: 최소 행 수 (기본값: 3)
 * @param className: 추가 CSS 클래스 (선택)
 */
export const AutoResizeTextarea = ({
  value,
  onChange,
  placeholder,
  minRows = MIN_TEXTAREA_ROWS,
  className,
}: AutoResizeTextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  // value 변경 시마다 높이 조절
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={minRows}
      className={cn(
        "text-foreground placeholder:text-muted-foreground w-full resize-none overflow-hidden text-sm focus:outline-none",
        className,
      )}
    />
  );
};
