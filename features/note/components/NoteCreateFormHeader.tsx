type NoteCreateFormHeaderProps = {
  onDiscard: () => void;
};

/**
 * 노트 생성 폼 고정 헤더
 *
 * - Discard: 목록으로 돌아가기
 * - Publish Note: 폼 submit 트리거
 */
export const NoteCreateFormHeader = ({ onDiscard }: NoteCreateFormHeaderProps) => (
  <header className="border-secondary bg-card flex shrink-0 items-center justify-between border-b px-6 py-4">
    <h1 className="text-foreground text-2xl font-bold">Create Note</h1>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDiscard}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-150"
      >
        Discard
      </button>
      <button
        type="submit"
        className="bg-primary hover:bg-primary/90 font-display rounded-xl px-4 py-1.5 text-sm font-medium text-white transition-colors duration-150"
      >
        Publish Note
      </button>
    </div>
  </header>
);
