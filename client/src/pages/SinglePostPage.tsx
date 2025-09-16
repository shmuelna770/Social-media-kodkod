import { useState, useEffect } from "react";
import { useParams } from "react-router"; 
import "../styles/profile.css";
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

export default function ProfilePage() {
  const { id } = useParams(); 
  const [post, setPost] = useState<Post | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3004/posts/id/${id}`);
        if (!res.ok) throw new Error("שגיאה בשרת");
        const data: Post = await res.json();
        setPost(data);
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
    alert(`עדכון לפוסט: ${postId}`);
  };

  const handleDelete = (postId: number) => {
    alert(`מחיקה של פוסט: ${postId}`);
  };

  if (error) return <p>{error}</p>;
  if (!post) return <p>טוען פוסט...</p>;

  return (
    <>
      <Header />
      <main className="profile-root">
        <header className="profile-header">
          {/* <img
            className="avatar"
            src={post.image_url}
            alt={post.description}
            width={150}
            height={150}
          /> */}
          <div className="profile-meta">
            <h1 className="name">פוסט מספר {post.id}</h1>
            {post.description && <p className="bio">{post.description}</p>}
            <ul className="stats">
              <li>
                <strong>{post.sumOfLikes}</strong>
                <span>לייקים</span>
              </li>
              <li>
                <strong>{post.userId}</strong>
                <span>משתמש</span>
              </li>
              <li>
                <strong>{new Date(post.created_at).toLocaleDateString()}</strong>
                <span>תאריך</span>
              </li>
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
                <button onClick={() => handleUpdate(post.id)}>✏️ עדכון</button>
                <button onClick={() => handleDelete(post.id)}>🗑️ מחיקה</button>
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
