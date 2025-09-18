import express from "express"
import cors from "cors"
import { postsRouter } from "./routs/postRout.js"
import { userRouter } from "./routs/userRout.js"
import { followsRouter } from "./routs/followsRout.js"
import cookieParser from "cookie-parser";
import { likesRout } from "./routs/likesRout.js";
import { commentsRouter } from "./routs/commentsRout.js"
import { verifyToken } from "./auth/verify.js"


const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    method: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["content-type", "Authorization"],
}))

app.use(express.json());
app.use(express.static("public/postsImages"))
app.use(express.static("public/profileImages"))

app.use("/posts", verifyToken, postsRouter)
app.use("/user", userRouter)
app.use("/like", verifyToken, likesRout)
app.use("/follows", verifyToken, followsRouter)
app.use("/comments", verifyToken, commentsRouter)

const Port = 3004
app.listen(Port, () => {
    console.log(`the server is run: ${Port}`);
})
