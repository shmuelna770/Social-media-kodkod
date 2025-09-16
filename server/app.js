
import express from "express"
import cors from "cors"
import { postsRouter } from "./routs/postRout.js"
import { userRouter } from "./routs/userRout.js"
import {followsRouter} from "./routs/followsRout.js"
import cookieParser from "cookie-parser";
import { likesRout } from "./routs/likesRout.js";
import {commentsRouter} from "./routs/commentsRout.js"



const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    method: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["content-type", "Authorization"],
}))
app.use(express.json());
app.use(express.static("public"))

app.use("/posts", postsRouter)
app.use("/user", userRouter)
app.use("/like", likesRout)
app.use("/follows",followsRouter)
app.use("/comments",commentsRouter)

const Port = 3004
app.listen(Port, () => {
    console.log(`the server is run: ${Port}`);
})
