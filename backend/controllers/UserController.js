import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userInfo } from "os";


// Register User
export const register=async(req,res)=>{
     
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({success:false, message:"Please fill all fields"});
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({success:false, message:"User already exists"});
        }

        // Create new user
        const hashPass= await bcrypt.hash(password, 10);
        const newUser =  await User.create({name, email, password:hashPass});
        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:"7d"});    
        
       return res.status(200).res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"?"none":"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).json({success:true, data:{name:newUser.name, email:newUser.email}, message:"User registered successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

// Login User
export const login=async(req,res)=>{
try{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(401).json({success:false,message:"Please Fill all fields!"});
    }
    // user check
    const userData=await User.findOne({email})
    if(!userData){
        return res.status(400).json({success:false,message:"User not found!"});
    }
    // password Check
    const isPasswordValid=await bcrypt.compare(password,userData.password);
    if(!isPasswordValid){
        return res.status(402).json({success:false,message:"Password is wrong"});
    }
     const token = jwt.sign({id:userData._id}, process.env.JWT_SECRET, {expiresIn:"7d"});    
         return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"?"none":"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).status(201).json({success:true,message:"User Loggined",data:{email:userData.email,name:userData.name}});;
 
}
catch(err){
    console.error(err);
    return res.status(500).json({success:false,message:err.message});
}
}

// Check User Auth
export const isAuth=async(req,res)=>{
    try {
        const userId =req.userId;
        const userData=await User.findById(userId).select("-password");
        if(!userData){
        return res.status(401).json({success:false,message:"User Data not found!"});    
        }
         return res.status(200).json({success:true,userData});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:err.message})
    }
}

// Logout User
export const logout=async(req,res)=>{
    try {
         res.clearCookie("token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"?"none":"strict",
    });
    return res.status(201).json({success:true,message:"User Logged Out!"});    
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:err.message})    
        
    }
   
}