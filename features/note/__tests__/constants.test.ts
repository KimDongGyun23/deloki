import { describe, expect, it } from "vitest";

import { CATEGORIES } from "@/shared/constants/category";

import {
  MIN_TEXTAREA_ROWS,
  NOTE_CATEGORIES,
  NOTE_CATEGORY_VALUES,
} from "../constants";

describe("_constants", () => {
  describe("NOTE_CATEGORIES", () => {
    it("'all' 카테고리를 포함하지 않는다", () => {
      const values = NOTE_CATEGORIES.map((c) => c.value);
      expect(values).not.toContain("all");
    });

    it("CATEGORIES에서 'all'을 제외한 나머지와 일치한다", () => {
      const expected = CATEGORIES.filter((c) => c.value !== "all");
      expect(NOTE_CATEGORIES).toHaveLength(expected.length);
    });

    it("각 항목이 label과 value를 가진다", () => {
      NOTE_CATEGORIES.forEach((category) => {
        expect(category).toHaveProperty("label");
        expect(category).toHaveProperty("value");
      });
    });
  });

  describe("NOTE_CATEGORY_VALUES", () => {
    it("NOTE_CATEGORIES의 value 배열과 일치한다", () => {
      const expected = NOTE_CATEGORIES.map((c) => c.value);
      expect(NOTE_CATEGORY_VALUES).toEqual(expected);
    });

    it("최소 1개 이상의 값을 가진다", () => {
      expect(NOTE_CATEGORY_VALUES.length).toBeGreaterThan(0);
    });

    it("'all'을 포함하지 않는다", () => {
      expect(NOTE_CATEGORY_VALUES).not.toContain("all");
    });
  });

  describe("MIN_TEXTAREA_ROWS", () => {
    it("3이다", () => {
      expect(MIN_TEXTAREA_ROWS).toBe(3);
    });
  });
});
