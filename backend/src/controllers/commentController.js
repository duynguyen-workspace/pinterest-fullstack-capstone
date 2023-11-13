import { PrismaClient } from '@prisma/client';
import { decodeToken } from '../config/jwt.js';

let prisma = new PrismaClient()

const getCommentByImageId = async (req, res) => {
    let { imageId } = req.params;

    const data = await prisma.comments.findFirst({
        where: {
            image_id: parseInt(imageId)
        },
    });

    res.send(data)
}

const commentImage = async (req, res) => {
    let { imageId, desc } = req.body;
    let { token } = req.headers;

    let userInfo = decodeToken(token);
    let { user_id } = userInfo.data.user

    let newComment = {
        user_id: parseInt(user_id),
        image_id: parseInt(imageId),
        comment_date: new Date(),
        description: desc,
    }
    await prisma.comments.create(newComment);
    
    res.send("Create new comment successfully!");
}

export {getCommentByImageId, commentImage}