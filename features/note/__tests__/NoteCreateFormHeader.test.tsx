import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NoteCreateFormHeader } from "../components/NoteCreateFormHeader";

describe("NoteCreateFormHeader", () => {
  it("'Create Note' 제목을 렌더링한다", () => {
    render(<NoteCreateFormHeader onDiscard={vi.fn()} />);
    expect(
      screen.getByRole("heading", { name: "Create Note" }),
    ).toBeInTheDocument();
  });

  it("'Discard' 버튼을 렌더링한다", () => {
    render(<NoteCreateFormHeader onDiscard={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Discard" })).toBeInTheDocument();
  });

  it("'Publish Note' 버튼을 렌더링한다", () => {
    render(<NoteCreateFormHeader onDiscard={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Publish Note" }),
    ).toBeInTheDocument();
  });

  it("'Discard' 버튼 클릭 시 onDiscard를 호출한다", async () => {
    const onDiscard = vi.fn();
    render(<NoteCreateFormHeader onDiscard={onDiscard} />);

    await userEvent.click(screen.getByRole("button", { name: "Discard" }));

    expect(onDiscard).toHaveBeenCalledTimes(1);
  });

  it("'Publish Note' 버튼의 type이 submit이다", () => {
    render(<NoteCreateFormHeader onDiscard={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Publish Note" }),
    ).toHaveAttribute("type", "submit");
  });

  it("'Discard' 버튼의 type이 button이다 (submit 방지)", () => {
    render(<NoteCreateFormHeader onDiscard={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Discard" })).toHaveAttribute(
      "type",
      "button",
    );
  });
});
