import { CategoryFilter } from "@/shared/components/CategoryFilter";
import { PageHeader } from "@/shared/components/PageHeader";
import { SortSelect } from "@/shared/components/SortSelect";
import {
  CATEGORIES,
  isCategory,
  isCategorySortValue,
  SORT_OPTIONS,
} from "@/shared/constants/category";

type NotesPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    sort?: string | string[];
  }>;
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const { category, sort } = await searchParams;

  // 배열로 전달된 경우 첫 번째 값만 사용
  const rawCategory = Array.isArray(category) ? category[0] : category;
  const rawSort = Array.isArray(sort) ? sort[0] : sort;

  // 유효하지 않은 값은 기본값으로 폴백
  const selectedSort = isCategorySortValue(rawSort)
    ? rawSort
    : SORT_OPTIONS[0].value;
  const selectedCategory = isCategory(rawCategory)
    ? rawCategory
    : CATEGORIES[0].value;

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
    </>
  );
}
