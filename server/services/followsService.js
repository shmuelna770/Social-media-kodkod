import {
    addFollower,
    removeFollower,
    getFollowers,
    getFollowing,
    getFollowersCount,
    getFollowingCount
} from "../dal/followsDAL.js";

// עוקב אחרי משתמש
export async function followUser(followerId, followingId) {
    return await addFollower(followerId, followingId);
}


// מפסיק לעקוב אחרי משתמש
export async function unfollowUser(followerId, followingId) {
    return await removeFollower(followerId, followingId);
}

// מביא את כל מי שעוקב אחרי המשתמש
export async function listFollowers(userId) {
    return await getFollowers(userId);
}

// מביא את כל מי שהמשתמש עוקב אחריהם
export async function listFollowing(userId) {
    return await getFollowing(userId);
}

// מחזיר את מספר העוקבים של המשתמש
export async function countFollowers(userId) {
    return await getFollowersCount(userId);
}

// מחזיר את מספר הנעקבים של המשתמש
export async function countFollowing(userId) {
    return await getFollowingCount(userId);
}
