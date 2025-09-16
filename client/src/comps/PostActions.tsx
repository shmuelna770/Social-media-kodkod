type Props = {
  likeCount: number;
  commentsCount: number;
  onLike: () => void;
  onToggleComments: () => void;
};

export default function PostActions({ likeCount, commentsCount, onLike, onToggleComments }: Props) {
  return (
    <div>
      <button onClick={onLike}>Like ({likeCount})</button>
      <button onClick={onToggleComments}>Comments ({commentsCount})</button>
    </div>
  );
}
