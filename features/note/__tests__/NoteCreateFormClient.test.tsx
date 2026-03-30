import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { NoteCreateFormClient } from "../components/NoteCreateFormClient";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/components/Icons", () => ({
  CloseIcon: () => <svg data-testid="close-icon" />,
  ChevronIcon: ({ className }: { className?: string }) => (
    <svg data-testid="chevron-icon" className={className} />
  ),
}));

describe("NoteCreateFormClient", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("폼을 렌더링한다", () => {
    const { container } = render(<NoteCreateFormClient />);
    expect(container.querySelector("form")).toBeTruthy();
  });

  it("'Create Note' 헤더를 렌더링한다", () => {
    render(<NoteCreateFormClient />);
    expect(
      screen.getByRole("heading", { name: "Create Note" }),
    ).toBeInTheDocument();
  });

  it("모든 섹션 타이틀을 렌더링한다", () => {
    render(<NoteCreateFormClient />);

    expect(
      screen.getByRole("heading", { name: "Key Points" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Deep Concept" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Q&A Archive" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "References" }),
    ).toBeInTheDocument();
  });

  it("'Discard' 클릭 시 /notes로 이동한다", async () => {
    render(<NoteCreateFormClient />);

    await userEvent.click(screen.getByRole("button", { name: "Discard" }));

    expect(mockPush).toHaveBeenCalledWith("/notes");
  });
});
