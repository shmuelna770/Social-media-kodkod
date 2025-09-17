import express from 'express'
import { increaseLike, decreaseLike } from '../controllers/likesControllers.js'
export {verifyToken} from "../auth/verify.js"

export const likesRout = express.Router()

likesRout.post('/increase', increaseLike)
likesRout.post('/decrease', decreaseLike)
