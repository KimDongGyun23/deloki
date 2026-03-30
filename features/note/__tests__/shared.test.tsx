import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  AddButton,
  FieldLabel,
  inputCls,
  RemoveButton,
  SectionCard,
  SectionTitle,
} from "../components/shared";

vi.mock("@/shared/components/Icons", () => ({
  CloseIcon: ({ size }: { size?: number }) => (
    <svg data-testid="close-icon" data-size={size} />
  ),
}));

describe("shared 컴포넌트", () => {
  describe("SectionCard", () => {
    it("children을 렌더링한다", () => {
      render(<SectionCard>내용</SectionCard>);
      expect(screen.getByText("내용")).toBeInTheDocument();
    });

    it("추가 className을 적용한다", () => {
      const { container } = render(
        <SectionCard className="custom-class">내용</SectionCard>,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("section 태그를 사용한다", () => {
      const { container } = render(<SectionCard>내용</SectionCard>);
      expect(container.firstChild?.nodeName).toBe("SECTION");
    });
  });

  describe("SectionTitle", () => {
    it("children을 렌더링한다", () => {
      render(<SectionTitle>타이틀</SectionTitle>);
      expect(screen.getByText("타이틀")).toBeInTheDocument();
    });

    it("h2 태그를 사용한다", () => {
      render(<SectionTitle>타이틀</SectionTitle>);
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });
  });

  describe("AddButton", () => {
    it("children을 렌더링한다", () => {
      render(<AddButton onClick={vi.fn()}>+ 추가</AddButton>);
      expect(screen.getByText("+ 추가")).toBeInTheDocument();
    });

    it("클릭 시 onClick을 호출한다", async () => {
      const onClick = vi.fn();
      render(<AddButton onClick={onClick}>+ 추가</AddButton>);

      await userEvent.click(screen.getByRole("button", { name: "+ 추가" }));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("type이 button이다 (submit 방지)", () => {
      render(<AddButton onClick={vi.fn()}>+ 추가</AddButton>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  describe("RemoveButton", () => {
    it("aria-label이 설정된다", () => {
      render(<RemoveButton onClick={vi.fn()} label="항목 제거" />);
      expect(
        screen.getByRole("button", { name: "항목 제거" }),
      ).toBeInTheDocument();
    });

    it("클릭 시 onClick을 호출한다", async () => {
      const onClick = vi.fn();
      render(<RemoveButton onClick={onClick} label="항목 제거" />);

      await userEvent.click(screen.getByRole("button", { name: "항목 제거" }));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("size prop을 CloseIcon에 전달한다", () => {
      render(<RemoveButton onClick={vi.fn()} label="제거" size={20} />);
      expect(screen.getByTestId("close-icon")).toHaveAttribute(
        "data-size",
        "20",
      );
    });

    it("size를 생략하면 기본값 14가 전달된다", () => {
      render(<RemoveButton onClick={vi.fn()} label="제거" />);
      expect(screen.getByTestId("close-icon")).toHaveAttribute(
        "data-size",
        "14",
      );
    });

    it("type이 button이다 (submit 방지)", () => {
      render(<RemoveButton onClick={vi.fn()} label="제거" />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  describe("FieldLabel", () => {
    it("children을 렌더링한다", () => {
      render(<FieldLabel>레이블</FieldLabel>);
      expect(screen.getByText("레이블")).toBeInTheDocument();
    });

    it("추가 className을 적용한다", () => {
      render(<FieldLabel className="extra">레이블</FieldLabel>);
      expect(screen.getByText("레이블")).toHaveClass("extra");
    });
  });

  describe("inputCls", () => {
    it("문자열이다", () => {
      expect(typeof inputCls).toBe("string");
    });
  });
});
