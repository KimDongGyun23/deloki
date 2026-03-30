import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AutoResizeTextarea } from "../components/AutoResizeTextarea";

describe("AutoResizeTextarea", () => {
  it("value를 렌더링한다", () => {
    render(<AutoResizeTextarea value="초기값" onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("초기값");
  });

  it("placeholder를 렌더링한다", () => {
    render(
      <AutoResizeTextarea
        value=""
        onChange={vi.fn()}
        placeholder="입력하세요"
      />,
    );
    expect(screen.getByPlaceholderText("입력하세요")).toBeInTheDocument();
  });

  it("입력 시 onChange가 호출된다", async () => {
    const onChange = vi.fn();
    render(<AutoResizeTextarea value="" onChange={onChange} />);

    await userEvent.type(screen.getByRole("textbox"), "a");

    expect(onChange).toHaveBeenCalled();
  });

  it("minRows props가 rows 속성으로 전달된다", () => {
    render(<AutoResizeTextarea value="" onChange={vi.fn()} minRows={5} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
  });

  it("minRows 기본값은 3이다", () => {
    render(<AutoResizeTextarea value="" onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "3");
  });

  it("추가 className을 적용한다", () => {
    render(
      <AutoResizeTextarea value="" onChange={vi.fn()} className="custom" />,
    );
    expect(screen.getByRole("textbox")).toHaveClass("custom");
  });

  it("resize-none 클래스를 가진다", () => {
    render(<AutoResizeTextarea value="" onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveClass("resize-none");
  });
});
