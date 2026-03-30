"use client";

import { useEffect, useId, useRef, useState } from "react";

import { ChevronIcon } from "@/shared/components/Icons";
import { cn } from "@/shared/lib/cn";

import { NOTE_CATEGORIES, type NoteCategory } from "../constants";

type CategoryButtonProps = {
  isOpen: boolean;
  selectedLabel: string | null;
  listboxId: string;
  onClickButton: () => void;
};

/**
 * 카테고리 선택 버튼
 * - 현재 선택된 카테고리 라벨과 드롭다운 열림 상태에 따라 스타일링
 * - 클릭 시 드롭다운 토글
 *
 * @param isOpen: 드롭다운 열림 상태
 * @param selectedLabel: 현재 선택된 카테고리 라벨 (없으면 null)
 * @param onClickButton: 버튼 클릭 시 호출되는 콜백
 */
const CategoryButton = ({
  isOpen,
  selectedLabel,
  listboxId,
  onClickButton,
}: CategoryButtonProps) => {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={listboxId}
      onClick={onClickButton}
      className="bg-muted focus:outline-primary flex w-full cursor-pointer items-center justify-between gap-1.5 rounded-xl px-3 py-2 text-sm focus:outline-2 focus:outline-offset-2"
    >
      <span
        className={selectedLabel ? "text-foreground" : "text-muted-foreground"}
      >
        {selectedLabel ?? "카테고리 선택"}
      </span>
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

type CategoryListProps = {
  value: NoteCategory | "";
  onOptionClick: (value: NoteCategory) => void;
  listboxId: string;
};

/**
 * 카테고리 옵션 리스트
 * - role="listbox"와 role="option"으로 접근성 지원
 * - 현재 선택된 옵션은 aria-selected로 표시
 * - 절대 위치로 드롭다운 표시
 *
 * @param value 현재 선택된 카테고리 값
 * @param onOptionClick 옵션 클릭 시 호출되는 콜백
 */
const CategoryList = ({
  value,
  listboxId,
  onOptionClick,
}: CategoryListProps) => {
  return (
    <ul
      role="listbox"
      id={listboxId}
      className="bg-card border-secondary absolute right-0 left-0 z-10 mt-1 rounded-xl border shadow-md"
    >
      {NOTE_CATEGORIES.map(({ label, value: optValue }) => (
        <li key={optValue} role="presentation">
          <button
            type="button"
            role="option"
            aria-selected={optValue === value}
            onClick={() => onOptionClick(optValue)}
            className={cn(
              "text-foreground hover:bg-primary/10 w-full cursor-pointer px-3 py-1.5 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl focus-visible:outline-none",
              optValue === value && "text-primary font-medium",
            )}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};

type CategorySelectProps = {
  value: NoteCategory | "";
  onChange: (value: NoteCategory) => void;
};

/**
 * 노트 카테고리 선택 드롭다운 컴포넌트
 *
 * - 선택된 카테고리 값과 변경 핸들러를 props로 받음
 * - 내부적으로 드롭다운 열림 상태 관리
 * - 외부 클릭과 Escape 키로 드롭다운 닫힘 처리
 *
 * @param value: 현재 선택된 카테고리 값
 * @param onChange: 카테고리 변경 핸들러
 */
export const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 카테고리의 라벨을 찾아서 표시 (없으면 null)
  const selectedLabel =
    NOTE_CATEGORIES.find((category) => category.value === value)?.label ?? null;

  /**
   * 옵션 클릭 핸들러
   * - 선택된 카테고리 값 변경, 드롭다운 닫기
   *
   * @param optValue 클릭된 옵션의 카테고리 값
   */
  const handleOptionClick = (optValue: NoteCategory) => {
    onChange(optValue);
    setIsOpen(false);
  };

  // 드롭다운 외부 클릭 시 닫기 처리
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container || container.contains(e.target as Node)) return;

      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape") setIsOpen(false);
      }}
    >
      <CategoryButton
        isOpen={isOpen}
        selectedLabel={selectedLabel}
        listboxId={listboxId}
        onClickButton={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <CategoryList
          value={value}
          listboxId={listboxId}
          onOptionClick={handleOptionClick}
        />
      )}
    </div>
  );
};
