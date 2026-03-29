import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SORT_OPTIONS } from "@/constants/category";

import { SortSelect } from "../SortSelect";

const mockPush = vi.fn();
const mockPathname = "/notes";
let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}));

vi.mock("../Icons", () => ({
  ChevronIcon: ({ className }: { className?: string }) => (
    <svg data-testid="chevron-icon" className={className} />
  ),
}));

describe("SortSelect", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSearchParams = new URLSearchParams();
  });

  describe("초기 렌더링", () => {
    it("선택된 정렬 옵션의 라벨을 트리거 버튼에 표시한다", () => {
      render(<SortSelect selected="newest" />);

      expect(
        screen.getByRole("button", { name: /최신순/ }),
      ).toBeInTheDocument();
    });

    it("드롭다운이 닫혀있으면 옵션 목록을 렌더링하지 않는다", () => {
      render(<SortSelect selected="newest" />);

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("유효하지 않은 selected값이면 첫 번째 옵션 라벨을 표시한다", () => {
      // @ts-expect-error 유효하지 않은 값 테스트
      render(<SortSelect selected="invalid" />);

      expect(screen.getByText(SORT_OPTIONS[0].label)).toBeInTheDocument();
    });
  });

  describe("드롭다운 열기/닫기", () => {
    it("트리거 버튼 클릭 시 드롭다운이 열린다", async () => {
      render(<SortSelect selected="newest" />);

      await userEvent.click(screen.getByRole("button", { name: /최신순/ }));

      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("드롭다운이 열리면 모든 정렬 옵션을 렌더링한다", async () => {
      render(<SortSelect selected="newest" />);

      await userEvent.click(screen.getByRole("button", { name: /최신순/ }));

      SORT_OPTIONS.forEach(({ label }) => {
        expect(
          screen.getAllByRole("button", { name: label }).length,
        ).toBeGreaterThanOrEqual(1);
      });
    });

    it("트리거 버튼 재클릭 시 드롭다운이 닫힌다", async () => {
      render(<SortSelect selected="newest" />);

      const trigger = screen.getByRole("button", { name: /최신순/ });
      await userEvent.click(trigger);
      await userEvent.click(trigger);

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("외부 클릭 시 드롭다운이 닫힌다", async () => {
      render(
        <div>
          <button>외부버튼</button>
          <SortSelect selected="newest" />
        </div>,
      );

      await userEvent.click(screen.getByRole("button", { name: /최신순/ }));
      expect(screen.getByRole("list")).toBeInTheDocument();

      await userEvent.click(screen.getByRole("button", { name: "외부버튼" }));
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("옵션 선택", () => {
    it("옵션 클릭 시 URL searchParams(sort)를 업데이트한다", async () => {
      render(<SortSelect selected="newest" />);

      await userEvent.click(screen.getByRole("button", { name: /최신순/ }));
      await userEvent.click(screen.getByRole("button", { name: "오래된순" }));

      expect(mockPush).toHaveBeenCalledWith("/notes?sort=oldest");
    });

    it("옵션 선택 후 드롭다운이 닫힌다", async () => {
      render(<SortSelect selected="newest" />);

      await userEvent.click(screen.getByRole("button", { name: /최신순/ }));
      await userEvent.click(screen.getByRole("button", { name: "가나다순" }));

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("기존 searchParams를 유지하며 sort만 업데이트한다", async () => {
      mockSearchParams = new URLSearchParams("category=frontend");
      render(<SortSelect selected="newest" />);

      await userEvent.click(screen.getByRole("button", { name: /최신순/ }));
      await userEvent.click(screen.getByRole("button", { name: "오래된순" }));

      expect(mockPush).toHaveBeenCalledWith(
        expect.stringContaining("sort=oldest"),
      );
      expect(mockPush).toHaveBeenCalledWith(
        expect.stringContaining("category=frontend"),
      );
    });
  });

  describe("ChevronIcon 회전", () => {
    it("드롭다운이 닫혀있으면 chevron이 rotate-0이다", () => {
      render(<SortSelect selected="newest" />);

      expect(screen.getByTestId("chevron-icon")).toHaveClass("rotate-0");
    });

    it("드롭다운이 열리면 chevron이 rotate-180이다", async () => {
      render(<SortSelect selected="newest" />);

      await userEvent.click(screen.getByRole("button", { name: /최신순/ }));

      expect(screen.getByTestId("chevron-icon")).toHaveClass("rotate-180");
    });
  });
});
