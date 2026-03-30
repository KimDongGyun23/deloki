import { describe, expect, it } from "vitest";

import { MAX_VISIBLE_PAGES } from "@/shared/constants/pagination";

import { buildPageRange } from "../buildPageRange";

describe("buildPageRange", () => {
  describe(`totalPages <= ${MAX_VISIBLE_PAGES}인 경우`, () => {
    it("1페이지면 [1]을 반환한다", () => {
      expect(buildPageRange(1, 1)).toEqual([1]);
    });

    it(`totalPages가 ${MAX_VISIBLE_PAGES}이면 1~${MAX_VISIBLE_PAGES} 전부 반환한다`, () => {
      const result = buildPageRange(3, MAX_VISIBLE_PAGES);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("ellipsis 없음 (currentPage가 앞쪽)", () => {
    it("currentPage=1, totalPages=10 → [1, 2, ..., 10]", () => {
      expect(buildPageRange(1, 10)).toEqual([1, 2, "...", 10]);
    });

    it("currentPage=2, totalPages=10 → [1, 2, 3, ..., 10]", () => {
      expect(buildPageRange(2, 10)).toEqual([1, 2, 3, "...", 10]);
    });

    it("currentPage=3, totalPages=10 → [1, 2, 3, 4, ..., 10]", () => {
      expect(buildPageRange(3, 10)).toEqual([1, 2, 3, 4, "...", 10]);
    });
  });

  describe("양쪽 ellipsis (currentPage가 중간)", () => {
    it("currentPage=5, totalPages=10 → [1, ..., 4, 5, 6, ..., 10]", () => {
      expect(buildPageRange(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
    });

    it("currentPage=6, totalPages=10 → [1, ..., 5, 6, 7, ..., 10]", () => {
      expect(buildPageRange(6, 10)).toEqual([1, "...", 5, 6, 7, "...", 10]);
    });
  });

  describe("ellipsis 없음 (currentPage가 뒤쪽)", () => {
    it("currentPage=10, totalPages=10 → [1, ..., 9, 10]", () => {
      expect(buildPageRange(10, 10)).toEqual([1, "...", 9, 10]);
    });

    it("currentPage=9, totalPages=10 → [1, ..., 8, 9, 10]", () => {
      expect(buildPageRange(9, 10)).toEqual([1, "...", 8, 9, 10]);
    });

    it("currentPage=8, totalPages=10 → [1, ..., 7, 8, 9, 10]", () => {
      expect(buildPageRange(8, 10)).toEqual([1, "...", 7, 8, 9, 10]);
    });
  });

  describe("반환값 공통 규칙", () => {
    it("항상 첫 번째 요소가 1이다", () => {
      for (let page = 1; page <= 12; page++) {
        const result = buildPageRange(page, 12);
        expect(result[0]).toBe(1);
      }
    });

    it("항상 마지막 요소가 totalPages다", () => {
      for (let page = 1; page <= 12; page++) {
        const result = buildPageRange(page, 12);
        expect(result[result.length - 1]).toBe(12);
      }
    });

    it("currentPage가 항상 결과에 포함된다", () => {
      for (let page = 1; page <= 12; page++) {
        const result = buildPageRange(page, 12);
        expect(result).toContain(page);
      }
    });

    it("연속된 숫자 사이에 ellipsis가 삽입되지 않는다", () => {
      const result = buildPageRange(1, 10);
      // ellipsis 앞뒤 숫자가 2 이상 차이나는지 확인
      for (let i = 0; i < result.length; i++) {
        if (result[i] === "...") {
          const prev = result[i - 1] as number;
          const next = result[i + 1] as number;
          expect(next - prev).toBeGreaterThan(1);
        }
      }
    });
  });
});
