import express from "express"

export const userRouter = express.Router();
import { createUserController, loginUserController } from "../controllers/usersController.js"


userRouter.post("/add", createUserController);
userRouter.post("/login", loginUserController);
