import { NoteCreateFormClient } from "@/features/note/components/NoteCreateFormClient";

/**
 * 새 노트 생성 페이지
 *
 * - 클라이언트 상호작용은 NoteCreateFormClient에 위임
 */
export default function NewNotePage() {
  return <NoteCreateFormClient />;
}
