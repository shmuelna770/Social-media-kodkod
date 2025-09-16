import { useEffect, useState } from "react";
import type { PostProp } from "./types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostDescription from "./PostDescription";
import "../style/post.css"

export default function Post(post: PostProp) {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [userName, setUserName] = useState<string>('Unknown')

  const handleLike = () => setLikeCount(prev => prev + 1);

  useEffect(() => {
    setLikeCount(post.sumOfLikes)
  }, []);

  return (
    <div>
      <PostHeader username={userName} profileImg={post.imageUrl} />
      <PostImage postImg={post.imageUrl} />
      <PostActions
        commentsCount={0}
        likeCount={likeCount}
        onLike={handleLike}
        onToggleComments={() => console.log("comments clicked")}
      />
      <PostDescription username={userName} description={post.description} />
      <p>{post.created_at}</p>


    </div>
  );
}
