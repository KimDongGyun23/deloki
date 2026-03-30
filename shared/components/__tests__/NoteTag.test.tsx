import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TAG_COLOR_NAMES } from "@/shared/constants/tag-colors";

import { NoteTag } from "../NoteTag";

describe("NoteTag", () => {
  describe("렌더링", () => {
    it("태그 이름 앞에 # 기호를 붙여 렌더링한다", () => {
      render(<NoteTag name="react" color="blue" />);

      expect(screen.getByText("#react")).toBeInTheDocument();
    });

    it("span 엘리먼트로 렌더링된다", () => {
      const { container } = render(<NoteTag name="typescript" color="blue" />);

      expect(container.querySelector("span")).toBeInTheDocument();
    });
  });

  describe("색상 CSS 변수", () => {
    it("backgroundColor에 color에 해당하는 CSS 변수가 적용된다", () => {
      const { container } = render(<NoteTag name="test" color="green" />);
      const span = container.querySelector("span")!;

      expect(span).toHaveStyle({ backgroundColor: "var(--tag-green-bg)" });
    });

    it("color(텍스트)에 color에 해당하는 CSS 변수가 적용된다", () => {
      const { container } = render(<NoteTag name="test" color="purple" />);
      const span = container.querySelector("span");
      expect(span).toBeInTheDocument();

      expect(span).toHaveStyle({ color: "var(--tag-purple-text)" });
    });

    it.each(TAG_COLOR_NAMES)(
      "color=%s 일 때 올바른 CSS 변수를 사용한다",
      (color) => {
        const { container } = render(<NoteTag name="tag" color={color} />);
        const span = container.querySelector("span")!;

        expect(span).toHaveStyle({
          backgroundColor: `var(--tag-${color}-bg)`,
          color: `var(--tag-${color}-text)`,
        });
      },
    );
  });
});
