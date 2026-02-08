import express from 'express'
const app = express();
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './config/db.js';
import UsersRoute from './routes/UserRoutes.js'
import ProductRoute from './routes/ProductRoutes.js'
import ErrorHandler from './middlewares/ErrorHandler.js';
import CartRoute from './routes/CartRoutes.js'
import OrderRoute from './routes/OrderRoutes.js'
connectDB()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api/users',UsersRoute)
app.use('/api/products',ProductRoute)
app.use('/api/cart',CartRoute)
app.use('/api/order',OrderRoute)
app.use(ErrorHandler)
app.listen(8000,()=>{
    console.log("Server is started.......8000")
})
