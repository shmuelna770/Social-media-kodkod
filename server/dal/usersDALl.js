// servicesDAL/usersDAL.js
import supabase from "../database/db.js";

// משיכת כל המשתמשים
export async function getUsersData() {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
        console.error("Error fetching users:", error);
        return [];
    }
    return data;
}

// משיכת משתמש לפי userName
export async function getUserById(id) {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
    if (error) {
        console.error("Error fetching user:", error);
        return null;
    }
    return data;
}

// יצירת משתמש חדש
export async function createUser(newUser) {
    const { data, error } = await supabase
        .from("users")
        .insert([newUser])
        .select();
    if (error) {
        console.error("Error inserting user:", error);
        return null;
    }
    return data;
}

