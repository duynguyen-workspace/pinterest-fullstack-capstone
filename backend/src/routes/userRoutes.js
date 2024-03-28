import express from "express";
import { getUsers, login, loginFacebook, register, updateUser } from "../controllers/userController.js";
import { lockApi, resetToken } from "../controllers/authController.js";
import { handleAsync } from "../utils/hof.js";

const userRoute = express.Router()

//TODO: USER AUTHENTICATION API
userRoute.get("/get-users", lockApi, handleAsync(getUsers))

userRoute.post("/login", handleAsync(login));
userRoute.post("/login-facebook", handleAsync(loginFacebook));
userRoute.post("/register", register);
userRoute.post("/reset-token", resetToken) 

//TODO: UPDATE USER INFORMATION API
userRoute.put("/update", lockApi, handleAsync(updateUser))
userRoute.put("/upload-avatar", lockApi, () => {})


export default userRoute