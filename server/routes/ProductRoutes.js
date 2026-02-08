import express from 'express'
const route = express.Router()
import protect from '../middlewares/AuthMiddleware.js';
import adminCheck from '../middlewares/AdminMiddleware.js';
import {getProducts,getProduct,postProduct,updateProduct,DeleteProduct} from '../controllers/ProductControllers.js'

route.get('/',getProducts);
route.get('/:id',getProduct);
route.post('/',protect,adminCheck,postProduct);
route.put('/:id',protect,adminCheck,updateProduct);
route.delete('/:id',protect,adminCheck,DeleteProduct);

export default route