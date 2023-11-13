import express from "express";
import { getUserById, updateUser, userLogin, userSignUp } from "../controllers/userController.js";
const userRoute = express.Router()

//* LOGIN AND REGISTER
userRoute.post("/login", userLogin);
userRoute.post("/signup", userSignUp);

userRoute.get("/getUserById/:userId", getUserById)

userRoute.put("updateUser", updateUser)


export default userRoute