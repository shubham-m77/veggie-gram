import mongoose from "mongoose";

const addressSchema=mongoose.Schema({
    userId: {type:String,required:true,ref:"user"},
    firstName: {type:String,required:true},
    lastName: {type:String,required:true},
    phoneNumber: {type:Number,required:true},
    email:{type:String,required:true},
    addressLine1: {type:String,required:true},
    addressLine2:{type:String,},
    city: {type:String,required:true},
    state:{type:String,required:true},
    zipCode: {type:Number,required:true},
});

const Address=mongoose.models.address || mongoose.model("address",addressSchema);
export default Address