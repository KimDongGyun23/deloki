import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CategorySelect } from "../components/CategorySelect";
import { NOTE_CATEGORIES } from "../constants";

vi.mock("@/shared/components/Icons", () => ({
  ChevronIcon: ({ className }: { className?: string }) => (
    <svg data-testid="chevron-icon" className={className} />
  ),
}));

describe("CategorySelect", () => {
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  describe("초기 렌더링", () => {
    it("선택된 값이 없으면 '카테고리 선택' 플레이스홀더를 표시한다", () => {
      render(<CategorySelect value="" onChange={onChange} />);
      expect(screen.getByText("카테고리 선택")).toBeInTheDocument();
    });

    it("선택된 값이 있으면 해당 카테고리 라벨을 표시한다", () => {
      const frontend = NOTE_CATEGORIES.find((c) => c.value === "frontend")!;
      render(<CategorySelect value="frontend" onChange={onChange} />);
      expect(screen.getByText(frontend.label)).toBeInTheDocument();
    });

    it("드롭다운이 닫혀있으면 옵션 목록을 렌더링하지 않는다", () => {
      render(<CategorySelect value="" onChange={onChange} />);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("드롭다운 열기/닫기", () => {
    it("트리거 버튼 클릭 시 드롭다운이 열린다", async () => {
      render(<CategorySelect value="" onChange={onChange} />);

      await userEvent.click(screen.getByRole("button"));

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("드롭다운이 열리면 모든 카테고리 옵션을 렌더링한다", async () => {
      render(<CategorySelect value="" onChange={onChange} />);

      await userEvent.click(screen.getByRole("button"));

      NOTE_CATEGORIES.forEach(({ label }) => {
        expect(screen.getByRole("option", { name: label })).toBeInTheDocument();
      });
    });

    it("트리거 버튼 재클릭 시 드롭다운이 닫힌다", async () => {
      render(<CategorySelect value="" onChange={onChange} />);

      const trigger = screen.getByRole("button");
      await userEvent.click(trigger);
      await userEvent.click(trigger);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("외부 클릭 시 드롭다운이 닫힌다", async () => {
      render(
        <div>
          <button>외부버튼</button>
          <CategorySelect value="" onChange={onChange} />
        </div>,
      );

      await userEvent.click(screen.getByRole("button", { name: /카테고리/ }));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await userEvent.click(screen.getByRole("button", { name: "외부버튼" }));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("Escape 키 입력 시 드롭다운이 닫힌다", async () => {
      render(<CategorySelect value="" onChange={onChange} />);

      await userEvent.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await userEvent.keyboard("{Escape}");

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("옵션 선택", () => {
    it("옵션 클릭 시 onChange가 해당 value와 함께 호출된다", async () => {
      render(<CategorySelect value="" onChange={onChange} />);

      await userEvent.click(screen.getByRole("button"));
      const frontend = NOTE_CATEGORIES.find((c) => c.value === "frontend")!;
      await userEvent.click(
        screen.getByRole("option", { name: frontend.label }),
      );

      expect(onChange).toHaveBeenCalledWith("frontend");
    });

    it("옵션 선택 후 드롭다운이 닫힌다", async () => {
      render(<CategorySelect value="" onChange={onChange} />);

      await userEvent.click(screen.getByRole("button"));
      const first = NOTE_CATEGORIES[0];
      await userEvent.click(screen.getByRole("option", { name: first.label }));

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("접근성", () => {
    it("트리거 버튼의 aria-expanded 초기값은 false다", () => {
      render(<CategorySelect value="" onChange={onChange} />);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("드롭다운이 열리면 aria-expanded가 true가 된다", async () => {
      render(<CategorySelect value="" onChange={onChange} />);

      await userEvent.click(screen.getByRole("button"));

      expect(
        screen.getByRole("button", { expanded: true }),
      ).toBeInTheDocument();
    });

    it("현재 선택된 옵션의 aria-selected는 true다", async () => {
      render(<CategorySelect value="frontend" onChange={onChange} />);
      const frontend = NOTE_CATEGORIES.find((c) => c.value === "frontend")!;

      await userEvent.click(screen.getByRole("button"));

      expect(
        screen.getByRole("option", { name: frontend.label }),
      ).toHaveAttribute("aria-selected", "true");
    });

    it("선택되지 않은 옵션의 aria-selected는 false다", async () => {
      render(<CategorySelect value="frontend" onChange={onChange} />);
      const backend = NOTE_CATEGORIES.find((c) => c.value === "backend")!;

      await userEvent.click(screen.getByRole("button"));

      expect(
        screen.getByRole("option", { name: backend.label }),
      ).toHaveAttribute("aria-selected", "false");
    });

    it("트리거 버튼의 aria-haspopup이 listbox다", () => {
      render(<CategorySelect value="" onChange={onChange} />);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-haspopup",
        "listbox",
      );
    });
  });

  describe("ChevronIcon 회전", () => {
    it("드롭다운이 닫혀있으면 rotate-0이다", () => {
      render(<CategorySelect value="" onChange={onChange} />);
      expect(screen.getByTestId("chevron-icon")).toHaveClass("rotate-0");
    });

    it("드롭다운이 열리면 rotate-180이다", async () => {
      render(<CategorySelect value="" onChange={onChange} />);

      await userEvent.click(screen.getByRole("button"));

      expect(screen.getByTestId("chevron-icon")).toHaveClass("rotate-180");
    });
  });
});
