import Link from "next/link";

import { NoteTag } from "@/shared/components/NoteTag";
import type { NoteListItem } from "@/shared/types/note";

type NoteCardProps = {
  note: NoteListItem;
};

/**
 * 노트 목록 카드 컴포넌트
 * - 제목, 태그, 생성일을 표시
 * - 카드 전체가 링크로 동작 (`/notes/detail/[id]`)
 * - 태그는 NoteTag 공통 컴포넌트로 렌더링
 *
 * @param note 렌더링할 노트 데이터 (id, title, tags, createdAt 포함)
 */
const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Link
      href={`/notes/detail/${note.id}`}
      className="bg-card font-display border-secondary flex flex-col gap-6 rounded-xl border p-5 transition-shadow duration-200 hover:shadow-md"
    >
      <h2 className="text-foreground line-clamp-2 text-base leading-snug font-medium">
        {note.title}
      </h2>

      <div className="mt-auto flex items-end justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {note.tags.map((tag) => (
            <NoteTag key={tag.name} name={tag.name} color={tag.color} />
          ))}
        </div>

        <time
          dateTime={note.createdAt}
          className="text-muted-foreground shrink-0 text-xs"
        >
          {note.createdAt}
        </time>
      </div>
    </Link>
  );
};

type NoteCardListProps = {
  notes: NoteListItem[];
};

/**
 * 노트 카드 그리드 컴포넌트
 * - 2컬럼 그리드 레이아웃
 * - 데이터 없을 경우 빈 상태 메시지 렌더링
 * - 필터링/정렬/페이지네이션은 호출 측에서 처리 후 전달
 *
 * @param notes 렌더링할 노트 배열 (최종 가공된 데이터)
 */
export const NoteCardList = ({ notes }: NoteCardListProps) => {
  if (notes.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-1 items-center justify-center py-20 text-sm">
        노트가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};
