import express from "express"
import {verifyToken} from "../auth/verify.js"

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


postsRouter.get("/feed/:id",getFeed);
postsRouter.get("/", getAllPosts);
postsRouter.post("/:userId",getPostsByUserIdController)
postsRouter.get("/id/:id", getPostByIdController)
postsRouter.post("/add/:id",fileUpload() ,createPost);
postsRouter.delete("/:id", deletePostController);
postsRouter.put("/update", updatePostController);