
import express from "express"
import cors from "cors"
import { postsRouter } from "./routs/postRout.js"
import { userRouter } from "./routs/userRout.js"
import { followsRouter } from "./routs/followsRout.js"
import cookieParser from "cookie-parser";
import { likesRout } from "./routs/likesRout.js";
import {commentsRouter} from "./routs/commentsRout.js"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
app.use(cookieParser());

// Configure CORS for both development and production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL, 'https://*.onrender.com'] 
        : ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["content-type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static("public/postsImages"))
app.use(express.static("public/profileImages"))

// API Routes
app.use("/posts", postsRouter)
app.use("/user", userRouter)
app.use("/like", likesRout)
app.use("/follows",followsRouter)
app.use("/comments",commentsRouter)

// Serve client build in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from client build
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    // Handle client routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

// Use environment port or default to 3004
const Port = process.env.PORT || 3004;
app.listen(Port, () => {
    console.log(`Server is running on port: ${Port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
})
