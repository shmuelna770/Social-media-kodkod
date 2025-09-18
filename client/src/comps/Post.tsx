import { useEffect, useState } from "react";
import type { PostProp, user } from "../types/types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostDescription from "./PostDescription";
import "../style/post.css";
import authMakeRequest from "../utils/authMakeRequest";
import BottomSheet from "./Comments";

export default function Post(post: PostProp) {
  const [likeCount, setLikeCount] = useState<number>(post.sumOfLikes || 0);
  const [userPost, setUserPost] = useState<user>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showComments, setShowComments] = useState(false);
  const [closing, setClosing] = useState(false);

  const userId = localStorage.getItem("id");

  function openComments() {
    setShowComments(true);
    setClosing(false);
  }

  function closeComments() {
    setClosing(true);
    setTimeout(() => setShowComments(false), 300);
  }

  // Fetch user info & like status
  useEffect(() => {
    const fetchUserPost = async () => {
      setLoading(true);
      try {
        const res = await authMakeRequest(`/user/${post.userId}`);
        if (!res) {
          setMessage("User not found");
        } else {
          setUserPost(res);
        }
      } catch (err: any) {
        setMessage(err.message || "Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    const fetchIsLiked = async () => {
      if (!userId) return;
      try {
        const res = await authMakeRequest(
          `/like/check?userId=${userId}&postId=${post.id}`
        );
        setIsLiked(res.liked);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserPost();
    fetchIsLiked();
  }, [post.userId, post.id, userId]);

  const handleLike = async () => {
    if (!userId) {
      setMessage("You must be logged in to like posts");
      return;
    }
    try {
      if (isLiked) {
        await authMakeRequest(`/like?userId=${userId}&postId=${post.id}`, "DELETE");
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        await authMakeRequest(`/like`, "POST", { userId, postId: post.id });
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (err: any) {
      setMessage(err.message || "Error updating like");
    }
  };

  return (
    <div className="post">
      <PostHeader
        username={userPost?.userName || "unknown"}
        profileImg={userPost?.profileImg || ""}
        userId={userPost?.id}
      />
      <PostImage postImg={post.imageUrl} />
      <PostActions
        commentsCount={0}
        likeCount={likeCount}
        onLike={handleLike}
        onToggleComments={openComments}
        isLiked={isLiked}
      />
      <PostDescription
        username={userPost?.userName || "unknown"}
        description={post.description}
      />
      <p>{post.created_at}</p>

      {loading && <p className="loading">Loading...</p>}
      {message && !loading && <p className="failed">{message}</p>}
        
      <BottomSheet
        open={showComments}
        onClose={closeComments}
        postId={post.id}
      />
    </div>
  );
}
