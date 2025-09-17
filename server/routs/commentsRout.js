import express from "express"
export {verifyToken} from "../auth/verify.js"

import {postComment,getComments} from "../controllers/commentsController.js"

export const commentsRouter = express.Router();

commentsRouter.post("/",postComment)
commentsRouter.get("/",getComments)