import { CodeIcon, SendIcon } from "lucide-react";
import React, { useState } from "react";
import CommentContent from "./CommentContent";

interface Props {
  onSubmit: (content: string) => Promise<void>;
  isSubmitting: boolean;
}

const CommentForm = ({ onSubmit, isSubmitting }: Props) => {
  const [comment, setComment] = useState<string>("");
  const [isPreview, setPreview] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newComent =
        comment.substring(0, start) + "  " + comment.substring(end);
      setComment(newComent);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    await onSubmit(comment);

    setComment("");
    setPreview(false);
  };
  return (
    <form className="mb-8" onSubmit={handleSubmit}>
      <div className="bg-[#0a0a0f] rounded-xl border border-[#ffffff0a] overflow-hidden">
        <button
          type="button"
          onClick={() => setPreview(!isPreview)}
          className={`text-sm px-3 py-1 rounded-md transition-colors ${
            isPreview
              ? "bg-blue-500/10 text-blue-400"
              : "hover:bg-[#ffffff08] text-gray-400"
          }`}
        >
          {isPreview ? "Edit" : "Preview"}
        </button>

        {isPreview ? (
          <div className="min-h-[120px] p-4 text-[#1e1e3e]">
            <CommentContent content={comment} />
          </div>
        ) : (
          <textarea
            onKeyDown={handleKeyDown}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add to the discussion..."
            className="w-full bg-transparent border-0 text-[#e1e1e3] placeholder:text-[#808086] outline-none 
            resize-none min-h-[120px] p-4 font-mono text-sm"
          />
        )}

        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-[#080809] border-t border-[#ffffff0a]">
          <div className="hidden sm:block text-xs text-[#808086] space-y-1">
            <div className="flex items-center gap-2">
              <CodeIcon className="w-3.5 h-3.5" />
              <span>Format code with ```language</span>
            </div>
            <div className="text-[#808086]/60 pl-5">
              Tab key inserts spaces • Preview your comment before posting
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
          >
            {isSubmitting ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-white/30 
                border-t-white rounded-full animate-spin"
                />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <SendIcon className="w-4 h-4" />
                <span>Comment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
