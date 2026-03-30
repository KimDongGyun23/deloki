import { Controller, useFormContext } from "react-hook-form";

import { cn } from "@/lib/cn";

import type { NoteFormValues } from "../schemas";
import { CategorySelect } from "./CategorySelect";
import { FieldLabel, inputCls, SectionCard } from "./shared";

/**
 * 노트 기본 정보 섹션 (제목 / 카테고리 / 태그)
 *
 * - title: 텍스트 입력, 필수
 * - category: Controller로 래핑된 select
 * - tags: 스페이스 구분 문자열 입력
 */
export const NoteBasicInfoSection = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NoteFormValues>();

  return (
    <SectionCard className="flex flex-col gap-7">
      <div>
        <FieldLabel>The Core Essence</FieldLabel>
        <input
          {...register("title")}
          placeholder="어떤 이야기를 적어볼까요?"
          className="text-foreground font-display placeholder:text-muted-foreground mt-2 w-full rounded-md bg-transparent text-xl font-semibold focus:outline-none"
        />
        {errors.title && (
          <p className="text-destructive font-display mt-1 text-xs">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <FieldLabel>Category</FieldLabel>
          <div className="font-display mt-2">
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <CategorySelect value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.category && (
              <p className="text-destructive font-display mt-1 text-xs">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <FieldLabel>Keywords (Tags)</FieldLabel>
          <input
            {...register("tags")}
            placeholder="Space-separated #tags..."
            className={cn(inputCls, "font-display mt-2")}
          />
        </div>
      </div>
    </SectionCard>
  );
};
