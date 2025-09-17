import { useState, useEffect } from "react";
import { useParams } from "react-router";
import makeRequest from "../utils/makeRequest";
import "../style/postPage.css";
type Post = {
  id: string;
  imageUrl: string;
  description?: string;
  createdAt?: string;
  userName?: string;
};

export default function PostPage() {
const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    async function fetchPost() {
    const data = await makeRequest(`/posts/id/${postId}`);
      if (typeof data === "string") {
        setError(data); // במקרה שחזר טקסט של שגיאה
      } else {
        setPost(data);
      }
    }

    fetchPost();
  }, [postId]);

  if (error) return <p>שגיאה: {error}</p>;
  if (!post) return <p>טוען פוסט...</p>;

  return (
  <main className="post-page">
    <img src={post.imageUrl} alt="post" width={400} loading="lazy" />
    {post.description && <p>{post.description}</p>}
    {post.createdAt && <small>פורסם ב־{new Date(post.createdAt).toLocaleString()}</small>}
  </main>
);

}
