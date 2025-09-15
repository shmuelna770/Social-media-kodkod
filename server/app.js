
import express from "express"
import cors from "cors"
import { postsRouter } from "./routs/postRout.js"
import { userRouter } from "./routs/userRout.js"
import {followsRouter} from "./routs/followsRout.js"
import cookieParser from "cookie-parser";



const app = express();

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    method: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "PATCH"],
    alllowedHeaders: ["content-type", "Authorization"],
}))
app.use(express.json());
app.use(express.static("public"))

app.use("/posts", postsRouter)
app.use("/user", userRouter)
app.use("/follows",followsRouter)

const Port = 3004
app.listen(Port, () => {
    console.log(`the server is run: ${Port}`);
})
