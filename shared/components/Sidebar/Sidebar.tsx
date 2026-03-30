"use client";

import {
  ChartIcon,
  ClipIcon,
  HomeIcon,
  LogoIcon,
  NoteIcon,
  SearchIcon,
} from "@/shared/components/Icons";

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
export const Sidebar = ({
  userName = "Loki",
  isDarkMode,
  onLogout = () => {},
}: SidebarProps) => {
  return (
    <aside className="border-secondary bg-card flex min-h-screen w-65 shrink-0 flex-col gap-6 border-r px-2 py-6 shadow-sm">
      {/* 로고 */}
      <div className="flex items-center gap-4 px-4 py-2">
        <div className="bg-primary-light text-primary flex aspect-square h-full items-center justify-center rounded-lg">
          <LogoIcon />
        </div>

        <div className="flex flex-col py-1">
          <span className="text-foreground text-base leading-tight font-bold">
            De Loki
          </span>
          <span className="font-display text-muted-foreground text-xs">
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
      <div className="border-secondary flex flex-col gap-2 border-t pt-4">
        <button
          type="button"
          onClick={onLogout}
          className="text-muted-foreground hover:text-foreground px-4 py-1 text-left text-sm"
        >
          Logout
        </button>
        <DarkModeToggle isDarkMode={isDarkMode} />
        <UserProfile name={userName} />
      </div>
    </aside>
  );
};
