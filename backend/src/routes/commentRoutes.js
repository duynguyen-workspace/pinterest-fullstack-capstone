import express from "express";
import { commentImage, getCommentsByImageId } from "../controllers/commentController.js";
import { handleAsync } from "../utils/hof.js";
import { lockApi } from "../controllers/authController.js";

const commentRoute = express.Router()

//* GET COMMENTS
commentRoute.get("/get-comments/:imageId", handleAsync(getCommentsByImageId))

//TODO: CREATE COMMENT
commentRoute.post("/comment-image", lockApi, handleAsync(commentImage))


export default commentRoute