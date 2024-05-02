import express from "express";
import { getImageById, getImages, getCreatedImagesByUserId, getSavedImagesByUserId, deleteImage, searchImages, getImageSavedStatus, saveImage } from "../controllers/imageController.js";
import { handleAsync } from "../utils/hof.js"
import { lockApi } from "../controllers/authController.js";

const imageRoute = express.Router()

//* 
imageRoute.get("/get-images", handleAsync(getImages))
imageRoute.get("/get-image-by-id/:imageId", handleAsync(getImageById))
imageRoute.get("/get-image-saved-status/:imageId", lockApi, getImageSavedStatus)
imageRoute.get("/search-images", handleAsync(searchImages))
imageRoute.get("/get-created-images", lockApi, handleAsync(getCreatedImagesByUserId))
imageRoute.get("/get-saved-images", lockApi, handleAsync(getSavedImagesByUserId))

//TODO
imageRoute.post("/save-image/:imageId", lockApi, handleAsync(saveImage))

//!
imageRoute.delete("/delete-image/:imageId", lockApi, handleAsync(deleteImage))
export default imageRoute