import { getPosts, writeNewPost, deletePost, updateSinglePost, getPostById, getUserFeed, getPostsByUserId } from "../services/postsService.js";

export async function getAllPosts(req, res) {
    try {
        const posts = await getPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to read posts" });
    }
}


export async function getPostsByUserIdController(req, res) {
    try {
        const userId = parseInt(req.params.id);
        const post = await getPostsByUserId(userId);
        if (!post) return res.status(404).json({ msg: "Posts not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to read posts" });
    }
}

export async function getPostByIdController(req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await getPostById(id);
        if (!post) return res.status(404).json({ msg: "post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to read post" });
    }
}

export async function createPost(req, res) {
    const newPost = req.body;
    console.log('post', newPost);

    if (!newPost.image_url || !newPost.description) {
        return res.status(400).json({ msg: "Image and description required" });
    }
    try {
        const success = await writeNewPost(newPost);
        if (!success) return res.status(400).json({ msg: "Failed to create post" });
        res.status(201).json({ success: true, msg: "Post created" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create post" });
    }
}


export async function deletePostController(req, res) {
    const id = parseInt(req.params.id);
    try {
        const deleted = await deletePost(id);
        if (!deleted) return res.status(404).json({ msg: "Post not exist" });
        res.status(200).json({ msg: "Post deleted", post: deleted });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete post" });
    }
}

export async function updatePostController(req, res) {
    const newData = req.body;
    try {
        const updated = await updateSinglePost(newData);
        if (!updated) return res.status(400).json({ msg: "Post not updated" });
        res.status(200).json({ msg: "Post updated" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update post" });
    }
}



export async function getFeed(req, res) {
    try {
        const userId = req.params.id;
        const posts = await getUserFeed(userId);
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}


