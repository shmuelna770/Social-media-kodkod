import { FaRegHeart, FaRegComment } from "react-icons/fa";
import "../style/postActions.css";

type Props = {
  likeCount: number;
  commentsCount: number;
  onLike: () => void;
  onToggleComments: () => void;
};

export default function PostActions({
  likeCount,
  commentsCount,
  onLike,
  onToggleComments,
}: Props) {
  return (
    <div className="post-actions">
      <button className="icon-btn" onClick={onLike}>
        <FaRegHeart className="icon" size={20} />
        <span>{likeCount}</span>
      </button>
      <button className="icon-btn" onClick={onToggleComments}>
        <FaRegComment className="comment" size={20} />
        <span>{commentsCount}</span>
      </button>
    </div>
  );
}
