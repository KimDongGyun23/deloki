"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { DeepConceptSection } from "../components/DeepConceptSection";
import { KeyPointsSection } from "../components/KeyPointsSection";
import { NoteBasicInfoSection } from "../components/NoteBasicInfoSection";
import { QASection } from "../components/QASection";
import { ReferencesSection } from "../components/ReferencesSection";
import {
  createDefaultNoteFormValues,
  noteFormSchema,
  type NoteFormValues,
} from "../schemas";
import { NoteCreateFormHeader } from "./NoteCreateFormHeader";

/**
 * 노트 생성 폼 클라이언트 컴포넌트
 *
 * - react-hook-form + zodResolver로 폼 상태/검증 통합
 * - FormProvider로 context 제공 → 각 섹션이 useFormContext로 직접 접근
 */
export const NoteCreateFormClient = () => {
  const router = useRouter();

  const methods = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: createDefaultNoteFormValues(),
  });

  /**
   * 폼 취소 핸들러
   * - 현재는 단순히 노트 목록 페이지로 이동
   */
  const handleDiscard = () => router.push("/notes");

  /**
   * 노트 발행 핸들러
   */
  const onSubmit = () => {
    // TODO: API 호출
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex h-full flex-col"
      >
        <NoteCreateFormHeader onDiscard={handleDiscard} />
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
          <NoteBasicInfoSection />
          <KeyPointsSection />
          <DeepConceptSection />
          <QASection />
          <ReferencesSection />
        </div>
      </form>
    </FormProvider>
  );
};
