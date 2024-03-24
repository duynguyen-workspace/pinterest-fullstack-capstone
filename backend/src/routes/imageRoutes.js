import express from "express";
import { getImageById, getImages, getCreatedImagesByUserId, getSavedImagesByUserId, deleteImage, searchImages } from "../controllers/imageController.js";
import { handleAsync } from "../utils/hof.js"

const imageRoute = express.Router()

//* 
imageRoute.get("/get-images", handleAsync(getImages))
imageRoute.get("/get-image-by-id/:imageId", handleAsync(getImageById))
imageRoute.get("/search-images/:searchTerm", handleAsync(searchImages))
imageRoute.get("/get-created-images/:userId", handleAsync(getCreatedImagesByUserId))
imageRoute.get("/get-saved-images/:userId", handleAsync(getSavedImagesByUserId))

//!
imageRoute.delete("/delete-image", handleAsync(deleteImage))
export default imageRoute  