import express from "express"
import fileUpload from "express-fileupload";
import { verifyToken } from '../auth/verify.js'
import { createUserController, loginUserController, getUserController, getUsersController } from "../controllers/usersController.js"

export const userRouter = express.Router();

userRouter.get("/", verifyToken, getUsersController)
userRouter.get("/:id", verifyToken, getUserController)
userRouter.get("/", verifyToken, getUsersController)
userRouter.get("/:id", verifyToken, getUserController)
userRouter.post("/add", fileUpload(), createUserController);
userRouter.post("/login", loginUserController);
