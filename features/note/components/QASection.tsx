"use client";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import {
  createEmptyQAPair,
  NOTE_FORM_FIELDS,
  type NoteFormValues,
} from "../schemas";
import { AutoResizeTextarea } from "./AutoResizeTextarea";
import {
  AddButton,
  FieldLabel,
  inputCls,
  RemoveButton,
  SectionCard,
  SectionTitle,
} from "./shared";

/**
 * Q&A Archive 섹션
 * - useFieldArray로 질문-답변 쌍 관리
 * - 질문(register) + 답변(Controller + AutoResizeTextarea)
 * - 1개일 땐 제거 버튼 숨김
 */
export const QASection = () => {
  const { register, control } = useFormContext<NoteFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: NOTE_FORM_FIELDS.qaPairs,
    keyName: "_key",
  });

  return (
    <SectionCard>
      <SectionTitle>Q&A Archive</SectionTitle>

      <div className="font-display flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field._key}
            className="border-secondary rounded-xl border p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <FieldLabel>Question</FieldLabel>
              {fields.length > 1 && (
                <RemoveButton
                  onClick={() => remove(index)}
                  label="Q&A 쌍 제거"
                />
              )}
            </div>

            <input
              {...register(`${NOTE_FORM_FIELDS.qaPairs}.${index}.question`)}
              placeholder="Next.js에서 hydration 문제는 어떻게 해결하나요?"
              className={inputCls}
            />

            <FieldLabel className="mt-6 block">Answer</FieldLabel>
            <Controller
              control={control}
              name={`${NOTE_FORM_FIELDS.qaPairs}.${index}.answer`}
              render={({ field }) => (
                <AutoResizeTextarea
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  placeholder="서버와 클라이언트 렌더링 결과가 달라지지 않게..."
                  minRows={3}
                  className="bg-muted mt-1 rounded-xl px-3 py-2"
                />
              )}
            />
          </div>
        ))}
      </div>

      <AddButton onClick={() => append(createEmptyQAPair())}>
        + add more pair
      </AddButton>
    </SectionCard>
  );
};
