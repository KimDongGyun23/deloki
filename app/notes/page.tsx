import { CategoryFilter } from "@/components/CategoryFilter";
import { PageHeader } from "@/components/PageHeader";
import { SortSelect } from "@/components/SortSelect";
import {
  CATEGORIES,
  isCategory,
  isCategorySortValue,
  SORT_OPTIONS,
} from "@/constants/category";

type NotesPageProps = {
  searchParams: Promise<{ category?: string; sort?: string }>;
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const { category, sort } = await searchParams;

  // 유효하지 않은 값은 기본값으로 폴백
  const selectedSort = isCategorySortValue(sort) ? sort : SORT_OPTIONS[0].value;
  const selectedCategory = isCategory(category)
    ? category
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
