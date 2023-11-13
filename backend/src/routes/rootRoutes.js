//* Quản lý các đối tượng Router
import express from "express";
import userRoute from "./userRoutes.js";
import imageRoute from "./imageRoutes.js";
import commentRoute from "./commentRoutes.js";

const rootRoute = express.Router();

//* Define routes
rootRoute.use("/user", userRoute)
rootRoute.use("/image", imageRoute)
rootRoute.use("/comment", commentRoute)

export default rootRoute;