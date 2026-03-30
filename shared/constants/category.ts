/**
 * 카테고리 상수
 * - label: UI 표시용 한글
 * - value: URL/서버 통신용 영문 식별자
 */
export const CATEGORIES = [
  { label: "전체", value: "all" },
  { label: "프론트엔드", value: "frontend" },
  { label: "백엔드", value: "backend" },
  { label: "DevOps", value: "devops" },
  { label: "CS", value: "cs" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];

/**
 * 값이 유효한 카테고리인지 검사하는 타입 가드 함수
 */
export const isCategory = (value: unknown): value is Category => {
  return CATEGORIES.some((c) => c.value === value);
};

/**
 * 정렬 옵션 상수
 */
export const SORT_OPTIONS = [
  { label: "최신순", value: "newest" },
  { label: "오래된순", value: "oldest" },
  { label: "가나다순", value: "alphabetical" },
] as const;

export type CategorySortOption = (typeof SORT_OPTIONS)[number];
export type CategorySortValue = CategorySortOption["value"];

/**
 * 값이 유효한 정렬 옵션 값인지 검사하는 타입 가드 함수
 */
export const isCategorySortValue = (
  value: unknown,
): value is CategorySortValue => {
  return SORT_OPTIONS.some((option) => option.value === value);
};
