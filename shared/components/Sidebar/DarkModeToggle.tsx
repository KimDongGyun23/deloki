"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  THEME_COOKIE_KEY,
  THEME_DARK,
  THEME_LIGHT,
} from "@/shared/constants/theme";
import { cn } from "@/shared/lib/cn";

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

/**
 * 쿠키 저장 함수
 * - 테마 정보를 쿠키에 저장하여 페이지 간 상태 유지
 *
 * @param theme 저장할 테마 값 (THEME_DARK 또는 THEME_LIGHT)
 */
const setThemeCookie = (theme: string) => {
  document.cookie = `${THEME_COOKIE_KEY}=${theme}; path=/; max-age=31536000; SameSite=Lax`;
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
    setThemeCookie(theme);
    document.documentElement.dataset.theme = theme;
  }, [isDark]);

  return (
    <div className="flex items-center justify-between px-4 py-1">
      <span className="text-muted-foreground text-sm">Dark Mode</span>
      <button
        onClick={toggle}
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
        className={cn(
          "relative h-5.5 w-10 shrink-0 rounded-[11px] transition-colors duration-200",
          "after:bg-card after:absolute after:top-0.75 after:h-4 after:w-4 after:rounded-full after:transition-[left] after:duration-200 after:content-['']",
          isDark ? "bg-primary after:left-5.25" : "bg-accent after:left-0.75",
        )}
      />
    </div>
  );
};
