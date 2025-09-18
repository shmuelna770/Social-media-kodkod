import supabase from "../database/db.js";

export async function getLike(userId, postId) {
  return await supabase
    .from("likes")
    .select("*")
    .eq("userId", userId)
    .eq("postId", postId)
    .single();
}

export async function insertLike(userId, postId) {
  return await supabase.from("likes").insert([
    {
      userId: userId,
      postId: postId,
    },
  ]);
}

export async function deleteLike(userId, postId) {
  return await supabase
    .from("likes")
    .delete()
    .eq("userId", userId)
    .eq("postId", postId);
}

export async function findLike(userId, postId) {
  return await supabase
    .from("likes")
    .select("*")
    .eq("userId", userId)
    .eq("postId", postId)
    .maybeSingle();
}