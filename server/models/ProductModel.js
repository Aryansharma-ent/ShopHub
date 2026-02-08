import mongoose from "mongoose";

const ProductModel = mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    image : {
        type : [String],
        required : true,
    },
      countStock : {
         type : Number,
         required : true,
         default : 0
      },
    rating : {
        type : Number,
        default : 0
    },
    category : {
        type : String,
        required : true,
        trim : true
    }
},{
    timestamps : true
})

const Product = mongoose.model('Product',ProductModel);

export default Product