import { useEffect, useState } from "react";
import type { PostProp, user } from "./types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostDescription from "./PostDescription";
import "../style/post.css"
import authMakeRequest from "../utils/authMakeRequest";

export default function Post(post: PostProp) {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [userPost, setUserPost] = useState<user>();

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleLike = () => setLikeCount(prev => prev + 1);

  useEffect(() => {
    const fetchUserPost = async () => {
      setLoading(true)
      const res = await authMakeRequest(`/user/${post.userId}`)
      setLoading(false)
      console.log(res);

      if (!res) {
        setMessage("User not found")
        return
      }
      setUserPost(res)
    }
    setLikeCount(post.sumOfLikes)
    fetchUserPost()
  }, []);

  return (
    <div>
      <PostHeader username={userPost?.userName || 'unknown'} profileImg={userPost?.profileImg || ''} />
      <PostImage postImg={post.imageUrl} />
      <PostActions
        commentsCount={0}
        likeCount={likeCount}
        onLike={handleLike}
        onToggleComments={() => console.log("comments clicked")}
      />
      <PostDescription username={userPost?.userName || 'unknown'} description={post.description} />
      <p>{post.created_at}</p>
      {loading && <p className="loading">Loading...</p>}
      {message && !loading && <p className="failed">{message}</p>}
    </div>
  );
}
