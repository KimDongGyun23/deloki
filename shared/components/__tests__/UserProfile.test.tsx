import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UserProfile } from "../Sidebar/UserProfile";

describe("UserProfile", () => {
  it("이름을 렌더링한다", () => {
    render(<UserProfile name="Loki" />);
    expect(screen.getByText("Loki")).toBeInTheDocument();
  });

  it("이름 첫 글자를 아바타에 표시한다", () => {
    render(<UserProfile name="Loki" />);
    expect(screen.getByText("L")).toBeInTheDocument();
  });

  it("소문자 이름도 대문자로 변환해 아바타에 표시한다", () => {
    render(<UserProfile name="loki" />);
    expect(screen.getByText("L")).toBeInTheDocument();
  });

  it("빈 이름일 때 아바타에 ? 를 표시한다", () => {
    render(<UserProfile name="" />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("아바타에 접근성 aria-label이 포함된다", () => {
    render(<UserProfile name="Loki" />);
    expect(
      screen.getByRole("img", { name: "Loki 프로필 아바타" }),
    ).toBeInTheDocument();
  });
});
