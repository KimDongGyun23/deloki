"use client";

import { useCallback, useSyncExternalStore } from "react";

import styled from "@emotion/styled";

import { THEME_COOKIE_KEY, THEME_DARK, THEME_LIGHT } from "@/constants/theme";
import { spacing, typography } from "@/styles/theme";

/**
 * 다크 모드 상태를 구독하는 함수
 * - HTML 요소의 data-theme 속성 변경을 감지하여 구독자에게 알림
 *
 * @param callback 데이터 변경 시 호출되는 콜백 함수
 * @returns 구독 해제 함수
 */
const subscribe = (callback: () => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
};

/**
 * 현재 다크 모드 상태를 반환하는 함수
 *
 * @returns 현재 다크 모드 여부 (true: 다크 모드, false: 라이트 모드)
 */
const getSnapshot = () => {
  const theme = document.documentElement.dataset.theme;
  return theme === THEME_DARK;
};

type DarkModeToggleProps = {
  isDarkMode?: boolean;
};

/**
 * 다크 모드 토글 컴포넌트
 * - 현재 다크 모드 상태를 외부 스토어에서 구독하여 일치하도록 유지
 * - 토글 버튼 클릭 시 쿠키에 테마 정보 저장 및 HTML 속성 업데이트
 * - SSR 렌더링 시 초기 상태를 props로 받아 hydration flash 방지
 *
 * @param isDarkMode 초기 다크 모드 상태 (SSR 렌더링 시 클로저로 사용)
 */
export const DarkModeToggle = ({ isDarkMode = false }: DarkModeToggleProps) => {
  // getServerSnapshot을 isDarkMode로 클로저
  // SSR 렌더와 쿠키 값이 일치해 hydration flash 방지
  const isDark = useSyncExternalStore(subscribe, getSnapshot, () => isDarkMode);

  /**
   * 다크 모드 토글 핸들러
   * - 쿠키에 테마 정보 저장
   * - HTML 요소의 data-theme 속성 업데이트하여 CSS 변수 적용
   */
  const toggle = useCallback(() => {
    const next = !isDark;
    const theme = next ? THEME_DARK : THEME_LIGHT;
    document.cookie = `${THEME_COOKIE_KEY}=${theme}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.dataset.theme = theme;
  }, [isDark]);

  return (
    <Wrapper>
      <Label>Dark Mode</Label>
      <ToggleButton
        isDark={isDark}
        onClick={toggle}
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.xs} ${spacing.md};
`;

const Label = styled.span`
  font-size: ${typography.fontSize.sm};
  color: var(--color-muted-foreground);
`;

const ToggleButton = styled.button<{ isDark: boolean }>`
  position: relative;
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background-color: ${({ isDark }) => (isDark ? "var(--color-primary)" : "var(--color-accent)")};
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  /* 토글 원형 핸들 */
  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ isDark }) => (isDark ? "21px" : "3px")};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--color-card);
    transition: left 0.2s ease;
  }
`;
