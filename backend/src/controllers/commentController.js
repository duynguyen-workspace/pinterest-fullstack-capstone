import { PrismaClient } from '@prisma/client';
import { decodeToken } from '../config/jwt.js';
import responseData from '../config/responseData.js';

let prisma = new PrismaClient()

const getCommentsByImageId = async (req, res) => {
    let { imageId } = req.params;

    const data = await prisma.comments.findMany({
        where: {
            image_id: parseInt(imageId)
        },
    });

    responseData(res, "Success", 200, data)
}

const commentImage = async (req, res) => {
    const { imageId, desc } = req.body;
    const { token } = req.headers;

    const { userId } = decodeToken(token);

    let newComment = {
        user_id: parseInt(userId),
        image_id: parseInt(imageId),
        comment_date: new Date(),
        description: desc,
    }

    try {
        await prisma.comments.create({
            data: newComment
        });
        responseData(res, "Create comment successfully", 201, newComment)
    } catch (err) {
        responseData(res, "Error in creating comment", 500, err)
    }
}

export {getCommentsByImageId, commentImage}