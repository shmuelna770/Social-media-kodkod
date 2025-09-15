import express from "express"
import {
    getAllPosts,
    getPostByIdController,
    createPost,
    deletePostController,
    updatePostController,
}
    from "../controllers/postControllers.js";


export const postsRouter = express.Router();


postsRouter.get("/", getAllPosts);
postsRouter.get("/id/:id", getPostByIdController)
postsRouter.post("/add", createPost);
postsRouter.delete("/:id", deletePostController);
postsRouter.put("/update", updatePostController);