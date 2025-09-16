import React, { useState } from "react";

export type Comment = {
  id: number;
  username: string;
  text: string;
  time: string;
};

type Props = {
  comments: Comment[];
  show: boolean;
  onAddComment: (text: string) => void;
};

export default function PostComments({ comments, show, onAddComment }: Props) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };

  if (!show) return null;

  return (
    <div className="p-2">
      {comments.map((c) => (
        <div key={c.id} className="flex gap-2 text-sm mb-1">
          <span className="font-bold">{c.username}</span>
          <span>{c.text}</span>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input
          className="flex-1 border rounded px-2 py-1 text-sm"
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="font-semibold text-blue-500">
          Post
        </button>
      </form>
    </div>
  );
}
