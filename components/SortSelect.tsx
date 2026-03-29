"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { CategorySortValue } from "@/constants/category";
import { SORT_OPTIONS } from "@/constants/category";
import { cn } from "@/lib/cn";

import { ChevronIcon } from "./Icons";

type SortTriggerButtonProps = {
  isOpen: boolean;
  selectedLabel: string;
  handleOpen: () => void;
};

/**
 * 정렬 옵션 드롭다운을 여는 트리거 버튼 컴포넌트
 *
 * @param isOpen 드롭다운 열림 상태 (아이콘 회전 제어)
 * @param selectedLabel 현재 선택된 정렬 옵션의 라벨 (버튼 텍스트)
 * @param handleOpen 버튼 클릭 시 드롭다운 열기/닫기 핸들러
 */
const SortTriggerButton = ({
  isOpen,
  selectedLabel,
  handleOpen,
}: SortTriggerButtonProps) => {
  return (
    <button
      type="button"
      onClick={handleOpen}
      className="bg-secondary text-foreground focus:outline-primary flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 text-sm focus:outline-2 focus:outline-offset-2"
    >
      {selectedLabel}
      <ChevronIcon
        width={12}
        height={12}
        className={cn(
          "text-muted-foreground transition-transform duration-200",
          isOpen ? "rotate-180" : "rotate-0",
        )}
      />
    </button>
  );
};

type SortOptionsProps = {
  isOpen: boolean;
  selected: CategorySortValue;
  handleSelect: (value: CategorySortValue) => void;
};

/**
 * 정렬 옵션 드롭다운 컴포넌트
 *
 * @param isOpen 드롭다운 열림 상태
 * @param selected 현재 선택된 정렬 옵션 값
 * @param handleSelect 옵션 선택 핸들러
 */
const SortOptions = ({ isOpen, selected, handleSelect }: SortOptionsProps) => {
  if (!isOpen) return null;

  return (
    <ul className="bg-secondary absolute right-0 z-10 mt-1 min-w-full rounded-md shadow-md">
      {SORT_OPTIONS.map(({ label, value }) => (
        <li key={value}>
          <button
            type="button"
            onClick={() => handleSelect(value)}
            className={`text-foreground hover:bg-primary/10 focus-visible:ring-primary/30 w-full cursor-pointer px-3 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset ${
              value === selected ? "text-primary font-medium" : ""
            }`}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};

type SortSelectProps = {
  selected: CategorySortValue;
};

/**
 * 정렬 셀렉트 컴포넌트
 * - 선택 상태는 URL searchParams(sort)로 관리
 * - 변경 시 router.push로 URL 업데이트 -> 페이지 서버 재렌더링
 */
export const SortSelect = ({ selected }: SortSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 옵션의 라벨 (value -> label 매핑)
  const selectedLabel =
    SORT_OPTIONS.find((opt) => opt.value === selected)?.label ??
    SORT_OPTIONS[0].label;

  /**
   * 정렬 옵션 선택 핸들러
   * - URL searchParams(sort) 업데이트 -> 페이지 서버 재렌더링
   *
   * @param value 선택된 정렬 옵션 값 (CategorySortValue)
   */
  const handleSelect = (value: CategorySortValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  /**
   * 외부 클릭 시 드롭다운 닫기
   */
  useEffect(() => {
    /**
     * 컨테이너 외부 클릭 감지 핸들러
     */
    const handleClickOutside = (e: MouseEvent) => {
      const container = containerRef.current;
      const isOutside = container && !container.contains(e.target as Node);
      if (isOutside) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="font-display flex items-center gap-2">
      <span className="text-muted-foreground text-md">정렬:</span>
      <div ref={containerRef} className="relative">
        <SortTriggerButton
          isOpen={isOpen}
          selectedLabel={selectedLabel}
          handleOpen={() => setIsOpen((prev) => !prev)}
        />
        <SortOptions
          isOpen={isOpen}
          selected={selected}
          handleSelect={handleSelect}
        />
      </div>
    </div>
  );
};
