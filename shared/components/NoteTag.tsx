import type { TagColor } from "@/shared/constants/tag-colors";

type NoteTagProps = {
  name: string;
  color: TagColor;
};

/**
 * 노트 태그 뱃지 컴포넌트
 * - CSS 변수 기반 색상 시스템으로 라이트/다크 테마 자동 대응
 * - color prop은 TAG_COLOR_NAMES 중 하나여야 함
 *
 * @param name 태그 이름 (예: "react", "typescript")
 * @param color 태그 색상 (예: "blue", "green", "red")
 */
export const NoteTag = ({ name, color }: NoteTagProps) => {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: `var(--tag-${color}-bg)`,
        color: `var(--tag-${color}-text)`,
      }}
    >
      #{name}
    </span>
  );
};
