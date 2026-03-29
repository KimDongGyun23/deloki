import { SVGProps } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// withSize HOC가 width/height를 올바르게 전달하는지 검증하기 위해
// SVG 파일을 props를 그대로 렌더링하는 컴포넌트로 모킹
vi.mock("@/public/icons/chart.svg", () => ({
  default: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="chart-svg" {...props} />
  ),
}));
vi.mock("@/public/icons/clip.svg", () => ({
  default: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="clip-svg" {...props} />
  ),
}));
vi.mock("@/public/icons/home.svg", () => ({
  default: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="home-svg" {...props} />
  ),
}));
vi.mock("@/public/icons/logo.svg", () => ({
  default: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="logo-svg" {...props} />
  ),
}));
vi.mock("@/public/icons/note.svg", () => ({
  default: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="note-svg" {...props} />
  ),
}));
vi.mock("@/public/icons/search.svg", () => ({
  default: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="search-svg" {...props} />
  ),
}));

import {
  ChartIcon,
  ClipIcon,
  HomeIcon,
  LogoIcon,
  NoteIcon,
  SearchIcon,
} from "../Icons";

describe("withSize HOC", () => {
  it("기본 size(20)를 width/height에 적용한다", () => {
    render(<HomeIcon />);
    const svg = screen.getByTestId("home-svg");
    expect(svg).toHaveAttribute("width", "20");
    expect(svg).toHaveAttribute("height", "20");
  });

  it("size prop으로 width/height를 동시에 변경한다", () => {
    render(<HomeIcon size={32} />);
    const svg = screen.getByTestId("home-svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("width prop이 size를 우선한다", () => {
    render(<HomeIcon size={32} width={16} />);
    const svg = screen.getByTestId("home-svg");
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("height prop이 size를 우선한다", () => {
    render(<HomeIcon size={32} height={16} />);
    const svg = screen.getByTestId("home-svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "16");
  });

  it("width/height 모두 지정 시 size를 완전히 무시한다", () => {
    render(<HomeIcon size={32} width={10} height={14} />);
    const svg = screen.getByTestId("home-svg");
    expect(svg).toHaveAttribute("width", "10");
    expect(svg).toHaveAttribute("height", "14");
  });
});

describe("아이콘 컴포넌트 렌더링", () => {
  it.each([
    ["LogoIcon", LogoIcon, "logo-svg"],
    ["HomeIcon", HomeIcon, "home-svg"],
    ["NoteIcon", NoteIcon, "note-svg"],
    ["ClipIcon", ClipIcon, "clip-svg"],
    ["SearchIcon", SearchIcon, "search-svg"],
    ["ChartIcon", ChartIcon, "chart-svg"],
  ] as const)("%s가 렌더링된다", (_, Icon, testId) => {
    render(<Icon />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
