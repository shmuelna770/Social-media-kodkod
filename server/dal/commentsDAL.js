import supabase from "../database/db.js";

// הוספת תגובה
export async function addComment(userId, postId, content) {
    return await supabase
        .from("comments")
        .insert([{ userId, postId, content }])
        .select(`
            id,
            content,
            created_at,
            userId,
            users:userId (userName,profileImg)
        `) 
        .single();
}


// שליפת תגובות לפי פוסט כולל שם המשתמש
export async function getCommentsByPost(postId) {
    return await supabase
        .from("comments")
        .select(`
            id,
            content,
            created_at,
            userId,
            users:userId (userName)
        `)
        .eq("postId", postId)
        .order("created_at", { ascending: true });
}
