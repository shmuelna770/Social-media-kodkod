import { useState, useEffect } from "react";
import { useParams } from "react-router"; 
import makeRequest from "../utils/makeRequest";
import "../style/profile.css";
import Header from "../comps/Header";
import Footer from "../comps/Footer";

type Post = {
  id: number;
  created_at: string;
  userId: number;
  image_url: string;
  description: string;
  sumOfLikes: number;
};

export default function SinglePostPage() { 
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await makeRequest(`/posts/id/${id}`);
        setPost(res);
      } catch (err) {
        console.error("בעיה בשליפת פוסט:", err);
        setError("בעיה בשליפת הפוסט");
      }
    };

    fetchPost();
  }, [id]);

  const handleMenuToggle = (postId: number) => {
    setOpenMenu(openMenu === postId ? null : postId);
  };

  const handleUpdate = (postId: number) => {
    alert(`Update to the post: ${postId}`);
  };

  const handleDelete = (postId: number) => {
    alert(`Delete post: ${postId}`);
  };

  if (error) return <p>{error}</p>;
  if (!post) return <p>Loading post...</p>;

  return (
    <>
      <Header />
      <main className="profile-root">
        <header className="profile-header">
          <div className="profile-meta">
            <h1 className="name">פוסט מספר {post.id}</h1>
            {post.description && <p className="bio">{post.description}</p>}
            <ul className="stats">
              <div>
                <strong>{post.sumOfLikes}</strong>
                <span>Likes</span>
              </div>
              <div>
                <strong>{post.userId}</strong>
                <span>User</span>
              </div>
              <div>
                <strong>{new Date(post.created_at).toLocaleDateString()}</strong>
                <span>Date</span>
              </div>
            </ul>
          </div>
        </header>

        <section className="posts-grid">
          <div key={post.id} className="post">
            <img src={post.image_url} alt={post.description} loading="lazy" />

            <button className="burger-btn" onClick={() => handleMenuToggle(post.id)}>
              ⋮
            </button>

            {openMenu === post.id && (
              <div className="post-menu">
                <button onClick={() => handleUpdate(post.id)}>✏️ updating</button>
                <button onClick={() => handleDelete(post.id)}>🗑️ deleting</button>
              </div>
            )}

            {post.description && <p className="caption">{post.description}</p>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
