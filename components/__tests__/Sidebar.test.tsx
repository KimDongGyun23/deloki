import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Sidebar } from "../Sidebar/Sidebar";

// SVG 아이콘 컴포넌트 mock
vi.mock("@/components/Icons", () => ({
  HomeIcon: () => <svg data-testid="icon-home" />,
  NoteIcon: () => <svg data-testid="icon-note" />,
  ClipIcon: () => <svg data-testid="icon-clip" />,
  SearchIcon: () => <svg data-testid="icon-search" />,
  ChartIcon: () => <svg data-testid="icon-chart" />,
  LogoIcon: () => <svg data-testid="icon-logo" />,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Sidebar", () => {
  it("로고 타이틀을 렌더링한다", () => {
    render(<Sidebar />);
    expect(screen.getByText("De Loki")).toBeInTheDocument();
  });

  it("로고 서브타이틀을 렌더링한다", () => {
    render(<Sidebar />);
    expect(screen.getByText("지식 아카이브")).toBeInTheDocument();
  });

  it("모든 네비게이션 메뉴를 렌더링한다", () => {
    render(<Sidebar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("Links")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Graph")).toBeInTheDocument();
  });

  it("Dark Mode 토글을 렌더링한다", () => {
    render(<Sidebar />);
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });

  it("Logout 버튼을 렌더링한다", () => {
    render(<Sidebar />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("userName prop으로 사용자 이름을 표시한다", () => {
    render(<Sidebar userName="Loki" />);
    expect(screen.getByText("Loki")).toBeInTheDocument();
  });

  it("onLogout prop이 Logout 버튼에 연결된다", async () => {
    const onLogout = vi.fn();
    render(<Sidebar onLogout={onLogout} />);
    await userEvent.click(screen.getByText("Logout"));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it("onLogout prop 없이 Logout 버튼 클릭 시 에러 없이 동작한다", async () => {
    render(<Sidebar />);
    await userEvent.click(screen.getByText("Logout"));
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("isDarkMode prop을 DarkModeToggle에 전달한다", () => {
    document.documentElement.dataset.theme = "dark";
    render(<Sidebar isDarkMode={true} />);
    expect(
      screen.getByRole("switch", { name: "라이트 모드로 전환" }),
    ).toBeInTheDocument();
    delete document.documentElement.dataset.theme;
  });
});
