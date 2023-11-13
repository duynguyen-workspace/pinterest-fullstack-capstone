import express from "express";
import { getImageById, getImageByName, getAllImages, getCreatedImageByUserId, getSavedImageByUserId, deleteImage } from "../controllers/imageController.js";
const imageRoute = express.Router()

//* 
imageRoute.get("/getAllImages", getAllImages)

//*
imageRoute.get("/getImageById/:imageId", getImageById)

//*
imageRoute.get("/getImageByName/:imageName", getImageByName)

//*
imageRoute.get("/getCreatedImage/:userId", getCreatedImageByUserId)

//*
imageRoute.get("/getSavedImage/:userId", getSavedImageByUserId)

//!
imageRoute.delete("/deleteImage", deleteImage)
export default imageRoute