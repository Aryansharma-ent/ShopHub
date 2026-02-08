import express from 'express'
import { addCart, DeleteCart, getCart, UpdateCart } from '../controllers/CartControllers.js'
const route = express.Router()
import protect from '../middlewares/AuthMiddleware.js'
route.get('/',protect,getCart);
route.post('/',protect,addCart);
route.put('/',protect,UpdateCart)
route.delete('/:id/cancel',protect,DeleteCart);

export default route;