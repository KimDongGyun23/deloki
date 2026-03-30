import { CATEGORIES, type Category } from "@/shared/constants/category";

export type NoteCategory = Exclude<Category, "all">;

/**
 * 노트 생성/수정 폼에서 사용하는 카테고리 목록
 */
export const NOTE_CATEGORIES = CATEGORIES.filter(
  (category) => category.value !== "all",
) as ReadonlyArray<{ readonly label: string; readonly value: NoteCategory }>;

/**
 * NOTE_CATEGORIES에서 value만 추출한 튜플 타입
 */
export const NOTE_CATEGORY_VALUES = NOTE_CATEGORIES.map(
  (category) => category.value,
) as [NoteCategory, ...NoteCategory[]];

// 노트 폼에서 사용하는 필드 이름 상수
export const MIN_TEXTAREA_ROWS = 3;
