import { addLikeService, removeLikeService, checkIfUserLiked } from '../services/likesService.js'

export async function increaseLike(req, res) {
    try {
        const { userId, postId } = req.body
        const msg = await addLikeService(userId, postId)
        res.send(msg)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function decreaseLike(req, res) {
    try {
        const { userId, postId } = req.query;
        const msg = await removeLikeService(userId, postId)
        res.send(msg)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function checkLikeController(req, res) {
    const { userId, postId } = req.query;

    if (!userId || !postId) {
        return res.status(400).json({ msg: "userId and postId are required" });
    }

    try {
        const liked = await checkIfUserLiked(userId, postId);
        return res.json({ liked });
    } catch (error) {
        console.error("Error checking like:", error);
        return res.status(500).json({ msg: "Database error", error: error.message });
    }
}