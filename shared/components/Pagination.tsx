"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/shared/lib/cn";

import { buildPageRange } from "../lib/buildPageRange";
import { ChevronIcon } from "./Icons";

type PreviousPageButtonProps = {
  currentPage: number;
  buildHref: (page: number) => string;
};

/**
 * 이전 페이지 버튼 컴포넌트
 * - currentPage가 1보다 크면 활성화된 링크로 렌더링, 그렇지 않으면 비활성화된 상태로 렌더링
 *
 * @param currentPage 현재 페이지 번호
 * @param buildHref 페이지 번호를 받아 해당 페이지로 이동하는 URL을 반환하는 함수
 */
const PreviousPageButton = ({
  currentPage,
  buildHref,
}: PreviousPageButtonProps) => {
  if (currentPage > 1) {
    return (
      <Link
        href={buildHref(currentPage - 1)}
        aria-label="이전 페이지"
        className="hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
      >
        <ChevronIcon size={12} className="text-foreground rotate-90" />
      </Link>
    );
  }

  return (
    <span
      aria-disabled="true"
      className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg"
    >
      <ChevronIcon size={12} className="text-muted-foreground rotate-90" />
    </span>
  );
};

type NextPageButtonProps = {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

/**
 * 다음 페이지 버튼 컴포넌트
 * - currentPage가 totalPages보다 작으면 활성화된 링크로 렌더링, 그렇지 않으면 비활성화된 상태로 렌더링
 *
 * @param currentPage 현재 페이지 번호
 * @param totalPages 전체 페이지 수
 * @param buildHref 페이지 번호를 받아 해당 페이지로 이동하는 URL을 반환하는 함수
 */
const NextPageButton = ({
  currentPage,
  totalPages,
  buildHref,
}: NextPageButtonProps) => {
  if (currentPage < totalPages) {
    return (
      <Link
        href={buildHref(currentPage + 1)}
        aria-label="다음 페이지"
        className="hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
      >
        <ChevronIcon size={12} className="text-foreground -rotate-90" />
      </Link>
    );
  }

  return (
    <span
      aria-disabled="true"
      className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg"
    >
      <ChevronIcon size={12} className="text-muted-foreground -rotate-90" />
    </span>
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
  buildHref: (page: number) => string;
  isActive: boolean;
};

/**
 * 페이지 번호 버튼 컴포넌트
 * - item이 currentPage와 같으면 활성화된 스타일로 렌더링, 그렇지 않으면 일반 스타일로 렌더링
 *
 * @param item 페이지 번호
 * @param buildHref 페이지 번호를 받아 해당 페이지로 이동하는 URL을 반환하는 함수
 * @param isActive 현재 페이지인지 여부
 */
const PageNumber = ({ item, buildHref, isActive }: PageNumberProps) => {
  return (
    <Link
      href={buildHref(item)}
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

  /**
   * 특정 페이지로의 링크 URL 생성
   * - 현재 searchParams(category, sort)를 유지
   */
  const buildHref = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    const query = params.toString();
    return query ? `${basePath}/${page}?${query}` : `${basePath}/${page}`;
  };

  const pageRange = buildPageRange(currentPage, totalPages);

  return (
    <nav
      aria-label="페이지네이션"
      className="font-display flex items-center justify-center gap-1"
    >
      <PreviousPageButton currentPage={currentPage} buildHref={buildHref} />

      {pageRange.map((item, idx) => {
        if (item === "...") {
          return <Ellipsis key={`ellipsis-${idx}`} />;
        }

        const isActive = item === currentPage;

        return (
          <PageNumber
            key={item}
            item={item}
            buildHref={buildHref}
            isActive={isActive}
          />
        );
      })}

      <NextPageButton
        currentPage={currentPage}
        totalPages={totalPages}
        buildHref={buildHref}
      />
    </nav>
  );
};
