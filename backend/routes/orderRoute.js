import express from "express"
import authUser from "../middlewares/authUser.js"
import { getAllOrders, getUserOrder, orderPlaceCOD, orderPlaceOnline, verifyPayment } from "../controllers/orderController.js"
import authSeller from "../middlewares/authSeller.js";
const orderRouter = express.Router()

orderRouter.post("/cod",authUser,orderPlaceCOD);
orderRouter.post("/online",authUser,orderPlaceOnline);
orderRouter.post("/verify-online",authUser,verifyPayment);
orderRouter.get("/user",authUser,getUserOrder);
orderRouter.get("/seller",authSeller,getAllOrders);

export default orderRouter