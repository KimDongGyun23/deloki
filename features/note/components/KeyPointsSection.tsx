"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import {
  createEmptyKeyPoint,
  NOTE_FORM_FIELDS,
  type NoteFormValues,
} from "../schemas";
import {
  AddButton,
  inputCls,
  RemoveButton,
  SectionCard,
  SectionTitle,
} from "./shared";

/**
 * Key Points 섹션
 * - useFieldArray로 동적 불렛 포인트 관리
 * - 1개일 땐 제거 버튼 숨김
 */
export const KeyPointsSection = () => {
  const { register, control } = useFormContext<NoteFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: NOTE_FORM_FIELDS.keyPoints,
    keyName: "_key",
  });

  return (
    <SectionCard>
      <SectionTitle>Key Points</SectionTitle>

      <div className="font-display flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={field._key} className="flex items-center gap-3">
            <span className="bg-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white">
              {index + 1}
            </span>
            <input
              {...register(`${NOTE_FORM_FIELDS.keyPoints}.${index}.content`)}
              placeholder="hydration은 서버에서 만든 HTML을 클라이언트에서..."
              className={inputCls}
              aria-label={`Key Point ${index + 1}`}
            />
            {fields.length > 1 && (
              <RemoveButton
                onClick={() => remove(index)}
                label="Key Point 제거"
              />
            )}
          </div>
        ))}
      </div>

      <AddButton onClick={() => append(createEmptyKeyPoint())}>
        + add more wisdom
      </AddButton>
    </SectionCard>
  );
};
