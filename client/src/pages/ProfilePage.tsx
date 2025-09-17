import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import "../style/profile.css";

export default function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    userName: "",
    profileImg: "",
    status: "",
  });
  type Post = { id: string; imageUrl: string };
  const [posts, setPosts] = useState<Post[]>([]); // {id, imageUrl}
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const currentUserId = localStorage.getItem("id");

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        // פרטי המשתמש
        const profileRes = await fetch(`http://localhost:3004/user/${id}`);
        const profileData = await profileRes.json();
        setProfile({
          userName: profileData.userName,
          profileImg: profileData.profileImg,
          status: profileData.status || "",
        });

        // הפוסטים של המשתמש
        const postsRes = await fetch(`http://localhost:3004/posts/${id}`);
        const postsData = await postsRes.json();
        setPosts(postsData.map((p: { id: string; imageUrl: string }) => ({ id: p.id, imageUrl: p.imageUrl })));

        // מספר עוקבים
        const followersRes = await fetch(`http://localhost:3004/follows/followers/count/${id}`);
        const followersData = await followersRes.json();
        setFollowersCount(followersData.followersCount || 0);

        // מספר נעקבים
        const followingRes = await fetch(`http://localhost:3004/follows/following/count/${id}`);
        const followingData = await followingRes.json();
        setFollowingCount(followingData.followingCount || 0);

        // בדיקה אם המשתמש הנוכחי עוקב אחרי המשתמש הזה
        const checkFollowRes = await fetch(`http://localhost:3004/follows/check/${currentUserId}/${id}`);
        const checkFollowData = await checkFollowRes.json();
        setIsFollowing(checkFollowData.isFollowing);

      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    }

    fetchData();
  }, [id, currentUserId]);

  const handleFollowToggle = async () => {
    try {
      if (!currentUserId) return;

      if (isFollowing) {
        // מבצע unfollow
        await fetch(`http://localhost:3004/follows`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ followerId: currentUserId, followingId: id }),
        });
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        // מבצע follow
        await fetch(`http://localhost:3004/follows`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ followerId: currentUserId, followingId: id }),
        });
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error updating follow status:", err);
    }
  };

  if (!profile.userName) return <p>טוען פרופיל...</p>;

  return (
    <main className="profile-root" aria-labelledby="profile-heading">
      <header className="profile-header">
        <img
          className="avatar"
          src={profile.profileImg}
          alt={`${profile.userName} avatar`}
          width={120}
          height={120}
          loading="lazy"
        />
        <div className="profile-meta">
          <h1 id="profile-heading" className="name">{profile.userName}</h1>
          <p className="bio">{profile.status}</p>
          <button onClick={handleFollowToggle}>
            {isFollowing ? "להפסק לעקוב" : "עקוב"}
          </button>
          <ul className="stats" role="list">
            <li>
              <strong>{posts.length}</strong>
              <span>פוסטים</span>
            </li>
            <li>
              <strong>{followersCount}</strong>
              <span>עוקבים</span>
            </li>
            <li>
              <strong>{followingCount}</strong>
              <span>עוקב/ת</span>
            </li>
          </ul>
        </div>
      </header>

      <section className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <Link to={`/post/${post.id}`}>
              <img src={post.imageUrl} alt="" loading="lazy" />
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
