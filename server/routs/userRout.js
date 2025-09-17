import express from "express"
export { verifyToken } from "../auth/verify.js"

export const userRouter = express.Router();
import { createUserController, loginUserController, getUserController, getUsersController } from "../controllers/usersController.js"

userRouter.get("/", getUsersController)
userRouter.get("/:id", getUserController)
userRouter.post("/add", createUserController);
userRouter.post("/login", loginUserController);
