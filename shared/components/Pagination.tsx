"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/shared/lib/cn";

import { buildPageRange } from "../lib/buildPageRange";
import { ChevronIcon } from "./Icons";

type PreviousPageButtonProps = {
  prevHref?: string;
};

/**
 * 이전 페이지 버튼 컴포넌트
 * - prevHref가 있으면 활성화된 링크로 렌더링, 없으면 비활성화된 상태로 렌더링
 *
 * @param prevHref 이전 페이지 URL (없으면 비활성화)
 */
const PreviousPageButton = ({ prevHref }: PreviousPageButtonProps) => {
  if (prevHref) {
    return (
      <Link
        href={prevHref}
        aria-label="이전 페이지"
        className="hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
      >
        <ChevronIcon size={12} className="text-foreground rotate-90" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled
      aria-label="이전 페이지 (비활성화)"
      className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg"
    >
      <ChevronIcon size={12} className="text-muted-foreground rotate-90" />
    </button>
  );
};

type NextPageButtonProps = {
  nextHref?: string;
};

/**
 * 다음 페이지 버튼 컴포넌트
 * - nextHref가 있으면 활성화된 링크로 렌더링, 없으면 비활성화된 상태로 렌더링
 *
 * @param nextHref 다음 페이지 URL (없으면 비활성화)
 */
const NextPageButton = ({ nextHref }: NextPageButtonProps) => {
  if (nextHref) {
    return (
      <Link
        href={nextHref}
        aria-label="다음 페이지"
        className="hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
      >
        <ChevronIcon size={12} className="text-foreground -rotate-90" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled
      aria-label="다음 페이지 (비활성화)"
      className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg"
    >
      <ChevronIcon size={12} className="text-muted-foreground -rotate-90" />
    </button>
  );
};

/**
 * 페이지네이션에서 페이지 번호 사이에 표시되는 생략 부호 컴포넌트
 */
const Ellipsis = () => {
  return (
    <span className="text-muted-foreground flex h-8 w-8 items-center justify-center text-sm">
      ...
    </span>
  );
};

type PageNumberProps = {
  item: number;
  pageHref: string;
  isActive: boolean;
};

/**
 * 페이지 번호 버튼 컴포넌트
 * - isActive이면 활성화된 스타일로 렌더링, 그렇지 않으면 일반 스타일로 렌더링
 *
 * @param item 페이지 번호
 * @param pageHref 해당 페이지 URL
 * @param isActive 현재 페이지인지 여부
 */
const PageNumber = ({ item, pageHref, isActive }: PageNumberProps) => {
  return (
    <Link
      href={pageHref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-white"
          : "text-foreground hover:bg-secondary",
      )}
    >
      {item}
    </Link>
  );
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

/**
 * 페이지네이션 공통 컴포넌트
 *
 * - path 파라미터 기반 페이지 이동 (`basePath/[page]`)
 * - searchParams(category, sort) 유지
 * - 표시 형태: < 1 2 3 ... 12 >
 */
export const Pagination = ({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) => {
  const searchParams = useSearchParams();
  if (totalPages <= 1) return null;

  const query = searchParams.toString();
  const hrefBuilder = (page: number) =>
    query ? `${basePath}/${page}?${query}` : `${basePath}/${page}`;

  const pageRange = buildPageRange(currentPage, totalPages);

  return (
    <nav
      aria-label="페이지네이션"
      className="font-display flex items-center justify-center gap-1"
    >
      <PreviousPageButton
        prevHref={currentPage > 1 ? hrefBuilder(currentPage - 1) : undefined}
      />

      {pageRange.map((item, idx) => {
        if (item === "...") {
          return <Ellipsis key={`ellipsis-${idx}`} />;
        }

        const isActive = item === currentPage;

        return (
          <PageNumber
            key={item}
            item={item}
            pageHref={hrefBuilder(item)}
            isActive={isActive}
          />
        );
      })}

      <NextPageButton
        nextHref={currentPage < totalPages ? hrefBuilder(currentPage + 1) : undefined}
      />
    </nav>
  );
};
