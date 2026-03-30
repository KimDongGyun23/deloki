import type { CategorySortValue } from "@/shared/constants/category";
import type { NoteListItem } from "@/shared/types/note";

/**
 * 노트 정렬 함수
 * - "alphabetical": 제목 가나다 순
 * - "oldest": 생성일 오래된 순
 * - "newest": 생성일 최신 순 (기본)
 *
 * @param notes 정렬할 노트 배열
 * @param sort 정렬 기준
 * @returns 정렬된 노트 배열
 */
export const sortNotes = (
  notes: NoteListItem[],
  sort: CategorySortValue,
): NoteListItem[] => {
  return [...notes].sort((a, b) => {
    if (sort === "alphabetical") return a.title.localeCompare(b.title, "ko");
    if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
    return b.createdAt.localeCompare(a.createdAt);
  });
};
