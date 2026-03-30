import { TAG_COLOR_NAMES, type TagColor } from "@/shared/constants/tag-colors";
import { cn } from "@/shared/lib/cn";

// CSS 변수 기반 색상 토큰 — Tailwind 유틸리티로 등록된 값
const COLOR_TOKENS: { label: string; bgClass: string; textClass: string }[] = [
  { label: "Primary", bgClass: "bg-primary", textClass: "text-white" },
  {
    label: "Primary Light",
    bgClass: "bg-primary-light",
    textClass: "text-primary-dark",
  },
  {
    label: "Primary Dark",
    bgClass: "bg-primary-dark",
    textClass: "text-white",
  },
  { label: "Secondary", bgClass: "bg-secondary", textClass: "text-foreground" },
  { label: "Muted", bgClass: "bg-muted", textClass: "text-muted-foreground" },
  { label: "Destructive", bgClass: "bg-destructive", textClass: "text-white" },
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-200 flex-col gap-8 px-6 py-8">
      {/* CSS 변수 (라이트/다크 자동 전환) 확인 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-foreground text-2xl font-bold">
          Colors (CSS Variables)
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {COLOR_TOKENS.map(({ label, bgClass, textClass }) => (
            <div
              key={label}
              className={cn(
                "rounded-xl p-6 text-sm font-semibold shadow-md",
                bgClass,
                textClass,
              )}
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* Tailwind shadow 토큰 확인 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-foreground text-2xl font-bold">Shadows</h2>
        <div className="grid grid-cols-3 gap-4">
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <div
              key={size}
              className={cn(
                "bg-card text-foreground rounded-xl p-6 text-center text-sm",
                `shadow-${size}`,
              )}
            >
              shadow-{size}
            </div>
          ))}
        </div>
      </section>

      {/* tagColors 토큰 확인 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-foreground text-2xl font-bold">Tag Colors</h2>
        <div className="flex flex-wrap gap-2">
          {TAG_COLOR_NAMES.map((color: TagColor) => (
            <span
              key={color}
              className="font-display inline-flex items-center rounded-2xl px-2 py-1 text-sm font-semibold"
              style={{
                // CSS 변수로 라이트/다크 자동 전환
                backgroundColor: `var(--tag-${color}-bg)`,
                color: `var(--tag-${color}-text)`,
              }}
            >
              {color}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
