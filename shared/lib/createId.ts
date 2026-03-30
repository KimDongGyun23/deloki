/**
 * 고유한 ID를 생성하는 유틸 함수
 * - crypto.randomUUID()를 사용하여 UUID v4 형식의 ID 생성
 * - Note, KeyPoint, ConceptSection 등에서 고유 식별자로 활용
 *
 * @returns 고유한 문자열 ID
 */
export const createId = (): string => {
  return crypto.randomUUID();
};
