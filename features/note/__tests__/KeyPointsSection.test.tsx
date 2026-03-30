import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { KeyPointsSection } from "../components/KeyPointsSection";
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
      <KeyPointsSection />
    </Wrapper>,
  );

describe("KeyPointsSection", () => {
  it("'Key Points' 타이틀을 렌더링한다", () => {
    renderSection();
    expect(
      screen.getByRole("heading", { name: "Key Points" }),
    ).toBeInTheDocument();
  });

  it("초기에 1개의 입력 필드를 렌더링한다", () => {
    renderSection();
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
  });

  it("항목이 1개일 때 제거 버튼이 없다", () => {
    renderSection();
    expect(
      screen.queryByRole("button", { name: "Key Point 제거" }),
    ).not.toBeInTheDocument();
  });

  it("'+ add more wisdom' 버튼 클릭 시 입력 필드가 추가된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ add more wisdom" }),
    );

    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });

  it("항목이 2개 이상이면 제거 버튼이 표시된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ add more wisdom" }),
    );

    expect(
      screen.getAllByRole("button", { name: "Key Point 제거" }),
    ).toHaveLength(2);
  });

  it("제거 버튼 클릭 시 해당 항목이 제거된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ add more wisdom" }),
    );
    expect(screen.getAllByRole("textbox")).toHaveLength(2);

    await userEvent.click(
      screen.getAllByRole("button", { name: "Key Point 제거" })[0],
    );

    expect(screen.getAllByRole("textbox")).toHaveLength(1);
  });

  it("순서 번호가 1부터 시작한다", () => {
    renderSection();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
