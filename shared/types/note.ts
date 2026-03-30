import type { Category } from "@/shared/constants/category";
import type { TagColor } from "@/shared/constants/tag-colors";

/**
 * 노트 목록에서 사용하는 태그 타입
 * - name: 태그 텍스트
 * - color: CSS 변수 기반 태그 색상
 */
export type NoteTag = {
  name: string;
  color: TagColor;
};

/**
 * 노트 목록 아이템 타입
 * - id: 고유 식별자
 * - title: 노트 제목
 * - category: 카테고리 (all 제외한 값)
 * - tags: 연관 태그 목록
 * - createdAt: 생성일 (YYYY.MM.DD)
 */
export type NoteListItem = {
  id: string;
  title: string;
  category: Exclude<Category, "all">;
  tags: NoteTag[];
  createdAt: string;
};
