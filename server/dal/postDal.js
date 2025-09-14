
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
        .insert([newPost])
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
