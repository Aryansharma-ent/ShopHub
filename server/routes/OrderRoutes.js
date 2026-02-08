import express from 'express'
import { AdminUpdates, cancelorder, createOrder, getAllOrders, getMyOrder, getOrderById } from '../controllers/OrderControllers.js'
const route = express.Router()
import protect from '../middlewares/AuthMiddleware.js';
import Admin from '../middlewares/AdminMiddleware.js'

route.get('/',protect,getMyOrder);
route.get('/all',protect,Admin,getAllOrders)
route.get('/:id',protect,getOrderById);
route.post('/',protect,createOrder)
route.put('/cancel/:id',cancelorder)
route.put('/update/:id',protect,Admin,AdminUpdates)

export default route