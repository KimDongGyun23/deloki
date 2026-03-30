import { MAX_VISIBLE_PAGES } from "../constants/pagination";

/**
 * 페이지 번호 범위 계산 유틸
 * - currentPage 주변 ±2 범위를 기준으로 표시할 페이지 목록 반환
 * - 항상 첫/마지막 페이지 포함, 필요 시 ellipsis("...") 삽입
 *
 * @param currentPage 현재 페이지
 * @param totalPages 전체 페이지
 * @returns (number | "...")[] 형태의 페이지 목록
 */
export const buildPageRange = (
  currentPage: number,
  totalPages: number,
): (number | "...")[] => {
  // totalPages가 MAX_VISIBLE_PAGES 이하인 경우 1~totalPages까지 모두 표시
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const delta = 1;
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

  const pages: (number | "...")[] = [1];

  // rangeStart가 2보다 크면 1과 rangeStart 사이에 페이지가 존재
  // ellipsis 추가
  if (rangeStart > 2) pages.push("...");
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  // rangeEnd가 totalPages - 1보다 작으면 totalPages - 1과 totalPages 사이에 페이지가 존재
  // ellipsis 추가
  if (rangeEnd < totalPages - 1) pages.push("...");
  pages.push(totalPages);

  return pages;
};
