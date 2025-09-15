import { getLike, insertLike, deleteLike } from "../dal/likesDal.js";

export async function addLikeService(userId, postId) {
  try {
    const { data: existing, error: checkError } = await getLike(userId, postId);

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError;
    }

    if (existing) {
      return { success: false, message: "Like already exists" };
    }

    const { data, error } = await insertLike(userId, postId);
    if (error) throw error;

    return { success: true, message: "Like added successfully", data };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function removeLikeService(userId, postId) {
  try {
    const { data: existing, error: checkError } = await getLike(userId, postId);

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError;
    }

    if (!existing) {
      return { success: false, message: "Like not found" };
    }

    const { error } = await deleteLike(userId, postId);
    if (error) throw error;

    return { success: true, message: "Like removed successfully" };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
