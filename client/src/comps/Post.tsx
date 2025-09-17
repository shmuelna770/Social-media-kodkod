import { useEffect, useState } from "react";
import type { PostProp, user } from "../types/types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostDescription from "./PostDescription";
import "../style/post.css";
import authMakeRequest from "../utils/authMakeRequest";

export default function Post(post: PostProp) {
  const [likeCount, setLikeCount] = useState<number>(post.sumOfLikes || 0);
  const [userPost, setUserPost] = useState<user>();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchIsLiked = async () => {
      if (!userId) return;
      const res = await authMakeRequest(
        `/like/check?userId=${userId}&postId=${post.id}`
      );
      setIsLiked(res.liked);
    };

    const fetchUserPost = async () => {
      setLoading(true);
      const res = await authMakeRequest(`/user/${post.userId}`);
      setLoading(false);

      if (!res) {
        setMessage("User not found");
        return;
      }
      setUserPost(res);
    };

    fetchIsLiked();
    fetchUserPost();
  }, [post.id, post.userId, userId]);

  const handleLike = async () => {
    if (!userId) {
      setMessage("You must be logged in to like posts");
      return;
    }

    try {
      if (isLiked) {
        const res = await authMakeRequest(`/like?userId=${userId}&postId=${post.id}`, "DELETE");
        console.log(res);

        setLikeCount((prev) => prev - 1);
        setIsLiked(false);
      } else {
        const res = await authMakeRequest(`/like`, "POST", { userId, postId: post.id });
        console.log(res)
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (err: any) {
      setMessage(err.message || "Error updating like");
    }
  };

  return (
    <div>
      <PostHeader
        username={userPost?.userName || "unknown"}
        profileImg={userPost?.profileImg || ""}
      />
      <PostImage postImg={post.imageUrl} />
      <PostActions
        commentsCount={0}
        likeCount={likeCount}
        onLike={handleLike}
        onToggleComments={() => console.log("comments clicked")}
        isLiked={isLiked}
      />
      <PostDescription
        username={userPost?.userName || "unknown"}
        description={post.description}
      />
      <p>{post.created_at}</p>
      {loading && <p className="loading">Loading...</p>}
      {message && !loading && <p className="failed">{message}</p>}
    </div>
  );
}
