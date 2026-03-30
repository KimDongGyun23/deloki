import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  THEME_COOKIE_KEY,
  THEME_DARK,
  THEME_LIGHT,
} from "@/shared/constants/theme";

import { DarkModeToggle } from "../Sidebar/DarkModeToggle";

describe("DarkModeToggle", () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = THEME_LIGHT;
  });

  afterEach(() => {
    delete document.documentElement.dataset.theme;
    document.cookie = `${THEME_COOKIE_KEY}=; path=/; max-age=0`;
  });

  it("Dark Mode 레이블을 렌더링한다", () => {
    render(<DarkModeToggle />);
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });

  it("라이트 모드일 때 다크 모드로 전환 aria-label을 가진다", () => {
    render(<DarkModeToggle />);
    expect(
      screen.getByRole("switch", { name: "다크 모드로 전환" }),
    ).toBeInTheDocument();
  });

  it("다크 모드일 때 라이트 모드로 전환 aria-label을 가진다", () => {
    document.documentElement.dataset.theme = THEME_DARK;
    render(<DarkModeToggle isDarkMode={true} />);
    expect(
      screen.getByRole("switch", { name: "라이트 모드로 전환" }),
    ).toBeInTheDocument();
  });

  it("토글 클릭 시 data-theme을 dark로 변경한다", async () => {
    render(<DarkModeToggle />);
    await userEvent.click(screen.getByRole("switch"));
    expect(document.documentElement.dataset.theme).toBe(THEME_DARK);
    expect(document.cookie).toContain(`${THEME_COOKIE_KEY}=${THEME_DARK}`);
  });

  it("다크모드에서 토글 클릭 시 data-theme을 light로 변경한다", async () => {
    document.documentElement.dataset.theme = THEME_DARK;
    render(<DarkModeToggle isDarkMode={true} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(document.documentElement.dataset.theme).toBe(THEME_LIGHT);
    expect(document.cookie).toContain(`${THEME_COOKIE_KEY}=${THEME_LIGHT}`);
  });

  it("라이트 모드일 때 aria-checked가 false다", () => {
    render(<DarkModeToggle />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("다크 모드일 때 aria-checked가 true다", () => {
    document.documentElement.dataset.theme = THEME_DARK;
    render(<DarkModeToggle isDarkMode={true} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("토글 클릭 후 aria-checked가 true로 변경된다", async () => {
    render(<DarkModeToggle />);
    await userEvent.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });
});
