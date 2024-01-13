import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient()

const getAllImages = async (req, res) => {
    const data = await prisma.images.findMany();
    res.send(data)
}

const getImageByName = async (req, res) => {
    let { imageName } = req.params;

    const data = await prisma.images.findMany({
        where: {
            image_name: {
                contains: imageName,
            },
        },
    })

    res.send(data)
}

const getImageById = async (req, res) => {
    let { imageId } = req.params;

    const data = await prisma.images.findFirst({
        where: {
            image_id: parseInt(imageId)
        },
        include: {
            users: true 
        } 
    });

    res.send(data)
}

const getCreatedImageByUserId = async (req, res) => {
    let { userId } = req.params;

    const data = await prisma.images.findFirst({ 
        where: {
            user_id: parseInt(userId)
        },
    });

    res.send(data)
}

const getSavedImageByUserId = async (req, res) => {
    let { userId } = req.params;

    const data = await prisma.user_images.findFirst({
        where: {
            user_id: parseInt(userId)
        },
    });

    res.send(data)
}

const deleteImage = async (req, res) => {
    let { imageId } = req.params;

    await prisma.images.delete({
        where: {
            image_id: parseInt(imageId)
        },
    });

    res.send(`Delete image ${imageId} successfully!`)
}

export {getAllImages, getImageById, getImageByName, getCreatedImageByUserId, getSavedImageByUserId, deleteImage}


