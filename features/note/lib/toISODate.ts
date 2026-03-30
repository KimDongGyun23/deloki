/**
 * 날짜 문자열(YYYY.MM.DD)을 ISO 형식(YYYY-MM-DD)으로 변환하는 헬퍼 함수
 * - 입력 형식 검증: YYYY.MM.DD 형식이 아니거나 유효하지 않은 날짜는 오류 발생
 * - ISO 변환: Date 객체를 사용하여 ISO 형식으로 변환 (시간 정보 제거)
 *
 * @param dateStr 변환할 날짜 문자열 (예: "2024.01.30")
 * @returns ISO 형식의 날짜 문자열 (예: "2024-01-30")
 * @throws {Error} 입력이 유효한 날짜 형식이 아닐 경우
 */
export const toISODate = (dateStr: string): string => {
  // 정규식으로 형식 검증 먼저
  const isoMatch = dateStr.match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
  if (!isoMatch) {
    throw new Error("YYYY.MM.DD 형식이 아닙니다");
  }

  const [, year, month, day] = isoMatch;
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (
    isNaN(date.getTime()) ||
    date.getFullYear() !== Number(year) ||
    date.getMonth() + 1 !== Number(month) ||
    date.getDate() !== Number(day)
  ) {
    throw new Error("유효하지 않은 날짜입니다");
  }

  return `${year}-${month}-${day}`;
};
