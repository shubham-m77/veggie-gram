import express from "express";
import { isAuth, login, logout, register } from "../controllers/UserController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/auth-user",authUser,isAuth);
userRouter.get("/logout",logout);

export default userRouter;
