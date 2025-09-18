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
  const [posts, setPosts] = useState<Post[]>([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const currentUserId = localStorage.getItem("id"); 
  const isOwnProfile = currentUserId === id; 
  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const profileRes = await fetch(`http://localhost:3004/user/${id}`);
        const profileData = await profileRes.json();
        setProfile({
          userName: profileData.userName,
          profileImg: profileData.profileImg,
          status: profileData.status || "",
        });

        const postsRes = await fetch(`http://localhost:3004/posts/${id}`);
        const postsData = await postsRes.json();
        setPosts(postsData.map((p: { id: string; imageUrl: string }) => ({ id: p.id, imageUrl: p.imageUrl })));

        const followersRes = await fetch(`http://localhost:3004/follows/followers/count/${id}`);
        const followersData = await followersRes.json();
        setFollowersCount(followersData.followersCount || 0);

        const followingRes = await fetch(`http://localhost:3004/follows/following/count/${id}`);
        const followingData = await followingRes.json();
        setFollowingCount(followingData.followingCount || 0);

        if (!isOwnProfile) {
          const checkFollowRes = await fetch(`http://localhost:3004/follows/check/${currentUserId}/${id}`);
          const checkFollowData = await checkFollowRes.json();
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
        await fetch(`http://localhost:3004/follows`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ followerId: currentUserId, followingId: id }),
        });
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
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

  const handleMenuToggle = (postId: string) => {
    setOpenMenu(openMenu === postId ? null : postId);
  };

  const handleUpdate = (postId: string) => {
    alert(`עדכון לפוסט: ${postId}`);
  };

  const handleDelete = (postId: string) => {
    alert(`מחיקה של פוסט: ${postId}`);
  };

  if (!profile.userName) return <p>Loading profile...</p>;

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
              {isFollowing ? "Unfollow" : "Follow"}
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
