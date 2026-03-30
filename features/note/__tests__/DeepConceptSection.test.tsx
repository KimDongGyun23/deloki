import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { DeepConceptSection } from "../components/DeepConceptSection";
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
      <DeepConceptSection />
    </Wrapper>,
  );

describe("DeepConceptSection", () => {
  it("'Deep Concept' 타이틀을 렌더링한다", () => {
    renderSection();
    expect(
      screen.getByRole("heading", { name: "Deep Concept" }),
    ).toBeInTheDocument();
  });

  it("초기에 'Section 1' 레이블을 렌더링한다", () => {
    renderSection();
    expect(screen.getByText("Section 1")).toBeInTheDocument();
  });

  it("항목이 1개일 때 섹션 제거 버튼이 없다", () => {
    renderSection();
    expect(screen.queryByText("섹션 제거")).not.toBeInTheDocument();
  });

  it("'+ more add section' 버튼 클릭 시 섹션이 추가된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ more add section" }),
    );

    expect(screen.getByText("Section 2")).toBeInTheDocument();
  });

  it("항목이 2개 이상이면 섹션 제거 버튼이 표시된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ more add section" }),
    );

    expect(screen.getAllByRole("button", { name: /섹션 제거/ })).toHaveLength(
      2,
    );
  });

  it("섹션 제거 버튼 클릭 시 해당 섹션이 제거된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ more add section" }),
    );
    const titleInputs = screen.getAllByPlaceholderText("섹션 제목 (선택)");
    await userEvent.type(titleInputs[0], "first");
    await userEvent.type(titleInputs[1], "second");

    await userEvent.click(
      screen.getAllByRole("button", { name: /섹션 제거/ })[0],
    );

    expect(screen.queryByDisplayValue("first")).not.toBeInTheDocument();
    expect(screen.getByDisplayValue("second")).toBeInTheDocument();
  });
});
