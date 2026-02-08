import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import AsyncHandler from 'express-async-handler'

const generateToken =(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn : '30d'
  })
}

//@POST request
// register

export const register = AsyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    let role = req.body.role || "user"

    if(!name || !email || !password ){
         res.status(400)
         throw new Error("Please enter all the credentials")
    }


    const user = await User.findOne({email})

    if(user){
        res.status(400)
        throw new Error("User already exists")
    }

    if(email === process.env.ADMIN_EMAIL){
        role = "admin"
    }

    const Salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,Salt)

    const newuser = await User.create({
        name,
        email,
        password : hashedPassword,
        role
    })

    if(newuser){
        res.status(201).json({
            _id : newuser._id,
            name : newuser.name,
            email : newuser.email,
            role : newuser.role,
            token : generateToken(newuser._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// @POST request
//  login user
export const login = AsyncHandler(async(req,res)=>{
     const {email,password} = req.body;
     
     if(!email || !password){
       res.status(400)
       throw new Error("Please enter valid and complete credentials")
     }

     const user = await User.findOne({email});
     if(!user){
       res.status(400)
       throw new Error("User doesn't exist")
     }

    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            role : user.role,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

// @GET request
// Get user profile (protected route)
export const getProfile = AsyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
})