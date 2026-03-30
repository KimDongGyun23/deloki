import { describe, expect, it } from "vitest";

import {
  createDefaultNoteFormValues,
  createEmptyConceptSection,
  createEmptyKeyPoint,
  createEmptyQAPair,
  createEmptyReference,
  noteFormSchema,
} from "../schemas";

describe("_schemas", () => {
  describe("noteFormSchema 유효성 검사", () => {
    const validData = {
      title: "테스트 노트",
      category: "frontend" as const,
      tags: "react nextjs",
      keyPoints: [{ id: "1", content: "포인트 1" }],
      conceptSections: [{ id: "1", title: "섹션 1", content: "내용" }],
      qaPairs: [{ id: "1", question: "질문", answer: "답변" }],
      references: [],
    };

    it("유효한 데이터는 통과한다", () => {
      const result = noteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("title이 빈 문자열이면 실패한다", () => {
      const result = noteFormSchema.safeParse({ ...validData, title: "" });
      expect(result.success).toBe(false);
    });

    it("title 오류 메시지는 '제목을 입력해주세요'다", () => {
      const result = noteFormSchema.safeParse({ ...validData, title: "" });
      if (!result.success) {
        const titleError = result.error.issues.find((i) =>
          i.path.includes("title"),
        );
        expect(titleError?.message).toBe("제목을 입력해주세요");
      }
    });

    it("유효하지 않은 category는 실패한다", () => {
      const result = noteFormSchema.safeParse({
        ...validData,
        category: "invalid",
      });
      expect(result.success).toBe(false);
    });

    it("keyPoints가 빈 배열이면 실패한다", () => {
      const result = noteFormSchema.safeParse({ ...validData, keyPoints: [] });
      expect(result.success).toBe(false);
    });

    it("conceptSections가 빈 배열이면 실패한다", () => {
      const result = noteFormSchema.safeParse({
        ...validData,
        conceptSections: [],
      });
      expect(result.success).toBe(false);
    });

    it("qaPairs가 빈 배열이면 실패한다", () => {
      const result = noteFormSchema.safeParse({ ...validData, qaPairs: [] });
      expect(result.success).toBe(false);
    });

    it("references는 빈 배열이어도 통과한다", () => {
      const result = noteFormSchema.safeParse({
        ...validData,
        references: [],
      });
      expect(result.success).toBe(true);
    });
  });

  describe("createEmptyKeyPoint", () => {
    it("고유한 id를 가진다", () => {
      const a = createEmptyKeyPoint();
      const b = createEmptyKeyPoint();
      expect(a.id).not.toBe(b.id);
    });

    it("content가 빈 문자열이다", () => {
      expect(createEmptyKeyPoint().content).toBe("");
    });
  });

  describe("createEmptyConceptSection", () => {
    it("고유한 id를 가진다", () => {
      const a = createEmptyConceptSection();
      const b = createEmptyConceptSection();
      expect(a.id).not.toBe(b.id);
    });

    it("title과 content가 빈 문자열이다", () => {
      const section = createEmptyConceptSection();
      expect(section.title).toBe("");
      expect(section.content).toBe("");
    });
  });

  describe("createEmptyQAPair", () => {
    it("고유한 id를 가진다", () => {
      const a = createEmptyQAPair();
      const b = createEmptyQAPair();
      expect(a.id).not.toBe(b.id);
    });

    it("question과 answer가 빈 문자열이다", () => {
      const pair = createEmptyQAPair();
      expect(pair.question).toBe("");
      expect(pair.answer).toBe("");
    });
  });

  describe("createEmptyReference", () => {
    it("고유한 id를 가진다", () => {
      const a = createEmptyReference();
      const b = createEmptyReference();
      expect(a.id).not.toBe(b.id);
    });

    it("url과 label이 빈 문자열이다", () => {
      const ref = createEmptyReference();
      expect(ref.url).toBe("");
      expect(ref.label).toBe("");
    });
  });

  describe("createDefaultNoteFormValues", () => {
    it("title이 빈 문자열이다", () => {
      expect(createDefaultNoteFormValues().title).toBe("");
    });

    it("tags가 빈 문자열이다", () => {
      expect(createDefaultNoteFormValues().tags).toBe("");
    });

    it("keyPoints가 1개의 빈 항목으로 초기화된다", () => {
      const values = createDefaultNoteFormValues();
      expect(values.keyPoints).toHaveLength(1);
      expect(values.keyPoints[0].content).toBe("");
    });

    it("conceptSections가 1개의 빈 항목으로 초기화된다", () => {
      const values = createDefaultNoteFormValues();
      expect(values.conceptSections).toHaveLength(1);
      expect(values.conceptSections[0].title).toBe("");
      expect(values.conceptSections[0].content).toBe("");
    });

    it("qaPairs가 1개의 빈 항목으로 초기화된다", () => {
      const values = createDefaultNoteFormValues();
      expect(values.qaPairs).toHaveLength(1);
      expect(values.qaPairs[0].question).toBe("");
      expect(values.qaPairs[0].answer).toBe("");
    });

    it("references가 빈 배열이다", () => {
      expect(createDefaultNoteFormValues().references).toEqual([]);
    });

    it("호출마다 고유한 id를 가진다", () => {
      const a = createDefaultNoteFormValues();
      const b = createDefaultNoteFormValues();
      expect(a.keyPoints[0].id).not.toBe(b.keyPoints[0].id);
    });
  });
});
