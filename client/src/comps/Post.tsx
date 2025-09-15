import { useState } from "react";
import type { PostProp } from "./types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostDescription from "./PostDescription";
import "../style/post.css"

export default function Post({
  username,
  profileImg,
  postImg,
  description,
  likes = 0,
  time,
  comments = [],
}: PostProp) {
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => setLikeCount(likeCount + 1);

  return (
    <div>
      <PostHeader username={username} profileImg={profileImg} />
      <PostImage postImg={postImg} />
      <PostActions
        likeCount={likeCount}
        commentsCount={comments.length}
        onLike={handleLike}
        onToggleComments={() => console.log("comments clicked")}
      />
      <PostDescription username={username} description={description} />
      <p>{time}</p>


    </div>
  );
}
