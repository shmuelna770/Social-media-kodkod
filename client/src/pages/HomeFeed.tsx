import Post from "../comps/Post";
import type { PostProp } from "../comps/types";
import Header from "../comps/Header";
import Footer from "../comps/Footer";
import "../index.css"
import { useEffect, useState } from "react";
import makeRequest from "../utils/makeRequest";


export default function HomeFeed() {

  const [posts, setPosts] = useState<PostProp[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchFeed = async () => {
      const userId = localStorage.getItem('id');
      if (!userId) {
        setMessage(`User not found`)
        return
      }
      setLoading(true)
      const allPosts = await makeRequest(`/posts/feed/${userId}`, 'GET')
      if (!allPosts || allPosts.length === 0) {
        setMessage("Start follow to show posts")
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
    <div className="posts-container">
      <Header />
      <div className="feed">
        {!message && posts.map((post) => (<Post key={post.id} {...post} />))}
        {loading && <p className='loading'>Loading...</p>}
        {message && !loading && <p className='failed'>{message}</p>}
        <Footer />
      </div>
    </div>
  );
}
