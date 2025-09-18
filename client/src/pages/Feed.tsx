// src/pages/Feed.tsx
import { useEffect, useState } from "react";
import Post from "../comps/Post";
import { useNavigate } from "react-router";
import type { PostProp } from "../types/types";
import "../index.css"
import authMakeRequest from "../utils/authMakeRequest";

const Feed = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState<PostProp[]>([]);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    

    useEffect(() => {
        const fetchFeed = async () => {
            const userId = localStorage.getItem('id');
            if (!userId) {
                setMessage(`User not found`)
                navigate("/login")
                return
            }
            setLoading(true)
            const allPosts = await authMakeRequest(`/posts/feed/${userId}`, 'GET')
            if (!allPosts || allPosts.length === 0) {
                setMessage("🌟 Welcome to kodkodX \n A community of kodkodim keeping the magic alive-sharing posts, ideas, and laughs. Now you are part of the story. 🎉\n Your feed is quiet for now-start following friends to see fresh posts and join the fun!")
            }
            setLoading(false)
            if (!allPosts) {
                setMessage(allPosts)
                return
            }
            setPosts(allPosts)

        }
        fetchFeed()
    }, [])
return (
    <div className="feed">
      {loading && (
  <div className="loader-overlay">
    <div className="loader"></div>
  </div>
)}


      {!loading && message && (
        <div className="welcome-container">
          {message.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      )}

      {!loading && !message && posts.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
};

export default Feed;
