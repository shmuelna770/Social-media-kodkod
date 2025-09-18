import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import "../style/profile.css";
import makeRequest from "../utils/makeRequest";

export default function ProfilePage() {
  const { id } = useParams(); 
  const [profile, setProfile] = useState({
    userName: "",
    profileImg: "",
    status: "",
  });
  type Post = { id: string; imageUrl: string };
  const [posts, setPosts] = useState<Post[]>([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const currentUserId = localStorage.getItem("id"); // מזהה המשתמש הנוכחי
  const isOwnProfile = currentUserId === id;

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        // פרטי המשתמש
        const profileData = await makeRequest(`/user/${id}`);
        setProfile({
          userName: profileData.userName,
          profileImg: profileData.profileImg,
          status: profileData.status || "",
        });

        // הפוסטים של המשתמש
        const postsData = await makeRequest(`/posts/${id}`);
        setPosts(postsData.map((p: { id: string; imageUrl: string }) => ({ id: p.id, imageUrl: p.imageUrl })));

        // מספר עוקבים
        const followersData = await makeRequest(`/follows/followers/count/${id}`);
        setFollowersCount(followersData.followersCount || 0);

        // מספר נעקבים
        const followingData = await makeRequest(`/follows/following/count/${id}`);
        setFollowingCount(followingData.followingCount || 0);

        if (!isOwnProfile) {
          // בדיקה אם המשתמש הנוכחי עוקב אחרי המשתמש הזה
          const checkFollowData = await makeRequest(`/follows/check/${currentUserId}/${id}`);
          setIsFollowing(checkFollowData.isFollowing);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    }

    fetchData();
  }, [id, currentUserId, isOwnProfile]);

  const handleFollowToggle = async () => {
    try {
      if (!currentUserId) return;

      if (isFollowing) {
        await makeRequest(`/follows`, "DELETE", { followerId: currentUserId, followingId: id });
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        await makeRequest(`/follows`, "POST", { followerId: currentUserId, followingId: id });
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error updating follow status:", err);
    }
  };

  const handleMenuToggle = (postId: string) => {
    setOpenMenu(openMenu === postId ? null : postId);
  };

  const handleUpdate = (postId: string) => {
    alert(`Update to the post: ${postId}`);
  };

  const handleDelete = async (postId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete the post?");
    if (!confirmed) return;

    try {
      const res = await makeRequest(`/posts/${postId}`, "DELETE", { userId: currentUserId });
      if (res.error) throw new Error(res.error);

      // הסרת הפוסט מהסטייט כדי לעדכן את המסך
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
      alert("The post was successfully deleted!");
    } catch (err: any) {
      console.error("Error deleting post:", err);
      alert("Error deleting post: " + err.message);
    }
  };

  if (!profile.userName) return <p>Loads profile...</p>;

  return (
    <main className="profile-root" aria-labelledby="profile-heading">
      <header className="profile-header">
        <img
          className="avatar"
          src={profile.profileImg || "/logo.png"}
          alt={`${profile.userName} avatar`}
          width={120}
          height={120}
          loading="lazy"
        />
        <div className="profile-meta">
          <h1 id="profile-heading" className="name">{profile.userName}</h1>
          <p className="bio">{profile.status}</p>

          {!isOwnProfile && (
            <button onClick={handleFollowToggle}>
              {isFollowing ? "unfollow" : "follow"}
            </button>
          )}

          <ul className="stats" role="list">
            <li>
              <strong>{posts.length}</strong>
              <span>Posts</span>
            </li>
            <li>
              <strong>{followersCount}</strong>
              <span>Followers</span>
            </li>
            <li>
              <strong>{followingCount}</strong>
              <span>Following</span>
            </li>
          </ul>
        </div>
      </header>

    <section className="posts-grid">
  {posts.length === 0 ? (
    <p className="no-posts">No posts</p>
  ) : (
    posts.map((post) => (
      <div key={post.id} className="post">
        <Link to={`/feed/post/${post.id}`}>
          <img src={post.imageUrl} alt="" loading="lazy" />
        </Link>

        {isOwnProfile && (
          <>
            <button className="burger-btn" onClick={() => handleMenuToggle(post.id)}>
              ⋮
            </button>
            {openMenu === post.id && (
              <div className="post-menu">
                <button onClick={() => handleUpdate(post.id)}>✏️ updating</button>
                <button onClick={() => handleDelete(post.id)}>🗑️ deleting</button>
              </div>
            )}
          </>
        )}
      </div>
    ))
  )}
</section>
    </main>
  );
}