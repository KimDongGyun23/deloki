/**
 * 태그 색상 상수
 * - 태그에 사용할 수 있는 색상 이름 목록을 정의
 * - 각 색상은 Tailwind CSS 클래스와 매핑되어 UI에서 일관된 스타일링 제공
 */
export const TAG_COLOR_NAMES = [
  "blue",
  "green",
  "purple",
  "orange",
  "pink",
  "teal",
  "yellow",
  "red",
  "indigo",
  "gray",
] as const;

export type TagColor = (typeof TAG_COLOR_NAMES)[number];
