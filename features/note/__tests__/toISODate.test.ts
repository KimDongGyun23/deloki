import { describe, expect, it } from "vitest";

import { toISODate } from "../lib/toISODate";

describe("toISODate", () => {
  describe("정상 변환", () => {
    it("YYYY.MM.DD 형식을 YYYY-MM-DD로 변환한다", () => {
      expect(toISODate("2024.03.15")).toBe("2024-03-15");
    });

    it("월/일이 한 자리인 경우에도 패딩을 유지한다", () => {
      expect(toISODate("2024.01.01")).toBe("2024-01-01");
    });

    it("연말 날짜를 올바르게 변환한다", () => {
      expect(toISODate("2024.12.31")).toBe("2024-12-31");
    });

    it("윤년 2월 29일을 올바르게 변환한다", () => {
      expect(toISODate("2024.02.29")).toBe("2024-02-29");
    });
  });

  describe("형식 오류", () => {
    it("YYYY-MM-DD 형식(하이픈)은 오류를 발생시킨다", () => {
      expect(() => toISODate("2024-03-15")).toThrow("YYYY.MM.DD 형식이 아닙니다");
    });

    it("날짜 없이 연월만 있으면 오류를 발생시킨다", () => {
      expect(() => toISODate("2024.03")).toThrow("YYYY.MM.DD 형식이 아닙니다");
    });

    it("빈 문자열은 오류를 발생시킨다", () => {
      expect(() => toISODate("")).toThrow("YYYY.MM.DD 형식이 아닙니다");
    });

    it("문자가 포함된 경우 오류를 발생시킨다", () => {
      expect(() => toISODate("2024.월.15")).toThrow("YYYY.MM.DD 형식이 아닙니다");
    });
  });

  describe("유효하지 않은 날짜", () => {
    it("존재하지 않는 달(13월)은 오류를 발생시킨다", () => {
      expect(() => toISODate("2024.13.01")).toThrow("유효하지 않은 날짜입니다");
    });

    it("00월은 오류를 발생시킨다", () => {
      expect(() => toISODate("2024.00.01")).toThrow("유효하지 않은 날짜입니다");
    });

    it("00일은 오류를 발생시킨다", () => {
      expect(() => toISODate("2024.03.00")).toThrow("유효하지 않은 날짜입니다");
    });

    it("존재하지 않는 날(4월 31일)은 오류를 발생시킨다", () => {
      expect(() => toISODate("2024.04.31")).toThrow("유효하지 않은 날짜입니다");
    });

    it("윤년이 아닌 해의 2월 29일은 오류를 발생시킨다", () => {
      expect(() => toISODate("2023.02.29")).toThrow("유효하지 않은 날짜입니다");
    });
  });
});
