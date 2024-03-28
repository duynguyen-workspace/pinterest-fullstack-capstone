import express from "express";
import { commentImage, getCommentsByImageId } from "../controllers/commentController.js";
import { handleAsync } from "../utils/hof.js";

const commentRoute = express.Router()

//*
commentRoute.get("/get-comments/:imageId", handleAsync(getCommentsByImageId))

//*
commentRoute.post("/comment", handleAsync(commentImage))


export default commentRoute