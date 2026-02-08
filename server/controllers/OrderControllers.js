import AsyncHandler from 'express-async-handler'
import Order from '../models/OrderModel.js'
import Product from '../models/ProductModel.js'
import Cart from '../models/CartModel.js'

//@GET my order
export const getMyOrder = AsyncHandler(async(req,res)=>{
    const orders = await Order.find({user : req.user._id})
                            .populate('user','name email')
                            .populate('OrderItems.product')
    res.status(200).json(orders)
})

//@GET get order by ID

export const getOrderById = AsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id)
                              .populate('user','name email')
                            .populate('OrderItems.product')

       if(!order){
        res.status(400)
        throw new Error("Order Doesn't exist")
       }        

       if(order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin'){
           res.status(401)
           throw new Error("Not authorized to view this order")
       }
       
       res.status(200).json(order)
})

//@POST AddOrder

export const createOrder = AsyncHandler(async(req,res)=>{
    const {shippingAddress} = req.body

    if(!shippingAddress){
        res.status(400)
        throw new Error("Please enter address for the shipment")
    }

    const cart = await Cart.findOne({user : req.user._id})
                                 .populate('items.product') 
    
  if(!cart || cart.items.length === 0){
    res.status(400)
    throw new Error("Cart is empty")
    }

    const orderItems = cart.items.map(item =>({
        product : item.product._id,
        quantity : item.quantity,
        price : item.price
    })) 

    const order = new Order({
        user : req.user._id,
        OrderItems : orderItems,
        TotalPrice : cart.totalPrice,
        shippingaddress : shippingAddress,
    })

    const createdOrder = await order.save()
    await createdOrder.populate('user', 'name email')
    await createdOrder.populate('OrderItems.product')
    
    await Cart.findOneAndDelete({user: req.user._id})
    res.status(201).json(createdOrder)
})


//@PUT REQUEST order to be cancelled

export const cancelorder = AsyncHandler(async(req,res)=>{
     const order = await Order.findById(req.params.id);

     if(!order){
        res.status(404)
        throw new Error("Order doesn't exist")
     }

     if(order.user.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error("Not authorized")
     }

     if(order.OrderStatus == 'Shipped' || order.OrderStatus == 'Delivered'){
        res.status(401)
        throw new Error("Cannot cancel shipped/delivered order")
         }

     order.OrderStatus = "Cancelled"
     await order.save()

     res.status(201).json(order)
})


//@PUT admin updates the order status

export const AdminUpdates = AsyncHandler(async(req,res)=>{
    const {OrderUpdate} = req.body;
    const order = await Order.findById(req.params.id);
     
    order.OrderStatus = OrderUpdate

    if(order.OrderStatus === 'Shipped'){
        order.PaymentStatus = 'Completed';
    }

    await order.save()
    
     res.status(201).json(order)
})

//@GET admin gets all the order
export const getAllOrders = AsyncHandler(async(req,res)=>{
    const orders = await Order.find({})
                              .populate('user', 'name email')
                              .populate('OrderItems.product')
                              .sort({ createdAt: -1 })
    
    res.status(200).json(orders)
})
