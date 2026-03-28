"use client";

import styled from "@emotion/styled";

import { ChartIcon, ClipIcon, HomeIcon, LogoIcon, NoteIcon, SearchIcon } from "@/components/Icons";
import { borderRadius, shadows, spacing, typography } from "@/styles/theme";

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
    <Wrapper>
      {/* 로고 */}
      <LogoArea>
        <LogoIconWrapper>
          <LogoIcon />
        </LogoIconWrapper>

        <LogoText>
          <LogoTitle>De Loki</LogoTitle>
          <LogoSubtitle>지식 아카이브</LogoSubtitle>
        </LogoText>
      </LogoArea>

      {/* 네비게이션 */}
      <Nav>
        {NAV_ITEMS.map(({ href, label, Icon }) => (
          <NavItem key={href} href={href} label={label} Icon={Icon} />
        ))}
      </Nav>

      {/* 하단 영역 */}
      <BottomArea>
        <LogoutButton type="button" onClick={onLogout}>
          Logout
        </LogoutButton>
        <DarkModeToggle isDarkMode={isDarkMode} />
        <UserProfile name={userName} />
      </BottomArea>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  width: 260px;
  min-height: 100vh;
  padding: ${spacing.lg} ${spacing.sm};
  background-color: var(--color-card);
  border-right: 1px solid var(--color-secondary);
  box-shadow: ${shadows.sm};
  flex-shrink: 0;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.sm} ${spacing.md};
`;

const LogoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: ${borderRadius.sm};
  background-color: var(--color-primary-light);
  color: var(--color-primary);
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.xs} 0;
`;

const LogoTitle = styled.span`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.bold};
  color: var(--color-foreground);
  line-height: 1.2;
`;

const LogoSubtitle = styled.span`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.xs};
  color: var(--color-muted-foreground);
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  flex: 1;
`;

const BottomArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding-top: ${spacing.md};
  border-top: 1px solid var(--color-secondary);
`;

const LogoutButton = styled.button`
  padding: ${spacing.xs} ${spacing.md};
  font-size: ${typography.fontSize.sm};
  color: var(--color-muted-foreground);
  text-align: left;

  &:hover {
    color: var(--color-foreground);
  }
`;
