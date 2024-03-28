import { PrismaClient } from '@prisma/client';
import { decodeToken } from '../config/jwt.js';
import responseData from '../config/responseData.js';

let prisma = new PrismaClient()

const getCommentsByImageId = async (req, res) => {
    let { imageId } = req.params;

    const data = await prisma.comments.findFirst({
        where: {
            image_id: parseInt(imageId)
        },
    });

    responseData(res, "Success", 200, data)
}

const commentImage = async (req, res) => {
    const { imageId, desc } = req.body;
    const { token } = req.headers;

    const { user_id } = decodeToken(token);

    let newComment = {
        user_id: parseInt(user_id),
        image_id: parseInt(imageId),
        comment_date: new Date(),
        description: desc,
    }

    await prisma.comments.create(newComment);
    
    responseData(res, "Create comment successfully", 201, newComment)
}

export {getCommentsByImageId, commentImage}