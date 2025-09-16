import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import makeRequest from "../utils/makeRequest";
import "../styles/profile.css";
import Header from "../comps/Header";
import Footer from "../comps/Footer";

type UserProfile = {
  id: number;
  userName: string;
  profileImg?: string;
};

type Post = {
  id: number;
  image_url: string;
  description?: string;
};

export default function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await makeRequest(`/user/${id}`);
        setProfile(res);

        const postsRes = await makeRequest(`/posts/userId`,"POST", { userId: res.id })
        setPosts(postsRes);
      } catch (err) {
        console.error("Problem retrieving profile or posts:", err);
        setError("Problem retrieving profile or posts");
      }
    };

    fetchProfile();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <>
      <Header />
      <main className="profile-root" aria-labelledby="profile-heading">
        <header className="profile-header">
          <img
            className="avatar"
            src={profile.profileImg || "/default-avatar.png"}
            alt={`${profile.userName} avatar`}
            width={120}
            height={120}
            loading="lazy"
          />
          <div className="profile-meta">
            <h1 id="profile-heading" className="name">{profile.userName}</h1>
          </div>
        </header>

        <section className="posts-grid">
          {posts.length === 0 ? (
            <p>No posts to display</p>
          ) : (
            posts.map(post => (
              <Link key={post.id} to={`/post/${post.id}`} className="post-link"> 
                <div className="post">
                  <img src={post.image_url} alt={post.description} loading="lazy" />
                  <p>{post.description}</p>
                </div>
              </Link>
            ))
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
