// Update cart data

import User from "../models/User.js";

export const updateCart=async(req,res)=>{
    try {
        const {cartItems}=req.body;
        const userId=req.userId;
       const updateData= await User.findByIdAndUpdate(userId,{cartItems});
       if(!updateData){
           return res.status(400).json({success:false, message:"Cart Items not Updated!"})
       }
        return res.status(200).json({success:true, message:"Cart Updated"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}