import express from "express"
import fileUpload from "express-fileupload";

export const userRouter = express.Router();
import { createUserController, loginUserController, getUserController, getUsersController } from "../controllers/usersController.js"

userRouter.get("/", getUsersController)
userRouter.get("/:id", getUserController)
userRouter.post("/add", fileUpload(), createUserController);
userRouter.post("/login", loginUserController);
