import express from "express"
import {
    getAllPosts,
    getPostByIdController,
    createPost,
    deletePostController,
    updatePostController,
    getFeed,
    getPostsByUserIdController
}
    from "../controllers/postControllers.js";


export const postsRouter = express.Router();


postsRouter.get("/feed/:id",getFeed);
postsRouter.get("/", getAllPosts);
postsRouter.post("/:userId",getPostsByUserIdController)
postsRouter.get("/id/:id", getPostByIdController)
postsRouter.post("/add", createPost);
postsRouter.delete("/:id", deletePostController);
postsRouter.put("/update", updatePostController);