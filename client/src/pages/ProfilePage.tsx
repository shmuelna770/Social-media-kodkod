import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import "../style/profile.css";
import makeRequest from "../utils/makeRequest";

type Post = {
  id: string;
  imageUrl: string;
  description?: string;
};

type Profile = {
  userName: string;
  profileImg?: string;
  status?: string;
};

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUserId = localStorage.getItem("id");

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        // ===== פרטי המשתמש =====
        const profileData = await makeRequest(`/user/${id}`);
        if (!profileData) throw new Error("משתמש לא נמצא");
        setProfile(profileData);

        // ===== הפוסטים של המשתמש =====
        const postsData = await makeRequest(`/posts/${id}`);
        if (Array.isArray(postsData)) setPosts(postsData);

        // ===== מספר עוקבים =====
        const followersData = await makeRequest(
          `/follows/followers/count/${id}`
        );
        if (followersData?.followersCount)
          setFollowersCount(followersData.followersCount);

        // ===== מספר נעקבים =====
        const followingData = await makeRequest(
          `/follows/following/count/${id}`
        );
        if (followingData?.followingCount)
          setFollowingCount(followingData.followingCount);

        // ===== בדיקה אם עוקבים =====
        // אם השרת לא נותן את הנתיב הזה, נשאיר false
        setIsFollowing(false);
      } catch (err: any) {
        console.error("Error fetching profile data:", err);
        setError(err.message || "שגיאה בטעינת הנתונים");
      }
    }

    fetchData();
  }, [id]);

  const handleFollowToggle = async () => {
    if (!currentUserId || !id) return;

    try {
      if (isFollowing) {
        await makeRequest(`/follows`, "DELETE", {
          followerId: currentUserId,
          followingId: id,
        });
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        await makeRequest(`/follows`, "POST", {
          followerId: currentUserId,
          followingId: id,
        });
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error updating follow status:", err);
    }
  };

  if (error) return <p>{error}</p>;
  if (!profile) return <p>טוען פרופיל...</p>;

  return (
    <main className="profile-root" aria-labelledby="profile-heading">
      <header className="profile-header">
        {profile.profileImg && (
          <img
            className="avatar"
            src={profile.profileImg || "/images/default-avatar.png"}
            alt={`${profile.userName} avatar`}
            width={120}
            height={120}
            loading="lazy"
          />
        )}
        <div className="profile-meta">
          <h1 id="profile-heading" className="name">
            {profile.userName}
          </h1>
          <p className="bio">{profile.status || ""}</p>
          <button onClick={handleFollowToggle}>
            {isFollowing ? "להפסיק לעקוב" : "עקוב"}
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
      <Link to={`/feed/post/${post.id}`}>
        <img src={post.imageUrl} alt="" loading="lazy" />
      </Link>
      {/* קישור לפרופיל של המשתמש */}
      <Link to={`/feed/profile-page/${id}`} className="post-user-link">
        {profile.userName}
      </Link>
    </div>
  ))}
</section>

    </main>
  );
}
