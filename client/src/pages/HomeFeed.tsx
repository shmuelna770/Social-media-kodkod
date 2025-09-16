import Post from "../comps/Post";
import type { PostProp } from "../comps/types";
import Header from "../comps/Header";
import Footer from "../comps/Footer";
import "../index.css"
import { useEffect, useState } from "react";
import makeRequest from "../utils/makeRequest";

const [posts, setPosts] = useState<PostProp[]>([]);
const [message, setMessage] = useState<string>("");
const [loading, setLoading] = useState<boolean>(false)

useEffect(() => {
  const fetchPosts = async () => {
    setLoading(true)
    const allPosts = await makeRequest('/posts', 'GET')
    setLoading(false)
    if (!allPosts || !allPosts[0].id) {
      setMessage(allPosts)
      return
    }
    setPosts(allPosts)
    console.log(allPosts);

  }
  fetchPosts()
}, [])

export default function HomeFeed() {
  return (
    <div className="posts-container">
      <Header />
      <div className="feed">
        {!message && posts.map((post, idx) => (<Post key={idx} {...post} />))}
        {loading && <p className='loading'>Loading...</p>}
        {message && !loading && <p className='failed'>{message}</p>}
        <Footer />
      </div>
    </div>
  );
}
