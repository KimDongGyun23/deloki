import { notFound } from "next/navigation";

import { NoteCardList } from "@/features/note/components/NoteCardList";
import { getNotes } from "@/features/note/lib/getNotes";
import { CategoryFilter } from "@/shared/components/CategoryFilter";
import { PageHeader } from "@/shared/components/PageHeader";
import { Pagination } from "@/shared/components/Pagination";
import { SortSelect } from "@/shared/components/SortSelect";
import {
  CATEGORIES,
  isCategory,
  isCategorySortValue,
  SORT_OPTIONS,
} from "@/shared/constants/category";

type NotesPageProps = {
  params: Promise<{ page: string }>;
  searchParams: Promise<{
    category?: string | string[];
    sort?: string | string[];
  }>;
};

/**
 * 노트 목록 동적 페이지
 *
 * - path param `[page]`: 현재 페이지 번호
 * - searchParams: 카테고리 필터, 정렬 옵션 유지
 * - 데이터 조회는 getNotes에 위임 (DB 전환 시 getNotes만 수정)
 * - 유효하지 않은 page는 404 처리
 */
export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  const { page: pageParam } = await params;
  const { category, sort } = await searchParams;

  // 페이지 번호는 순수 정수 문자열("1", "123" 등)만 허용
  if (!/^\d+$/.test(pageParam)) notFound();

  // 페이지 번호가 1 미만이면 404
  const currentPage = Number(pageParam);
  if (currentPage < 1) notFound();

  // 배열로 전달된 경우 첫 번째 값만 사용
  const rawCategory = Array.isArray(category) ? category[0] : category;
  const selectedCategory = isCategory(rawCategory)
    ? rawCategory
    : CATEGORIES[0].value;

  // 배열로 전달된 경우 첫 번째 값만 사용
  const rawSort = Array.isArray(sort) ? sort[0] : sort;
  const selectedSort = isCategorySortValue(rawSort)
    ? rawSort
    : SORT_OPTIONS[0].value;

  // DB에서 노트 목록과 전체 페이지 수 조회
  const { notes, totalPages } = await getNotes({
    category: selectedCategory,
    sort: selectedSort,
    page: currentPage,
  });

  if (currentPage > totalPages) notFound();

  return (
    <>
      <PageHeader className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <PageHeader.Title>Notes</PageHeader.Title>
          <PageHeader.NewButton href="/notes/new">
            + New Note
          </PageHeader.NewButton>
        </div>

        <div className="flex items-center justify-between gap-4">
          <CategoryFilter selected={selectedCategory} />
          <SortSelect selected={selectedSort} />
        </div>
      </PageHeader>

      <div className="flex flex-1 flex-col p-6">
        <NoteCardList notes={notes} />
        <div className="mt-auto pt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/notes"
          />
        </div>
      </div>
    </>
  );
}
