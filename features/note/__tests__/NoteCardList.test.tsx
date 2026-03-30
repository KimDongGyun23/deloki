import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { NoteListItem } from "@/shared/types/note";

import { NoteCardList } from "../components/NoteCardList";

/** 테스트용 노트 아이템 생성 헬퍼 */
const makeNote = (overrides: Partial<NoteListItem> = {}): NoteListItem => ({
  id: "note-1",
  title: "테스트 노트",
  category: "frontend",
  tags: [],
  createdAt: "2024.01.01",
  ...overrides,
});

describe("NoteCardList", () => {
  describe("빈 상태", () => {
    it('notes가 빈 배열이면 "노트가 없습니다." 메시지를 렌더링한다', () => {
      render(<NoteCardList notes={[]} />);

      expect(screen.getByText("노트가 없습니다.")).toBeInTheDocument();
    });

    it("notes가 빈 배열이면 카드 링크를 렌더링하지 않는다", () => {
      render(<NoteCardList notes={[]} />);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("노트 목록 렌더링", () => {
    it("notes 개수만큼 카드 링크를 렌더링한다", () => {
      const notes = [
        makeNote({ id: "1", title: "노트 A" }),
        makeNote({ id: "2", title: "노트 B" }),
        makeNote({ id: "3", title: "노트 C" }),
      ];
      render(<NoteCardList notes={notes} />);

      expect(screen.getAllByRole("link")).toHaveLength(3);
    });

    it("노트 제목을 렌더링한다", () => {
      const notes = [makeNote({ title: "React Hooks 정리" })];
      render(<NoteCardList notes={notes} />);

      expect(screen.getByText("React Hooks 정리")).toBeInTheDocument();
    });

    it("카드 링크의 href가 /notes/detail/[id]다", () => {
      const notes = [makeNote({ id: "abc-123" })];
      render(<NoteCardList notes={notes} />);

      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "/notes/detail/abc-123",
      );
    });

    it("생성일을 time 엘리먼트로 렌더링한다", () => {
      const notes = [makeNote({ createdAt: "2024.03.15" })];
      render(<NoteCardList notes={notes} />);

      const time = screen.getByText("2024.03.15");
      expect(time.tagName.toLowerCase()).toBe("time");
      expect(time).toHaveAttribute("dateTime", "2024.03.15");
    });
  });

  describe("태그 렌더링", () => {
    it("노트에 태그가 있으면 # 기호와 함께 렌더링한다", () => {
      const notes = [
        makeNote({
          tags: [
            { name: "react", color: "blue" },
            { name: "typescript", color: "green" },
          ],
        }),
      ];
      render(<NoteCardList notes={notes} />);

      expect(screen.getByText("#react")).toBeInTheDocument();
      expect(screen.getByText("#typescript")).toBeInTheDocument();
    });

    it("태그가 없으면 태그 영역이 비어있다", () => {
      const notes = [makeNote({ tags: [] })];
      render(<NoteCardList notes={notes} />);

      // # 으로 시작하는 텍스트가 없어야 함
      const tagTexts = screen
        .queryAllByText(/^#/)
        .filter((el) => el.tagName !== "BODY");
      expect(tagTexts).toHaveLength(0);
    });
  });

  describe("여러 노트", () => {
    it("각 카드의 제목이 모두 노출된다", () => {
      const titles = ["노트 첫 번째", "노트 두 번째", "노트 세 번째"];
      const notes = titles.map((title, i) =>
        makeNote({ id: String(i), title }),
      );
      render(<NoteCardList notes={notes} />);

      titles.forEach((title) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });
});
