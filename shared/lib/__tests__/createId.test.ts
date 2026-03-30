import { afterEach, describe, expect, it, vi } from "vitest";

import { createId } from "../createId";

describe("createId", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("crypto.randomUUID를 1회 호출하고 반환값을 그대로 전달한다", () => {
    const mockUuid = "11111111-2222-4333-8444-555555555555";
    const randomUUIDSpy = vi
      .spyOn(globalThis.crypto, "randomUUID")
      .mockReturnValue(mockUuid);

    const result = createId();

    expect(randomUUIDSpy).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockUuid);
  });

  it("연속 호출 시 UUID 형식 문자열을 반환한다", () => {
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const first = createId();
    const second = createId();

    expect(first).toMatch(uuidV4Regex);
    expect(second).toMatch(uuidV4Regex);
    expect(first).not.toBe(second);
  });
});
