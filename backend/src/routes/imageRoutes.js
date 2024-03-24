import express from "express";
import { getImageById, getImageByName, getAllImages, getCreatedImageByUserId, getSavedImageByUserId, deleteImage } from "../controllers/imageController.js";
const imageRoute = express.Router()

//* 
imageRoute.get("/get-images", getAllImages)

//*
imageRoute.get("/get-image-by-id/:imageId", getImageById)

//*
imageRoute.get("/search-image/:imageName", getImageByName)

//*
imageRoute.get("/getCreatedImage/:userId", getCreatedImageByUserId)

//*
imageRoute.get("/getSavedImage/:userId", getSavedImageByUserId)

//!
imageRoute.delete("/delete-image", deleteImage)
export default imageRoute  