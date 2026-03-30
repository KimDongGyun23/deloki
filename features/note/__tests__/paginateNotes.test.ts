import { describe, expect, it } from "vitest";

import { NOTES_PER_PAGE } from "@/shared/constants/pagination";
import type { NoteListItem } from "@/shared/types/note";

import { paginateNotes } from "../lib/paginateNotes";

/** 테스트용 노트 목목 생성 헬퍼 */
const makeNotes = (count: number): NoteListItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `note-${i + 1}`,
    title: `Note ${String(i + 1).padStart(2, "0")}`,
    category: i % 2 === 0 ? "frontend" : "backend",
    tags: [],
    createdAt: `2024.01.${String(i + 1).padStart(2, "0")}`,
  }));

describe("paginateNotes", () => {
  describe("필터링", () => {
    it('category가 "all"이면 전체 노트를 반환한다', () => {
      const notes = makeNotes(5);
      const { paginated } = paginateNotes({
        notes,
        category: "all",
        sort: "newest",
        page: 1,
      });
      expect(paginated).toHaveLength(5);
    });

    it("특정 category만 필터링한다", () => {
      const notes = makeNotes(6); // frontend: 0,2,4 / backend: 1,3,5
      const { paginated } = paginateNotes({
        notes,
        category: "frontend",
        sort: "newest",
        page: 1,
      });
      expect(paginated.every((n) => n.category === "frontend")).toBe(true);
      expect(paginated).toHaveLength(3);
    });
  });

  describe("정렬", () => {
    it('"newest" 정렬 시 createdAt 내림차순으로 반환한다', () => {
      const notes = makeNotes(3);
      const { paginated } = paginateNotes({
        notes,
        category: "all",
        sort: "newest",
        page: 1,
      });
      expect(paginated[0].createdAt >= paginated[1].createdAt).toBe(true);
      expect(paginated[1].createdAt >= paginated[2].createdAt).toBe(true);
    });

    it('"oldest" 정렬 시 createdAt 오름차순으로 반환한다', () => {
      const notes = makeNotes(3);
      const { paginated } = paginateNotes({
        notes,
        category: "all",
        sort: "oldest",
        page: 1,
      });
      expect(paginated[0].createdAt <= paginated[1].createdAt).toBe(true);
      expect(paginated[1].createdAt <= paginated[2].createdAt).toBe(true);
    });

    it('"alphabetical" 정렬 시 title 가나다순으로 반환한다', () => {
      const notes: NoteListItem[] = [
        {
          id: "1",
          title: "다 노트",
          category: "frontend",
          tags: [],
          createdAt: "2024.01.01",
        },
        {
          id: "2",
          title: "가 노트",
          category: "frontend",
          tags: [],
          createdAt: "2024.01.02",
        },
        {
          id: "3",
          title: "나 노트",
          category: "frontend",
          tags: [],
          createdAt: "2024.01.03",
        },
      ];
      const { paginated } = paginateNotes({
        notes,
        category: "all",
        sort: "alphabetical",
        page: 1,
      });
      expect(paginated.map((n) => n.title)).toEqual([
        "가 노트",
        "나 노트",
        "다 노트",
      ]);
    });
  });

  describe("페이지네이션", () => {
    it("totalPages는 Math.ceil(filtered / NOTES_PER_PAGE)로 계산된다", () => {
      const notes = makeNotes(NOTES_PER_PAGE + 1);
      const { totalPages } = paginateNotes({
        notes,
        category: "all",
        sort: "newest",
        page: 1,
      });
      expect(totalPages).toBe(2);
    });

    it("노트가 없어도 totalPages는 최소 1을 반환한다", () => {
      const { totalPages } = paginateNotes({
        notes: [],
        category: "all",
        sort: "newest",
        page: 1,
      });
      expect(totalPages).toBe(1);
    });

    it("1페이지는 처음 NOTES_PER_PAGE개를 반환한다", () => {
      const notes = makeNotes(NOTES_PER_PAGE * 2);
      const { paginated } = paginateNotes({
        notes,
        category: "all",
        sort: "oldest",
        page: 1,
      });
      expect(paginated).toHaveLength(NOTES_PER_PAGE);
    });

    it("마지막 페이지는 나머지 노트만 반환한다", () => {
      const remainder = 3;
      const notes = makeNotes(NOTES_PER_PAGE + remainder);
      const { paginated } = paginateNotes({
        notes,
        category: "all",
        sort: "oldest",
        page: 2,
      });
      expect(paginated).toHaveLength(remainder);
    });

    it("범위를 벗어난 page는 빈 배열을 반환한다", () => {
      const notes = makeNotes(5);
      const { paginated } = paginateNotes({
        notes,
        category: "all",
        sort: "newest",
        page: 99,
      });
      expect(paginated).toHaveLength(0);
    });
  });
});
