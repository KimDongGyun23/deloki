"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import {
  createEmptyReference,
  NOTE_FORM_FIELDS,
  type NoteFormValues,
} from "../schemas";
import {
  AddButton,
  FieldLabel,
  inputCls,
  RemoveButton,
  SectionCard,
  SectionTitle,
} from "./shared";

/**
 * References 섹션
 *
 * - useFieldArray로 참고문헌 목록 관리
 * - 제목(label) → URL 순 상하 배치
 * - 1개일 땐 제거 버튼 숨김
 */
export const ReferencesSection = () => {
  const { register, control } = useFormContext<NoteFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: NOTE_FORM_FIELDS.references,
    keyName: "_key",
  });

  return (
    <SectionCard>
      <SectionTitle>References</SectionTitle>

      <div className="font-display flex flex-col gap-6">
        {fields.map((field, index) => (
          <div key={field._key} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <FieldLabel>{index + 1}번 참고문헌</FieldLabel>
              <RemoveButton
                onClick={() => remove(index)}
                label="참고문헌 제거"
                size={14}
              />
            </div>

            <input
              {...register(`${NOTE_FORM_FIELDS.references}.${index}.label`)}
              placeholder="제목 (예: React 공식 문서 - Suspense)"
              className={inputCls}
            />

            <input
              {...register(`${NOTE_FORM_FIELDS.references}.${index}.url`)}
              type="url"
              placeholder="https://..."
              className={inputCls}
            />
          </div>
        ))}
      </div>

      <AddButton onClick={() => append(createEmptyReference())}>
        + add more reference
      </AddButton>
    </SectionCard>
  );
};
