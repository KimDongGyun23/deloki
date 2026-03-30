"use client";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { CloseIcon } from "@/components/Icons";

import {
  createEmptyConceptSection,
  NOTE_FORM_FIELDS,
  type NoteFormValues,
} from "../schemas";
import { AutoResizeTextarea } from "./AutoResizeTextarea";
import { AddButton, FieldLabel, SectionCard, SectionTitle } from "./shared";

/**
 * Deep Concept 섹션
 * - useFieldArray로 섹션 단위 본문 관리
 * - 섹션 제목(register) + 내용(Controller + AutoResizeTextarea)
 * - 1개일 땐 제거 버튼 숨김
 */
export const DeepConceptSection = () => {
  const { register, control } = useFormContext<NoteFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: NOTE_FORM_FIELDS.conceptSections,
    keyName: "_key",
  });

  return (
    <SectionCard>
      <SectionTitle>Deep Concept</SectionTitle>

      <div className="font-display flex flex-col gap-3">
        {fields.map((field, index) => (
          <div
            key={field._key}
            className="border-secondary rounded-xl border p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <FieldLabel>Section {index + 1}</FieldLabel>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-muted-foreground hover:text-destructive flex items-center gap-0.5 text-xs transition-colors duration-150"
                >
                  <CloseIcon size={12} />
                  섹션 제거
                </button>
              )}
            </div>

            <input
              {...register(
                `${NOTE_FORM_FIELDS.conceptSections}.${index}.title`,
              )}
              placeholder="섹션 제목 (선택)"
              className="text-foreground placeholder:text-muted-foreground mb-3 w-full rounded-md bg-transparent text-sm font-medium focus:outline-none"
            />

            <Controller
              control={control}
              name={`${NOTE_FORM_FIELDS.conceptSections}.${index}.content`}
              render={({ field }) => (
                <AutoResizeTextarea
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  placeholder="생각을 자유롭게 펼쳐주세요!"
                  minRows={4}
                  className="bg-muted rounded-xl px-3 py-2"
                />
              )}
            />
          </div>
        ))}
      </div>

      <AddButton onClick={() => append(createEmptyConceptSection())}>
        + more add section
      </AddButton>
    </SectionCard>
  );
};
