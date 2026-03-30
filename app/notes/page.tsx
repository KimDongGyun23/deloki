import { redirect } from "next/navigation";

type NotesIndexPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    sort?: string | string[];
  }>;
};

/**
 * /notes 기본 경로 → /notes/1 로 리다이렉트
 *
 * - 페이지네이션은 path param([page]) 기반으로 동작
 * - searchParams(category, sort)는 없으면 [page] 페이지에서 기본값으로 처리
 */
export default async function NotesIndexPage({
  searchParams,
}: NotesIndexPageProps) {
  const params = await searchParams;
  const normalizedParams = {
    category: Array.isArray(params.category)
      ? params.category[0]
      : params.category,
    sort: Array.isArray(params.sort) ? params.sort[0] : params.sort,
  };

  // searchParams에서 undefined인 값은 쿼리에서 제외
  const queryString = new URLSearchParams(
    Object.entries(normalizedParams).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  ).toString();

  redirect(queryString ? `/notes/1?${queryString}` : "/notes/1");
}
