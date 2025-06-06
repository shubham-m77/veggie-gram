// COD Order Place : api/order/cod

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Razorpay from "razorpay"
import crypto from "crypto"

export const orderPlaceCOD=async(req,res)=>{
    try {
        const {items,address,userId}=req.body;
        // const userId =req.userId;
        if(!address || items.length===0){
        return res.status(400).json({success:false, message:"invalid data!"});
        }
        // Calculate Order amount
        let amount=await items.reduce(async(acc,item)=>{
            const product= await Product.findById(item.product);
            return (await acc)+product.offerPrice*item.quantity;
        },0);
        // add 2% Tax
        amount+=Math.floor(amount*0.02.toFixed(2));
        const orderCreate=await Order.create({
            userId,
            items,
            amount,
            address,
            paymentMode:"COD"
        });
            return res.status(200).json({success:true, message:"Order Placed"});


 

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}


     // Razorpay Integration
// place order- online with razorpay: api/order/online
export const orderPlaceOnline=async(req,res)=>{
          const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
    try {
        const {items,address,userId}=req.body;
        // const userId =req.userId;
        if(!address || items.length===0){
        return res.status(400).json({success:false, message:"invalid data!"});
        }
        // let productData=[];

        // Calculate Order amount
        let amount=await items.reduce(async(acc,item)=>{
            const product= await Product.findById(item.product);
        //     productData.push({
        //     name:product.name,
        //     price:product.offerPrice,
        // quantity:product.quantity
        //     });
            return (await acc)+product.offerPrice*item.quantity;
        },0);
    amount+=Math.floor(amount*0.02.toFixed(2));
                // Create order in Razorpay
    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `order_rcptid_${userId}`,
    };
    const razorpayOrder = await instance.orders.create(options);

        
        const orderCreate=await Order.create({
            userId,
            items,
            amount,
            address,
            paymentMode:"Online",
            razorpayOrderId: razorpayOrder.id
        });

    await orderCreate.save();
        return res.status(200).json({success:true, message:"Payment Successfull!", orderId: razorpayOrder.id,
      razorpayOrder,
      key: process.env.RAZORPAY_API_KEY,});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}

// verify online razorpay order: api/order/online-verify
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // 1. Validate signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    //   console.log(`${generated_signature} and& ${razorpay_signature}` )

    if (generated_signature !== razorpay_signature) {
       const deleteOrder = await Order.findOneAndDelete(
        { razorpayOrderId: razorpay_order_id });
      return res.status(400).json({ success: false, message: "Invalid payment signature" });

    }

    // 2. Find and update order
    const updatedOrder = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id }, // <-- This must match the one you saved during order creation
        {
          isPaid: true,
          paymentId: razorpay_payment_id,
        },
        { new: true }
      );

    return res.status(200).json({ success: true, message: "Payment verified and order updated" });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get user orders :api/order/user
export const getUserOrder=async(req,res)=>{
    try {
        const userId=req.userId;
       const ordersData=await Order.find({
        userId,
        $or:[{paymentMode:"COD"},{isPaid:true}]
       }).populate("items.product address").sort({createdAt:-1});
       if(!ordersData){
        return res.status(400).json({success:false, message:"Sorry, Order not available!"});
       }
        return res.status(200).json({success:true, ordersData});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}

// get all orders fr seller :api/order/seller
export const getAllOrders=async(req,res)=>{
    try {
        const ordersData=await Order.find({
        $or:[{paymentMode:"COD"},{isPaid:true}]
       }).populate("items.product address").sort({createdAt:-1});
       if(!ordersData){
        return res.status(400).json({success:false, message:"Sorry, Order not available!"});
       }
        return res.status(200).json({success:false, ordersData});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal Server Error"});

    }
}
