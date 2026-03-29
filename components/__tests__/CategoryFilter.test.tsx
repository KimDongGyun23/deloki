import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CATEGORIES } from "@/constants/category";

import { CategoryFilter } from "../CategoryFilter";

const mockPush = vi.fn();
const mockPathname = "/notes";
let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}));

describe("CategoryFilter", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSearchParams = new URLSearchParams();
  });

  it("모든 카테고리 버튼을 렌더링한다", () => {
    render(<CategoryFilter selected="all" />);

    CATEGORIES.forEach(({ label }) => {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });
  });

  it("선택된 카테고리 버튼은 활성 스타일을 가진다", () => {
    render(<CategoryFilter selected="frontend" />);

    const activeButton = screen.getByRole("button", { name: "프론트엔드" });
    expect(activeButton).toHaveClass("bg-primary");
  });

  it("선택되지 않은 카테고리 버튼은 비활성 스타일을 가진다", () => {
    render(<CategoryFilter selected="all" />);

    const inactiveButton = screen.getByRole("button", { name: "프론트엔드" });
    expect(inactiveButton).toHaveClass("bg-secondary");
    expect(inactiveButton).not.toHaveClass("bg-primary");
  });

  it("카테고리 클릭 시 URL searchParams를 업데이트한다", async () => {
    render(<CategoryFilter selected="all" />);

    await userEvent.click(screen.getByRole("button", { name: "백엔드" }));

    expect(mockPush).toHaveBeenCalledWith("/notes?category=backend");
  });

  it("기존 searchParams를 유지하며 category만 업데이트한다", async () => {
    mockSearchParams = new URLSearchParams("sort=newest");
    render(<CategoryFilter selected="all" />);

    await userEvent.click(screen.getByRole("button", { name: "CS" }));

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("category=cs"),
    );
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("sort=newest"),
    );
  });

  it("이미 선택된 카테고리를 다시 클릭해도 router.push를 호출한다", async () => {
    render(<CategoryFilter selected="frontend" />);

    await userEvent.click(screen.getByRole("button", { name: "프론트엔드" }));

    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
