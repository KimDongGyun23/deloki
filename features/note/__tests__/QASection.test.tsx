import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { QASection } from "../components/QASection";
import { createDefaultNoteFormValues, type NoteFormValues } from "../schemas";

vi.mock("@/shared/components/Icons", () => ({
  CloseIcon: ({ size }: { size?: number }) => (
    <svg data-testid="close-icon" data-size={size} />
  ),
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<NoteFormValues>({
    defaultValues: createDefaultNoteFormValues(),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const renderSection = () =>
  render(
    <Wrapper>
      <QASection />
    </Wrapper>,
  );

describe("QASection", () => {
  it("'Q&A Archive' 타이틀을 렌더링한다", () => {
    renderSection();
    expect(
      screen.getByRole("heading", { name: "Q&A Archive" }),
    ).toBeInTheDocument();
  });

  it("'Question' / 'Answer' 레이블을 렌더링한다", () => {
    renderSection();
    expect(screen.getByText("Question")).toBeInTheDocument();
    expect(screen.getByText("Answer")).toBeInTheDocument();
  });

  it("항목이 1개일 때 제거 버튼이 없다", () => {
    renderSection();
    expect(
      screen.queryByRole("button", { name: "Q&A 쌍 제거" }),
    ).not.toBeInTheDocument();
  });

  it("'+ add more pair' 버튼 클릭 시 Q&A 쌍이 추가된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ add more pair" }),
    );

    expect(screen.getAllByText("Question")).toHaveLength(2);
  });

  it("항목이 2개 이상이면 제거 버튼이 표시된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ add more pair" }),
    );

    expect(screen.getAllByRole("button", { name: "Q&A 쌍 제거" })).toHaveLength(
      2,
    );
  });

  it("제거 버튼 클릭 시 해당 Q&A 쌍이 제거된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ add more pair" }),
    );
    expect(screen.getAllByText("Question")).toHaveLength(2);

    await userEvent.click(
      screen.getAllByRole("button", { name: "Q&A 쌍 제거" })[0],
    );

    expect(screen.getAllByText("Question")).toHaveLength(1);
  });
});
