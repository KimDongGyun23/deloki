import type { Category, CategorySortValue } from "@/shared/constants/category";
import { NOTES_PER_PAGE } from "@/shared/constants/pagination";
import type { NoteListItem } from "@/shared/types/note";

import { sortNotes } from "./sortNotes";

type PaginateNotesOptions = {
  notes: NoteListItem[];
  category: Category;
  sort: CategorySortValue;
  page: number;
};

type PaginateNotesResult = {
  paginated: NoteListItem[];
  totalPages: number;
};

/**
 * 노트 목록 필터링, 정렬, 페이지네이션 유틸
 * - category가 "all"이면 전체, 아니면 해당 카테고리만 필터링
 * - sortNotes로 정렬 후 page 기준으로 슬라이싱
 * - totalPages는 최소 1 보장
 *
 * @param options.notes 전체 노트 배열
 * @param options.category 선택된 카테고리
 * @param options.sort 정렬 기준
 * @param options.page 현재 페이지 번호 (1-based)
 * @returns 페이지에 해당하는 노트 배열과 전체 페이지 수
 */
export const paginateNotes = ({
  notes,
  category,
  sort,
  page,
}: PaginateNotesOptions): PaginateNotesResult => {
  // category가 "all"이면 전체 노트, 아니면 해당 카테고리만 필터링
  const filtered =
    category === "all"
      ? notes
      : notes.filter((note) => note.category === category);

  const sorted = sortNotes(filtered, sort);
  const totalPages = Math.max(1, Math.ceil(sorted.length / NOTES_PER_PAGE));

  const startIndex = (page - 1) * NOTES_PER_PAGE;
  const paginated = sorted.slice(startIndex, startIndex + NOTES_PER_PAGE);

  return { paginated, totalPages };
};
