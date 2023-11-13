import express from "express";
import { commentImage, getCommentByImageId } from "../controllers/commentController.js";

const commentRoute = express.Router()

//*
commentRoute.get("/getCommentByImageId/:imageId", getCommentByImageId)

//*
commentRoute.post("/comment", commentImage)

//*


export default commentRoute