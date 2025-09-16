import { addLikeService, removeLikeService } from '../services/likesService.js'

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
        const { userId, postId } = req.body
        const msg = await removeLikeService(userId, postId)
        res.send(msg)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

