import express from "express"

import {postComment,getComments} from "../controllers/commentsController.js"

export const commentsRouter = express.Router();

commentsRouter.post("/",postComment)
commentsRouter.get("/",getComments)