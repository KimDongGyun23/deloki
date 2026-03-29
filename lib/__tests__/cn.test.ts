import { describe, expect, it } from "vitest";

import { cn } from "../cn";

describe("cn", () => {
  it("단일 클래스를 그대로 반환한다", () => {
    expect(cn("px-4")).toBe("px-4");
  });

  it("여러 클래스를 공백으로 합친다", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("인자 없이 호출 시 빈 문자열을 반환한다", () => {
    expect(cn()).toBe("");
  });

  it("false, null, undefined, 빈 문자열을 무시한다", () => {
    expect(cn("px-4", false, null, undefined, "")).toBe("px-4");
  });

  it("조건부 클래스 — true 조건은 포함한다", () => {
    expect(cn("px-4", true && "py-2")).toBe("px-4 py-2");
  });

  it("조건부 클래스 — false 조건은 제외한다", () => {
    expect(cn("px-4", false && "py-2")).toBe("px-4");
  });

  it("객체 형태의 조건부 클래스를 처리한다", () => {
    expect(cn({ "px-4": true, "py-2": false })).toBe("px-4");
  });

  it("배열 형태의 클래스를 펼쳐서 처리한다", () => {
    expect(cn(["px-4", "py-2"])).toBe("px-4 py-2");
  });

  it("충돌하는 Tailwind 클래스는 마지막 값으로 덮어쓴다", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("p-* 와 px-* 충돌 시 두 클래스 모두 유지한다 (twMerge 정책)", () => {
    expect(cn("p-4", "px-2")).toBe("p-4 px-2");
  });

  it("text-* 색상 충돌 시 마지막 값으로 덮어쓴다", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("여러 인자와 조건을 혼합하여 처리한다", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn("base", isActive && "active", isDisabled && "disabled")).toBe(
      "base active",
    );
  });
});
