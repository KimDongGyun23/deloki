import type { Category, CategorySortValue } from "@/shared/constants/category";
import notesData from "@/shared/mocks/notes.json";
import type { NoteListItem } from "@/shared/types/note";

import { paginateNotes } from "./paginateNotes";

type GetNotesParams = {
  category: Category;
  sort: CategorySortValue;
  page: number;
};

type GetNotesResult = {
  notes: NoteListItem[];
  totalPages: number;
};

/**
 * 노트 목록 조회
 * - 현재: mock JSON에서 필터링·정렬·페이지네이션 처리
 * - DB 전환 시 이 함수 내부만 교체하면 됨
 *   ex) supabase.from('notes').select(...).eq(...).order(...).range(...)
 *
 * @param params.category 카테고리 필터 ("all"이면 전체)
 * @param params.sort 정렬 기준
 * @param params.page 현재 페이지 번호 (1-based)
 * @returns 페이지에 해당하는 노트 목록과 전체 페이지 수
 */
export const getNotes = async ({
  category,
  sort,
  page,
}: GetNotesParams): Promise<GetNotesResult> => {
  const notes = notesData.notes as NoteListItem[];
  const { paginated, totalPages } = paginateNotes({ notes, category, sort, page });

  return { notes: paginated, totalPages };
};
