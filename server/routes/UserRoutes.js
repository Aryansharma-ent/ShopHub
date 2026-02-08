import express from 'express'
import { register,login,getProfile } from '../controllers/UserControllers.js'
import protect from '../middlewares/AuthMiddleware.js'
const route = express.Router()

route.post('/register',register)
route.post('/login',login)
route.get('/me',protect,getProfile)


export default route