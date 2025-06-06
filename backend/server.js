import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
dotenv.config()

const app= express();
const port=process.env.PORT || 2000;
// Allowed URL or origin 
const allowedOrigins=['https://veggiegram.vercel.app']

await connectDB();
await connectCloudinary();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}));


app.get("/",(req,res)=>res.send("API is Working "));
app.use("/api/user",userRouter);
app.use("/api/seller",sellerRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/address",addressRouter);
app.use("/api/order",orderRouter);

app.listen(port,()=>{
    console.log(`Server running on https://veggie-gram.vercel.app`)
})   
