import { createComment, fetchComments } from "../services/commentsService.js";

// הוספת תגובה
export async function postComment(req, res) {
    try {
        const { userId, postId, content } = req.body;
        const comment = await createComment(userId, postId, content);
        if (!comment) return res.status(400).json({ error: "נתונים חסרים" });
        else{
        res.status(201).json(comment);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "שגיאת שרת" });
    }
}

// שליפת תגובות לפי פוסט
export async function getComments(req, res) {
    try {
        const { postId } = req.params;
        const comments = await fetchComments(postId);
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "שגיאת שרת" });
    }
}
