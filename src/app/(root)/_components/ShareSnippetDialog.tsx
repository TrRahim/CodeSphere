import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useMutation } from "convex/react";
import { X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../convex/_generated/api";

interface Props {
  onClose: () => void;
}

const ShareSnippetDialog = ({ onClose }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [isSharing, setSharing] = useState<boolean>(false);

  const language = useCodeEditorStore((s) => s.language);
  const getCode = useCodeEditorStore((s) => s.getCode);

  const createSnippet = useMutation(api.snippets.createSnippet);

  const handleShare = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSharing(true);

    try {
      const code = getCode();
      await createSnippet({ title, language, code });
      onClose();
      setTitle("");
      toast.success(`Snippet "${title}" shared successfully!`);
    } catch (error) {
      console.error("Error creating snippet:", error);
      toast.error("Error creating snippet");
    } finally {
      setSharing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Share Snippet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleShare}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-2 text-gray-400"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#181825] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter snippet title"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-gray-400 hover:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing}
              className="py-2 px-4 bg-blue-400 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isSharing ? "Sharing..." : "Share"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareSnippetDialog;
