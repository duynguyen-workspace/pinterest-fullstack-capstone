import express from "express";
import userRoute from "./userRoutes.js";
import imageRoute from "./imageRoutes.js";
import commentRoute from "./commentRoutes.js";

const rootRoute = express.Router();

//? DEFINE APPLICATION ROUTES
rootRoute.use("/users", userRoute)
rootRoute.use("/images", imageRoute)
rootRoute.use("/comments", commentRoute)

export default rootRoute;