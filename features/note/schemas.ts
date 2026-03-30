import { z } from "zod";

import { NOTE_CATEGORY_VALUES, type NoteCategory } from "./constants";

export const keyPointSchema = z.object({
  id: z.string(),
  content: z.string(),
});

export const conceptSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export const qaPairSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const referenceSchema = z.object({
  id: z.string(),
  url: z.string(),
  label: z.string(),
});

/**
 * 노트 생성/수정 폼 스키마
 *
 * - title: 필수, 최소 1자
 * - category: NOTE_CATEGORIES 중 하나 (all 제외)
 * - tags: 스페이스 구분 문자열
 * - keyPoints/conceptSections/qaPairs: 최소 1개
 * - references: 선택
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

export const NOTE_FORM_FIELDS = noteFormSchema.keyof().enum;

export type NoteFormValues = z.infer<typeof noteFormSchema>;
export type KeyPoint = z.infer<typeof keyPointSchema>;
export type ConceptSection = z.infer<typeof conceptSectionSchema>;
export type QAPair = z.infer<typeof qaPairSchema>;
export type Reference = z.infer<typeof referenceSchema>;

// 유틸리티 함수: 빈 폼 필드 생성
const createId = (): string => crypto.randomUUID();

export const createEmptyKeyPoint = (): KeyPoint => ({
  id: createId(),
  content: "",
});

export const createEmptyConceptSection = (): ConceptSection => ({
  id: createId(),
  title: "",
  content: "",
});

export const createEmptyQAPair = (): QAPair => ({
  id: createId(),
  question: "",
  answer: "",
});

export const createEmptyReference = (): Reference => ({
  id: createId(),
  url: "",
  label: "",
});

export const createDefaultNoteFormValues = (): NoteFormValues => ({
  title: "",
  category: "" as NoteCategory,
  tags: "",
  keyPoints: [createEmptyKeyPoint()],
  conceptSections: [createEmptyConceptSection()],
  qaPairs: [createEmptyQAPair()],
  references: [],
});
