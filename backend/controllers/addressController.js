import Address from "../models/Address.js";

// add Address
export const addAddress=async(req,res)=>{
    try {
        const { address } = req.body;
        const userId = req.userId;
        const addressCreate=await Address.create({...address,userId});
       if(!addressCreate){
         return res.status(400).json({success:false, message:"Internal Server Error"});
       }
        return res.status(200).json({success:true, message:"Address Added"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}

// get All Addrsss
export const getAddress=async(req,res)=>{
    try {
       const userId =req.userId;
       const addressData=await Address.find({userId});
       if(!addressData){
         return res.status(400).json({success:false, message:"Address not found!"});
       }
        return res.status(200).json({success:true, addressData});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}