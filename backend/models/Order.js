import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"},
    items: [
        {product:{type:String,required:true,ref:"product"},
        quantity:{type:Number,required:true},
    }],
    amount: {type:Number,required:true},
    address: {type:String,required:true,ref:"address"},
    status:{type:String,default:"Placed"},
    paymentMode: {type:String,required:true},
    paymentId:{type:String,default:null},
    razorpayOrderId:{type:String,default:null},
    isPaid:{type:Boolean,default:false},
},{timestamps:true});

const Order=mongoose.models.order || mongoose.model("order",orderSchema);
export default Order