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

import fileUpload from "express-fileupload";


export const postsRouter = express.Router();


postsRouter.get("/feed/:id", getFeed);
postsRouter.get("/", getAllPosts);
postsRouter.get("/:userId", getPostsByUserIdController)
postsRouter.get("/id/:id", getPostByIdController)
postsRouter.post("/add/:id", fileUpload(), createPost);
postsRouter.delete("/:id", deletePostController);
postsRouter.put("/update", updatePostController);