import express from "express"
import {
    getAllPosts,
    getPostByIdController,
    createPost,
    deletePostController,
    updatePostController,
}
    from "../controllers/postControllers.js";

import { createUserController, loginUserController } from "../controllers/usersController.js"

// import { verifyToken } from "../function/verify.js";

export const postsRouter = express.Router();
export const userRouter = express.Router();


postsRouter.get("/", getAllPosts);
postsRouter.get("/id/:id", getPostByIdController)
postsRouter.post("/add", createPost);
postsRouter.delete("/:id", deletePostController);
postsRouter.put("/update", updatePostController);

userRouter.post("/add", createUserController);
userRouter.post("/login", loginUserController);



