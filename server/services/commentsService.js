import { addComment, getCommentsByPost } from "../dal/commentsDAL.js";

// יצירת תגובה חדשה
export async function createComment(userId, postId, content) {
    if (!content || !userId || !postId) return null;
    return await addComment(userId, postId, content);
}

// שליפת כל התגובות של פוסט
export async function fetchComments(postId) {
    return await getCommentsByPost(postId);
}
