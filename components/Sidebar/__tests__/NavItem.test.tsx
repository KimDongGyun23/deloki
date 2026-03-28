import { ComponentProps } from "react";

import { usePathname } from "next/navigation";

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NavItem } from "../NavItem";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

const MockIcon = () => <svg data-testid="nav-icon" />;

describe("NavItem", () => {
  it("레이블과 아이콘을 렌더링한다", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<NavItem href="/" label="Dashboard" Icon={MockIcon} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("nav-icon")).toBeInTheDocument();
  });

  it("href가 올바른 링크를 렌더링한다", () => {
    vi.mocked(usePathname).mockReturnValue("/notes");
    render(<NavItem href="/notes" label="Notes" Icon={MockIcon} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/notes");
  });

  it("현재 경로와 일치하면 aria-current=page를 가진다", () => {
    vi.mocked(usePathname).mockReturnValue("/notes");
    render(<NavItem href="/notes" label="Notes" Icon={MockIcon} />);
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("현재 경로와 다르면 aria-current가 없다", () => {
    vi.mocked(usePathname).mockReturnValue("/notes");
    render(<NavItem href="/links" label="Links" Icon={MockIcon} />);
    expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
  });

  it("하위 경로에서도 active 처리된다", () => {
    vi.mocked(usePathname).mockReturnValue("/notes/123");
    render(<NavItem href="/notes" label="Notes" Icon={MockIcon} />);
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("Dashboard(/)는 하위 경로에서 active 처리되지 않는다", () => {
    vi.mocked(usePathname).mockReturnValue("/notes");
    render(<NavItem href="/" label="Dashboard" Icon={MockIcon} />);
    expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
  });
});
