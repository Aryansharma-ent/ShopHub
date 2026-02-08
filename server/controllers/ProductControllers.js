import AsyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";


// GET all products
export const getProducts = AsyncHandler(async(req,res)=>{
    const {category,minPrice,maxPrice,search} = req.query
    let filter = {}

    if(category){
        filter.category = category
    }

    if(minPrice || maxPrice){
        filter.price = {}
        if(minPrice) filter.price.$gte = Number(minPrice)
        if(maxPrice) filter.price.$lte = Number(maxPrice)
    }
if(search){
    filter.name = { $regex : search ,$options: 'i'}
}
    
    const Products = await Product.find(filter)
    res.status(200).json(Products);
})


//GET products with ID
export const getProduct = AsyncHandler(async(req,res)=>{
   const theProduct = await Product.findById(req.params.id);
     
   if(!theProduct){
      res.status(400)
      throw new Error("Product Doesn't exist")
   }

   res.status(200).json(theProduct);

})


//POST products with only admin email
export const postProduct = AsyncHandler(async(req,res)=>{
    const {name,description,price,image,countStock,category} = req.body

    if(!name || !description || !price || !countStock || !category){
      res.status(400)
      throw new Error("Please enter all credentials")
    }

    const newProduct = await Product.create({
        name,
        description,
        price,
        image,
        countStock,
        category
    })

    res.status(201).json(newProduct)
})

//PUT update products with only admin
export const updateProduct = AsyncHandler(async(req,res)=>{
    const {name,description,price,image,countStock,category} = req.body

    if(!name || !description || !price || !countStock || !category || !image){
      res.status(400)
      throw new Error("Please enter all credentials")
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        image : req.body.image,
        countStock : req.body.countStock,
        category : req.body.category
    },{
        new : true
    })

    res.status(201).json(updatedProduct)
})


//DELETE products with only admin 
export const DeleteProduct = AsyncHandler(async(req,res)=>{
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product){
      res.status(404)
      throw new Error("Product not found")
    }

    res.status(200).json({msg : "deleted successfully"})
})


