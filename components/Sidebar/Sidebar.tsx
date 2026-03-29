"use client";

import { ChartIcon, ClipIcon, HomeIcon, LogoIcon, NoteIcon, SearchIcon } from "@/components/Icons";

import { DarkModeToggle } from "./DarkModeToggle";
import { NavItem } from "./NavItem";
import { UserProfile } from "./UserProfile";

/**
 * 네비게이션 아이템 데이터
 * - href: 메뉴 항목의 경로
 * - label: 메뉴 항목의 레이블
 * - Icon: 메뉴 항목에 사용할 아이콘 컴포넌트
 */
const NAV_ITEMS = [
  { href: "/", label: "Dashboard", Icon: HomeIcon },
  { href: "/notes", label: "Notes", Icon: NoteIcon },
  { href: "/links", label: "Links", Icon: ClipIcon },
  { href: "/search", label: "Search", Icon: SearchIcon },
  { href: "/graph", label: "Graph", Icon: ChartIcon },
] as const;

type SidebarProps = {
  userName?: string;
  isDarkMode?: boolean;
  onLogout?: () => void;
};

/**
 * 사이드바 컴포넌트
 *
 * @param userName 사용자 이름 (프로필 표시용)
 * @param onLogout 로그아웃 핸들러 함수
 * @param isDarkMode 초기 다크 모드 상태 (SSR 렌더링 시 클로저로 사용)
 */
export const Sidebar = ({ userName = "Loki", isDarkMode, onLogout = () => {} }: SidebarProps) => {
  return (
    <aside className="flex w-65 min-h-screen shrink-0 flex-col gap-6 border-r border-secondary bg-card px-2 py-6 shadow-sm">
      {/* 로고 */}
      <div className="flex items-center gap-4 px-4 py-2">
        <div className="flex aspect-square items-center justify-center rounded-lg bg-primary-light text-primary">
          <LogoIcon />
        </div>

        <div className="flex flex-col py-1">
          <span className="text-base font-bold leading-tight text-foreground">
            De Loki
          </span>
          <span className="font-display text-xs text-muted-foreground">
            지식 아카이브
          </span>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, Icon }) => (
          <NavItem key={href} href={href} label={label} Icon={Icon} />
        ))}
      </nav>

      {/* 하단 영역 */}
      <div className="flex flex-col gap-2 border-t border-secondary pt-4">
        <button
          type="button"
          onClick={onLogout}
          className="px-4 py-1 text-left text-sm text-muted-foreground hover:text-foreground"
        >
          Logout
        </button>
        <DarkModeToggle isDarkMode={isDarkMode} />
        <UserProfile name={userName} />
      </div>
    </aside>
  );
};
