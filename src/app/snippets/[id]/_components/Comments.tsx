"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ snippetId }: { snippetId: Id<"snippets"> }) => {
  const { user } = useUser();

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [deletingCommentId, setDeletingCommenId] = useState<string | null>(
    null
  );

  const comments = useQuery(api.snippets.getComments, { snippetId }) || [];
  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  const handleSubmitComment = async (content: string) => {
    setSubmitting(true);

    try {
      await addComment({ snippetId, content });
    } catch (error) {
      console.log("Error adding comment: " + error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  const handleDeleteComment = async (commentId: Id<"snippetComments">) => {
    setDeletingCommenId(commentId);

    try {
      await deleteComment({ commentId });
    } catch (error) {
      console.log("Error deleting a comment: " + error);
      toast.error("Something went wrong");
    } finally {
      setDeletingCommenId(null);
    }
  };
  return (
    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageSquare className="size-5" />
          Discussion ({comments.length})
        </h2>
      </div>

      <div className="p-6 sm:p-8">
        {user ? (
          <CommentForm
            onSubmit={handleSubmitComment}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
            <p className="text-[#808086] mb-6">
              Sign in to join the discussion
            </p>
            <SignInButton mode="modal">
              <button className="p-6 py-2 bg-[#3b82f6] hover:bg-[#2563eb] transition-colors text-white rounded-lg ">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={handleDeleteComment}
              isDeleting={deletingCommentId === comment._id}
              currentUserId={user?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
