import { redirect } from "next/navigation";

/**
 * /notes 기본 경로 → /notes/1 로 리다이렉트
 *
 * - 페이지네이션은 path param([page]) 기반으로 동작
 * - searchParams(category, sort)는 없으면 [page] 페이지에서 기본값으로 처리
 */
export default async function NotesIndexPage() {
  redirect("/notes/1");
}
