import express from "express"
export {verifyToken} from "../auth/verify.js"

import {
    getFollowersCountController,
    getFollowingCountController,
    unfollow, getFollowersList,
    getFollowingList,
    follow
} from "../controllers/followsController.js"
export const followsRouter = express.Router();

followsRouter.post("/",follow)
followsRouter.delete("/",unfollow)
followsRouter.get("/followers/:userId",getFollowersList)
followsRouter.get("/following/:userId",getFollowingList)
followsRouter.get("/followers/count/:userId",getFollowersCountController)
followsRouter.get("/following/count/:userId",getFollowingCountController)
