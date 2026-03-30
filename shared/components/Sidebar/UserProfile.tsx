type UserProfileProps = {
  name: string;
};

/**
 * 사용자 프로필 컴포넌트
 * - 사용자 이름과 아바타(이름 첫 글자) 표시
 * - 간단한 스타일링으로 사이드바 하단에 배치
 *
 * @param name 사용자 이름
 */
export const UserProfile = ({ name }: UserProfileProps) => {
  // 이름 첫 글자를 아바타에 사용
  const initial = name.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="mx-2 flex items-center gap-4 rounded-lg bg-muted px-4 py-2">
      <div
        aria-label={`${name} 프로필 아바타`}
        role="img"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-card"
      >
        {initial}
      </div>
      <span className="text-sm font-medium text-foreground">
        {name}
      </span>
    </div>
  );
};
