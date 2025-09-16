
import supabase from "../database/db.js"


//משיכת כל הפוסטים
export async function getData() {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
    return data;
}

// משיכת פוסטים לפי userId
export async function getDataUserId(userId) {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("userId", userId.userId)
    if (error) {
        console.error("Error fetching post by userName:", error);
        return null;
    }
    return data;
}

// משיכת פוסט לפי ID
export async function getDataById(id) {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
    if (error) {
        console.error("Error fetching post by id:", error);
        return null;
    }
    return data;
}

// כתיבת פוסט חדש
export async function writeData(newPost) {
    const { data, error } = await supabase
        .from("posts")
        .insert([newPost,])
        .select();
    if (error) {
        console.error("Error inserting post:", error);
        return null;
    }
    return data;
}

// מחיקת פוסט
export async function deleteData(id) {
    const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);
    if (error) {
        console.error("Error deleting post:", error);
        return null;
    }
    return data;
}

// עדכון פוסט
export async function updateData(id, updatedFields) {
    const { data, error } = await supabase
        .from("posts")
        .update(updatedFields)
        .eq("id", id)
        .select();
    if (error) {
        console.error("Error updating post:", error);
        return null;
    }
    return data;
}


    export async function getPostsOfFollowing(userId) {
        const { data: following, error: followError } = await supabase
            .from("followers")
            .select("followingId")
            .eq("followerId", userId);
        console.log('w',following);
        
        if (followError) throw followError;
        if (!following || following.length === 0) return [];

        const followingIds = following.map(f => f.followingId);

        const { data: posts, error: postsError } = await supabase
            .from("posts")
            .select("*")
            .in("userId", followingIds)
            .order("created_at", { ascending: false });

        if (postsError) throw postsError;

        return posts;
    }
