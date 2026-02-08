import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },

    shippingaddress : {
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    OrderItems : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            required : true,
        },
        quantity : {
            type : Number,
            required : true,
            default : 1,
        },
        price : {
            type : Number,
            required : true,
            default : 0,
        }
        
    }],
    PaymentStatus : {
        type : String,
        required : true,
        enum : ["Completed" , "Pending"],
        default : "Pending",
    },
    TotalPrice : {
        type : Number,
        default : 0
    },
    OrderStatus : {
        type : String,
        required : true,
        enum : ["Delivered" , "Processing" , "Cancelled" , "Shipped"],
        default : "Processing",
    }


},{
    timestamps : true,
})

const Order = mongoose.model('Order',OrderSchema);

export default Order