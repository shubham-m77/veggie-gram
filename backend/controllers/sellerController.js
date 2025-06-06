import jwt from "jsonwebtoken"
// Login Seller: api/seller/login
export const sellerLogin = async(req,res)=>{
    try {
     const {email,password}=req.body;
    if(!email || !password){
       return res.status(400).json({success:false, message:"Fill all fields!"}); 
    }
    if(email===process.env.SELLER_EMAIL && password===process.env.SELLER_PASSWORD){
       const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"7d"});
       res.cookie("sellerToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"?"none":"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
     return  res.status(200).json({success:true, message:"Login Success"});
    }
    else{
    return res.status(400).json({success:false, message:"Invalid email or password!"});
 
    }
    }  catch (err) {
            console.error(err)
           return res.status(500).json({success:false, message:"Internal Server Error"});
        }
}

// Logout Seller : api/seller/logout
export const sellerLogout=async(req,res)=>{
    try {
         res.clearCookie("sellerToken",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"?"none":"strict",
    });
    return res.status(201).json({success:true,message:"Seller Logged Out!"});    
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:err.message})    
        
    }
   
}

// Auth Seller
export const isSellerAuth=async(req,res)=>{
    try {
         return res.status(200).json({success:true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:err.message})
    }
}