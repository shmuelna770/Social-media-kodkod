import express from 'express'
import { increaseLike, decreaseLike, checkLikeController } from '../controllers/likesControllers.js'
export {verifyToken} from "../auth/verify.js"

export const likesRout = express.Router()

likesRout.post('', increaseLike)
likesRout.delete('', decreaseLike)
likesRout.get('/check', checkLikeController)
