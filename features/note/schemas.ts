import { z } from "zod";

import { createId } from "@/shared/lib/createId";

import { NOTE_CATEGORY_VALUES } from "./constants";

// 핵심 포인트 스키마
export const keyPointSchema = z.object({
  id: z.string(),
  content: z.string().trim().min(1, "핵심 포인트를 입력해주세요"),
});

// 개념 섹션 스키마
export const conceptSectionSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, "섹션 제목을 입력해주세요"),
  content: z.string().trim().min(1, "섹션 내용을 입력해주세요"),
});

// Q&A 쌍 스키마
export const qaPairSchema = z.object({
  id: z.string(),
  question: z.string().trim().min(1, "질문을 입력해주세요"),
  answer: z.string().trim().min(1, "답변을 입력해주세요"),
});

// 참고문헌 스키마
export const referenceSchema = z.object({
  id: z.string(),
  url: z.string().url("유효한 URL을 입력해주세요"),
  label: z.string().trim().min(1, "참조 라벨을 입력해주세요"),
});

export type KeyPoint = z.infer<typeof keyPointSchema>;
export type ConceptSection = z.infer<typeof conceptSectionSchema>;
export type QAPair = z.infer<typeof qaPairSchema>;
export type Reference = z.infer<typeof referenceSchema>;

/**
 * 노트 생성/수정 폼 스키마
 *
 * - title: 필수, 최소 1자
 * - category: NOTE_CATEGORIES 중 하나 (all 제외)
 * - tags: 스페이스 구분 문자열
 * - keyPoints/conceptSections/qaPairs: 최소 1개
 * - references: 필수 배열 (빈 배열 허용)
 */
export const noteFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  category: z.enum(NOTE_CATEGORY_VALUES, {
    message: "카테고리를 선택해주세요",
  }),
  tags: z.string(),
  keyPoints: z.array(keyPointSchema).min(1),
  conceptSections: z.array(conceptSectionSchema).min(1),
  qaPairs: z.array(qaPairSchema).min(1),
  references: z.array(referenceSchema),
});

export type NoteFormValues = z.infer<typeof noteFormSchema>;

// noteFormSchema의 키를 타입으로 갖는 객체
export const NOTE_FORM_FIELDS = noteFormSchema.keyof().enum;

/**
 * 빈 핵심 포인트 객체를 생성하는 유틸 함수
 */
export const createEmptyKeyPoint = (): KeyPoint => {
  return { id: createId(), content: "" };
};

/**
 * 빈 개념 섹션 객체를 생성하는 유틸 함수
 */
export const createEmptyConceptSection = (): ConceptSection => {
  return { id: createId(), title: "", content: "" };
};

/**
 * 빈 Q&A 쌍 객체를 생성하는 유틸 함수
 */
export const createEmptyQAPair = (): QAPair => {
  return { id: createId(), question: "", answer: "" };
};

/**
 * 빈 참고문헌 객체를 생성하는 유틸 함수
 */
export const createEmptyReference = (): Reference => {
  return { id: createId(), url: "", label: "" };
};

/**
 * 노트 폼의 기본값을 생성하는 유틸 함수
 * - title, tags: 빈 문자열
 * - category: NOTE_CATEGORY_VALUES의 첫 번째 값
 * - keyPoints, conceptSections, qaPairs: 각각 1개의 빈 항목으로 초기화
 * - references: 빈 배열
 */
export const createDefaultNoteFormValues = (): NoteFormValues => {
  return {
    title: "",
    category: NOTE_CATEGORY_VALUES[0],
    tags: "",
    keyPoints: [createEmptyKeyPoint()],
    conceptSections: [createEmptyConceptSection()],
    qaPairs: [createEmptyQAPair()],
    references: [],
  };
};
