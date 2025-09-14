
import express from "express"
import cors from "cors"
import { postsRouter,userRouter } from "./routs/router.js"
import cookieParser from "cookie-parser";



const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
    method: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "PATCH"],
    alllowedHeaders: ["content-type", "Authorization"],
}))
app.use(express.json());
app.use(express.static("public"))


app.use("/posts", postsRouter)
app.use("/user", userRouter)

const Port = 3004
app.listen(Port, () => {
    console.log(`the server is run: ${Port}`);
})
