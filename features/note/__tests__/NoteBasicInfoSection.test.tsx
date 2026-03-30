import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { NoteBasicInfoSection } from "../components/NoteBasicInfoSection";
import { NOTE_CATEGORIES } from "../constants";
import {
  createDefaultNoteFormValues,
  noteFormSchema,
  type NoteFormValues,
} from "../schemas";

vi.mock("@/shared/components/Icons", () => ({
  ChevronIcon: ({ className }: { className?: string }) => (
    <svg data-testid="chevron-icon" className={className} />
  ),
}));

/** FormProvider 래퍼 */
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: createDefaultNoteFormValues(),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const renderSection = () =>
  render(
    <Wrapper>
      <NoteBasicInfoSection />
    </Wrapper>,
  );

describe("NoteBasicInfoSection", () => {
  it("제목 입력 필드를 렌더링한다", () => {
    renderSection();
    expect(
      screen.getByPlaceholderText("어떤 이야기를 적어볼까요?"),
    ).toBeInTheDocument();
  });

  it("카테고리 선택 버튼을 렌더링한다", () => {
    renderSection();
    expect(screen.getByText("카테고리 선택")).toBeInTheDocument();
  });

  it("태그 입력 필드를 렌더링한다", () => {
    renderSection();
    expect(
      screen.getByPlaceholderText("Space-separated #tags..."),
    ).toBeInTheDocument();
  });

  it("제목을 입력할 수 있다", async () => {
    renderSection();

    const titleInput = screen.getByPlaceholderText("어떤 이야기를 적어볼까요?");
    await userEvent.type(titleInput, "React 학습 노트");

    expect(titleInput).toHaveValue("React 학습 노트");
  });

  it("카테고리 드롭다운을 열어 옵션을 선택할 수 있다", async () => {
    renderSection();

    await userEvent.click(screen.getByRole("button", { name: /카테고리/ }));

    const frontend = NOTE_CATEGORIES.find((c) => c.value === "frontend")!;
    await userEvent.click(screen.getByRole("option", { name: frontend.label }));

    expect(screen.getByText(frontend.label)).toBeInTheDocument();
  });
});
