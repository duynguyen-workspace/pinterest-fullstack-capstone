import express from "express";
import { getUsers, login, loginFacebook, register, updateUser, uploadAvatar, uploadImages } from "../controllers/userController.js";
import { lockApi, resetToken } from "../controllers/authController.js";
import { handleAsync } from "../utils/hof.js";
import { upload } from "../controllers/uploadController.js";

const userRoute = express.Router()

//* USER GET INFORMATION API
userRoute.get("/get-users", lockApi, getUsers)

//TODO: USER AUTHENTICATION API
userRoute.post("/login", handleAsync(login));
userRoute.post("/login-facebook", handleAsync(loginFacebook));
userRoute.post("/register", register);
userRoute.post("/reset-token", resetToken)

//TODO: UPDATE USER INFORMATION API
userRoute.put("/update", lockApi, handleAsync(updateUser))

userRoute.put("/upload-avatar", lockApi, upload.single("avatar"), uploadAvatar)

userRoute.put("/upload-image", lockApi, upload.single("image"), handleAsync(uploadImages))

userRoute.put("/upload-images", lockApi, upload.array("images"), handleAsync(uploadImages))
//! For upload multiple files -> upload.array("avatar")

export default userRoute