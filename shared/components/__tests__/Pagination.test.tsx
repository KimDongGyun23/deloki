import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Pagination } from "../Pagination";

let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
}));

vi.mock("../Icons", () => ({
  ChevronIcon: ({ className }: { className?: string }) => (
    <svg data-testid="chevron-icon" className={className} />
  ),
}));

describe("Pagination", () => {
  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
  });

  describe("렌더링 조건", () => {
    it("totalPages가 1이면 렌더링하지 않는다", () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={1} basePath="/notes" />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("totalPages가 2 이상이면 nav를 렌더링한다", () => {
      render(<Pagination currentPage={1} totalPages={5} basePath="/notes" />);

      expect(
        screen.getByRole("navigation", { name: "페이지네이션" }),
      ).toBeInTheDocument();
    });
  });

  describe("페이지 번호 링크", () => {
    it("페이지 번호 링크의 href는 basePath/page 형태다", () => {
      render(<Pagination currentPage={1} totalPages={3} basePath="/notes" />);

      // totalPages=3이면 모두 표시됨
      expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
        "href",
        "/notes/2",
      );
      expect(screen.getByRole("link", { name: "3" })).toHaveAttribute(
        "href",
        "/notes/3",
      );
    });

    it("searchParams가 있으면 href에 query string을 유지한다", () => {
      mockSearchParams = new URLSearchParams("category=frontend&sort=newest");
      render(<Pagination currentPage={1} totalPages={3} basePath="/notes" />);

      const link = screen.getByRole("link", { name: "2" });
      expect(link.getAttribute("href")).toContain("category=frontend");
      expect(link.getAttribute("href")).toContain("sort=newest");
    });

    it("현재 페이지 링크는 aria-current=page를 가진다", () => {
      render(<Pagination currentPage={2} totalPages={3} basePath="/notes" />);

      expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("현재 페이지가 아닌 링크는 aria-current가 없다", () => {
      render(<Pagination currentPage={2} totalPages={3} basePath="/notes" />);

      expect(screen.getByRole("link", { name: "1" })).not.toHaveAttribute(
        "aria-current",
      );
    });
  });

  describe("이전/다음 버튼", () => {
    it("currentPage=1이면 이전 버튼이 비활성화 button으로 렌더링된다", () => {
      render(
        <Pagination currentPage={1} totalPages={5} basePath="/notes" />,
      );

      // 활성 링크 없이 disabled button으로 렌더링
      expect(
        screen.queryByRole("link", { name: "이전 페이지" }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "이전 페이지 (비활성화)" }),
      ).toBeDisabled();
    });

    it("currentPage < totalPages이면 다음 버튼이 활성 링크로 렌더링된다", () => {
      render(<Pagination currentPage={1} totalPages={5} basePath="/notes" />);

      expect(
        screen.getByRole("link", { name: "다음 페이지" }),
      ).toBeInTheDocument();
    });

    it("다음 페이지 링크 href는 currentPage+1이다", () => {
      render(<Pagination currentPage={2} totalPages={5} basePath="/notes" />);

      expect(screen.getByRole("link", { name: "다음 페이지" })).toHaveAttribute(
        "href",
        "/notes/3",
      );
    });

    it("currentPage=totalPages이면 다음 버튼이 비활성화 button으로 렌더링된다", () => {
      render(<Pagination currentPage={5} totalPages={5} basePath="/notes" />);

      expect(
        screen.queryByRole("link", { name: "다음 페이지" }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "다음 페이지 (비활성화)" }),
      ).toBeDisabled();
    });
  });

  describe("ellipsis", () => {
    it("페이지가 많으면 ellipsis(...)가 렌더링된다", () => {
      render(<Pagination currentPage={5} totalPages={10} basePath="/notes" />);

      const ellipses = screen.getAllByText("...");
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it("totalPages<=5이면 ellipsis가 없다", () => {
      render(<Pagination currentPage={3} totalPages={5} basePath="/notes" />);

      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });
  });
});
