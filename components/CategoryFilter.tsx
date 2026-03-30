"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CATEGORIES, Category } from "@/constants/category";
import { cn } from "@/lib/cn";

type CategoryFilterProps = {
  /** 현재 선택된 카테고리 — Page의 searchParams에서 주입 */
  selected: Category;
};

/**
 * 카테고리 탭 필터 컴포넌트
 *
 * - 선택 상태는 URL searchParams(category)로 관리
 * - 클릭 시 router.push로 URL 업데이트 → 페이지 서버 재렌더링
 */
export const CategoryFilter = ({ selected }: CategoryFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * 카테고리 클릭 핸들러
   * - URL searchParams(category) 업데이트 -> 페이지 서버 재렌더링
   *
   * @param category 선택된 카테고리 (Category)
   */
  const handleClick = (category: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      {CATEGORIES.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          aria-pressed={value === selected}
          onClick={() => handleClick(value)}
          className={cn(
            "font-display rounded-xl px-3 py-1 text-sm font-medium transition-[background-color,color] duration-150",
            value === selected
              ? "bg-primary text-white"
              : "bg-secondary text-foreground hover:bg-accent",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
