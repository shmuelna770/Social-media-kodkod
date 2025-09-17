import Post from "../comps/Post";
import { useNavigate } from "react-router";
import type { PostProp } from "../comps/types";
import "../index.css"
import { useEffect, useState } from "react";
import makeRequest from "../utils/makeRequest";

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
        <div className="feed">
            {!message && posts.map((post) => (<Post key={post.id} {...post} />))}
            {loading && <p className='loading'>Loading...</p>}
            {message && !loading && <p className='failed'>{message}</p>}
        </div>
    )
}

export default Feed