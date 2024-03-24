import express from "express";
import { getUserById, updateUser, userLogin, userSignUp } from "../controllers/userController.js";
const userRoute = express.Router()

//TODO: USER AUTHENTICATION API
userRoute.post("/login", userLogin);
userRoute.post("/login-facebook", userLogin);
userRoute.post("/register", userSignUp);

// userRoute.get("/get-user/:userId", getUserById)

//TODO: UPDATE USER INFORMATION API
userRoute.put("/update/:userId", updateUser)


export default userRoute