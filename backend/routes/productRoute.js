import express from "express"
import { addProduct, productById, productList, stockChange } from "../controllers/productController.js";
import authSeller from "../middlewares/authSeller.js";
import { upload } from "../configs/multer.js";
const productRouter=express.Router();

productRouter.post("/add",authSeller,upload.array(["images"]),addProduct);
productRouter.get("/list",productList);
productRouter.get("/id",productById);
productRouter.post("/stock",authSeller,stockChange);

export default productRouter