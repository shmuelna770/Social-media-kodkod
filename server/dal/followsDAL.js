import supabase from "../database/db.js"

// התחלת מעקב
export async function addFollower(followerId, followingId) {
    return await supabase
        .from("followers")
        .insert([{ followerId, followingId }]);
}

// הפסקת מעקב
export async function removeFollower(followerId, followingId) {
    return await supabase
        .from("followers")
        .delete()
        .eq("followerId", followerId)
        .eq("followingId", followingId);
}

// כל מי שעוקב אחרי userId
export async function getFollowers(userId) {
    return await supabase
        .from("followers")
        .select("followerId")
        .eq("followingId", userId);
}

// כל מי userId עוקב אחריו
export async function getFollowing(userId) {
    return await supabase
        .from("followers")
        .select("followingId")
        .eq("followerId", userId);
}

// ספירה של עוקבים
export async function getFollowersCount(userId) {
    const { count } = await supabase
        .from("followers")
        .select("followerId", { count: "exact", head: true })
        .eq("followingId", userId);
    return count;
}

// ספירה של נעקבים
export async function getFollowingCount(userId) {    
    const { count } = await supabase
        .from("followers")
        .select("followingId", { count: "exact", head: true })
        .eq("followerId", userId);
    return count;
}
