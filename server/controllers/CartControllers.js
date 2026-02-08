import mongoose from "mongoose";
import Cart from "../models/CartModel.js";
import Product from '../models/ProductModel.js'
import AsyncHandler from 'express-async-handler';

// @GET user cart
export const getCart = AsyncHandler(async(req,res)=>{
    const cart = await Cart.findOne({user : req.user._id})
                    .populate('user','name email')
                      .populate('items.product')
    if(!cart){
        res.status(400);
        throw new Error("Cart doesn't exist")
    }

    res.status(200).json(cart)
}) 

//@POST add cart
export const addCart = AsyncHandler(async(req,res)=>{
    const {productId,quantity} = req.body;

    const product = await Product.findById(productId);

     if(!product){
        res.status(400);
        throw new Error("Product is not registered");
     }
    let cart = await Cart.findOne({user : req.user._id})

    if(!cart){
        cart = new Cart({
            user : req.user._id,
            items : []
        })
    }
    

    
    cart.items.push({
        product : productId,
        quantity : quantity,
        price : product.price,
    })

    cart.totalPrice = cart.items.reduce((total,item)=>{
        return total + (item.price * item.quantity)
    }, 0);
      

    await cart.save()
    cart = await cart.populate('items.product')

    res.status(201).json(cart);
})


//@PUT Update in cart
export const UpdateCart = AsyncHandler(async(req,res)=>{
    const {productId,quantity} = req.body
    
    let cart = await Cart.findOne({user : req.user._id})
    if(!cart){
    res.status(400)
    throw new Error("Cart doesn't exist")
}


    let itemIndex = cart.items.findIndex(item => item.product.toString() == productId)
  
    if(itemIndex === -1){
        res.status(400)
        throw new Error("Item doesn't exist");
    }

    cart.items[itemIndex].quantity = quantity;

    cart.totalPrice = cart.items.reduce((total,item)=>{
        return total + (item.price * item.quantity);
    },0)

    await cart.save();
    cart = await cart.populate('items.product')

    res.status(201).json(cart)
})



//@DELETE Cart products
export const DeleteCart = AsyncHandler(async(req,res)=>{
    const {productId} = req.body
    let cart = await Cart.findOne({user : req.user._id});
    if(!cart){
        res.status(400)
        throw new Error("Cart doesn't exist for the user")
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId)

    await cart.save();

    cart = await cart.populate('items.product')

    res.status(200).json(cart)
})