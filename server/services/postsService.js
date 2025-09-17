// postService.js
import { getData, getDataById, writeData, deleteData, updateData ,getPostsOfFollowing, getDataUserId} from "../dal/postDal.js";

// משיכת כל הפוסטים
export async function getPosts() {
    const posts = await getData();
    return posts;
}

export async function getPostsByUserId(userId) {
    if (!userId) return false;
    const post = await getDataUserId(userId);
    // console.log('ccc',post);
    
    return post || false;
}

//משיכת פוסט לפי ID
export async function getPostById(idString) {
    const id = parseInt(idString);
    if (!id) return false;

    const post = await getDataById(id);
    return post || false;
}

//כתיבת פוסט חדש
export async function writeNewPost(newPost) {
    if (!newPost) return false;
    newPost.created_at = new Date().toISOString();
    const inserted = await writeData(newPost);
    return inserted ? true : false;
}

//מחיקת פוסט
export async function deletePost(idString) {
    const id = parseInt(idString);
    if (!id) return false;

    const deleted = await deleteData(id);
    return deleted ? true : false;
}

// עדכון פוסט
export async function updateSinglePost(newData) {
    const id = parseInt(newData.id); // id Post
    if (!id || !newData) return null;

    const updatedFields = {};
    if (newData.description) updatedFields.description = newData.description;
    if (newData.image_url) updatedFields.image_url = newData.image_url;
    // console.log('dd',updatedFields);
    
    if (Object.keys(updatedFields).length === 0) return false

    const updated = await updateData(id, updatedFields);
    return updated ? true : false;
}

export async function getUserFeed(userId) {
    return await getPostsOfFollowing(userId);
}
