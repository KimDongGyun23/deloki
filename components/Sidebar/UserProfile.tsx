import styled from "@emotion/styled";

import { borderRadius, spacing, typography } from "@/styles/theme";

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
    <ProfileCard>
      <Avatar aria-label={`${name} 프로필 아바타`} role="img">
        {initial}
      </Avatar>
      <Name>{name}</Name>
    </ProfileCard>
  );
};

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.sm};
  background-color: var(--color-muted);
  margin: 0 ${spacing.sm};
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: var(--color-card);
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  flex-shrink: 0;
`;

const Name = styled.span`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: var(--color-foreground);
`;
