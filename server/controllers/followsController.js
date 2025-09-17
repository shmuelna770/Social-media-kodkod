import {
    followUser,
    unfollowUser,
    listFollowers,
    listFollowing,
    countFollowers,
    countFollowing
} from "../services/followsService.js";


// עוקב אחרי משתמש אחר
export async function follow(req, res) {
    const { followerId, followingId } = req.body;
    console.log("follows",followerId,followingId);
    
    const result = await followUser(followerId, followingId);
    if (result.error) return res.status(400).json(result);
    res.status(201).json({ message: "start to following" });
}


// מפסיק לעקוב אחרי משתמש
export async function unfollow(req, res) {
    const { followerId, followingId } = req.body;
    await unfollowUser(followerId, followingId);
    res.json({ message: "start to following" });
}

// מביא את כל המשתמשים שעוקבים אחרי משתמש מסוים
export async function getFollowersList(req, res) {
    const { userId } = req.params;
    const { data } = await listFollowers(userId);
    res.json(data);
}


//מביא את כל המשתמשים שהמשתמש עוקב אחריהם
export async function getFollowingList(req, res) {
    const { userId } = req.params;
    const { data } = await listFollowing(userId);
    res.json(data);
}


// מחזיר את מספר העוקבים של המשתמש
export async function getFollowersCountController(req, res) {
    const { userId } = req.params;
    const count = await countFollowers(userId);
    res.json({ followersCount: count });
}


// מחזיר את מספר הנעקבים שהמשתמש עוקב אחריהם
export async function getFollowingCountController(req, res) {
    
    const { userId } = req.params;
    const count = await countFollowing(userId);    
    res.json({ followingCount: count });
}
