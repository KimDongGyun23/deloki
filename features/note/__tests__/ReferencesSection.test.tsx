import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { ReferencesSection } from "../components/ReferencesSection";
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
      <ReferencesSection />
    </Wrapper>,
  );

describe("ReferencesSection", () => {
  it("'References' 타이틀을 렌더링한다", () => {
    renderSection();
    expect(
      screen.getByRole("heading", { name: "References" }),
    ).toBeInTheDocument();
  });

  it("초기 기본값이 빈 배열이므로 참고문헌 레이블이 없다", () => {
    renderSection();
    expect(screen.queryByText("1번 참고문헌")).not.toBeInTheDocument();
  });

  it("'+ add more reference' 버튼 클릭 시 참고문헌이 추가된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ add more reference" }),
    );

    expect(screen.getByText("1번 참고문헌")).toBeInTheDocument();
  });

  it("항목이 1개 이상이면 제거 버튼이 표시된다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ add more reference" }),
    );

    expect(
      screen.getByRole("button", { name: "참고문헌 제거" }),
    ).toBeInTheDocument();
  });

  it("제거 버튼 클릭 시 해당 참고문헌이 제거된다", async () => {
    renderSection();

    expect(screen.getAllByText(/번 참고문헌/)).toHaveLength(2);

    await userEvent.click(
      screen.getAllByRole("button", { name: "참고문헌 제거" })[0],
    );

    expect(screen.getAllByText(/번 참고문헌/)).toHaveLength(1);
  });

  it("URL 입력 필드의 type이 url이다", async () => {
    renderSection();

    await userEvent.click(
      screen.getByRole("button", { name: "+ add more reference" }),
    );

    expect(screen.getByPlaceholderText("https://...")).toHaveAttribute(
      "type",
      "url",
    );
  });
});
