import { useState, useEffect } from "react";
import "../styles/profile.css";

type UserProfile = {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  stats?: {
  posts: number;
  followers: number;
  following: number;
  };
  posts?: { id: string; imageUrl: string; caption?: string }[];
};

const mockProfiles: Record<string, UserProfile> = {
  u1: {
    id: "u1",
    name: " שם משתמש",
    bio: "חובב קוד, פיצוחים ולמידה. פה לשפר את חוויית השחקנים.",
    avatarUrl: "https://i.pravatar.cc/300",
    stats: { posts: 8, followers: 1280, following: 80 },
    posts: [
      { id: "p1", imageUrl: "https://picsum.photos/id/1015/400/400", caption: "שקיעה קסומה" },
      { id: "p2", imageUrl: "https://picsum.photos/id/1016/400/400", caption: "יום coding" },
      { id: "p3", imageUrl: "https://picsum.photos/id/1018/400/400", caption: "פוסט נוסף" },
      { id: "p4", imageUrl: "https://picsum.photos/id/1020/400/400", caption: "בוקר טוב" },
      { id: "p5", imageUrl: "https://picsum.photos/id/1024/400/400", caption: "החידה של היום" },
      { id: "p6", imageUrl: "https://picsum.photos/id/1032/400/400", caption: "עוד פוסט" },
      { id: "p7", imageUrl: "https://picsum.photos/id/1035/400/400", caption: "נוף יפה" },
      { id: "p8", imageUrl: "https://picsum.photos/id/1040/400/400", caption: "חברים" },
    ],
  },
};

export default function ProfilePage({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  useEffect(() => {
    setProfile(mockProfiles[userId] || mockProfiles["u1"]);
  }, [userId]);

  const handleMenuToggle = (postId: string) => {
    setOpenMenu(openMenu === postId ? null : postId);
  };

  const handleUpdate = (postId: string) => {
    alert(`עדכון לפוסט: ${postId}`);
  };

  const handleDelete = (postId: string) => {
    alert(`מחיקה של פוסט: ${postId}`);
  };

  if (!profile) return <p>טוען פרופיל...</p>;

  return (
    <main className="profile-root" aria-labelledby="profile-heading">
      <header className="profile-header">
        <img
          className="avatar"
          src={profile.avatarUrl}
          alt={`${profile.name} avatar`}
          width={120}
          height={120}
          loading="lazy"
        />
        <div className="profile-meta">
          <h1 id="profile-heading" className="name">{profile.name}</h1>
          <p className="bio">{profile.bio}</p>
          <ul className="stats" role="list">
            <li>
              <strong>{profile.stats?.posts ?? 0}</strong>
              <span>פוסטים</span>
            </li>
            <li>
              <strong>{profile.stats?.followers ?? 0}</strong>
              <span>עוקבים</span>
            </li>
            <li>
              <strong>{profile.stats?.following ?? 0}</strong>
              <span>עוקב/ת</span>👁️
            </li>
          </ul>
        </div>
      </header>

      <section className="posts-grid">
        {profile.posts?.map(post => (
          <div key={post.id} className="post">
            <img src={post.imageUrl} alt={post.caption} loading="lazy" />

            <button className="burger-btn" onClick={() => handleMenuToggle(post.id)}>
              ⋮
            </button>

            {openMenu === post.id && (
              <div className="post-menu">
                <button onClick={() => handleUpdate(post.id)}>✏️ עדכון</button>
                <button onClick={() => handleDelete(post.id)}>🗑️ מחיקה</button>
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
