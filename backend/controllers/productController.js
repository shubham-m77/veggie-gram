import {v2 as cloudinary} from "cloudinary"
import Product from "../models/Product.js";
// Add Product : api/product/add
export const addProduct=async(req,res)=>{
    try {
        let productData=JSON.parse(req.body.productData)
        const images=req.files;
if (!images || images.length === 0) {
  return res.status(400).json({ success: false, message: "No images uploaded." });
}
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{
                    resource_type:"image"
                });
           
                return result.secure_url;
                 
            })
        );
     
        await Product.create({...productData,images:imagesUrl});
        return res.status(200).json({success:true, message:"Product Added"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}

// Get Product : api/product/list
export const productList=async(req,res)=>{
    try {
        const products=await Product.find({});
        if(!products){
            return res.status(401).json({success:false, message:"Product not Found!"});
        }
        return res.status(200).json({success:true, products});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}


// Get single Product : api/product/id
export const productById=async(req,res)=>{
    try {
        const {id}=req.body;
        const product = await Product.findById(id);
        if(!product){
            return res.status(401).json({success:false, message:"Product not Found!"});
        }
        return res.status(200).json({success:true, product});        

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}

// stock change : api/product/stock
export const stockChange=async(req,res)=>{
    try {
        const {id,inStock}=req.body;
        const updateStock=await Product.findByIdAndUpdate(id,{inStock});
        if(!updateStock){
            return res.status(401).json({success:false, message:"Product Stock not Updated!"});
        }
        return res.status(200).json({success:true, message:"Stock Updated"});           
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}

