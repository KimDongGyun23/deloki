import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스 조건부 병합 유틸
 * - clsx: 조건부 클래스 처리
 * - twMerge: 충돌하는 Tailwind 클래스 자동 제거
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
