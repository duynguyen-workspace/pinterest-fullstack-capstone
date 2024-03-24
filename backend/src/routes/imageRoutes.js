import express from "express";
import { getImageById, getImages, getCreatedImagesByUserId, getSavedImagesByUserId, deleteImage, searchImages } from "../controllers/imageController.js";
import { handleAsync } from "../utils/hof.js"

const imageRoute = express.Router()

//* 
imageRoute.get("/get-images", handleAsync(getImages))
imageRoute.get("/get-image-by-id/:imageId", handleAsync(getImageById))
imageRoute.get("/search-images/:searchTerm", searchImages)
imageRoute.get("/get-created-images/:userId", getCreatedImagesByUserId)
imageRoute.get("/get-saved-images/:userId", getSavedImagesByUserId)

//!
imageRoute.delete("/delete-image", deleteImage)
export default imageRoute  