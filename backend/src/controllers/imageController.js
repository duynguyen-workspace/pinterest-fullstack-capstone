import { PrismaClient } from '@prisma/client';
import responseData from '../config/responseData.js';

const prisma = new PrismaClient()

/**
 * * API: Get all images data
 * ? Method: GET
 */
const getImages = async (req, res) => {
    const data = await prisma.images.findMany();
    responseData(res, "Success!", 200, data)
}

/**
 * * API: Get image data by image ID
 * ? Method: GET
 */
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

    if (data) {
        responseData(res, "Success!", 200, data)
    } else {
        responseData(res, "Image not existed!", 404, null)
    }
}

/**
 * * API: Search images containing the search term
 * ? Method: GET
 */
const searchImages = async (req, res) => {
    let { searchTerm } = req.params;

    const data = await prisma.images.findMany({
        where: {
            image_name: {
                contains: searchTerm,
            },
        },
    })

    if (data) {
        responseData(res, "Success!", 200, data)
    } else {
        responseData(res, "Cannot found image from searching term!", 404, null)
    }
}

/**
 * * API: Get images that were created by user
 * ? Method: GET
 */
const getCreatedImagesByUserId = async (req, res) => {
    let { userId } = req.params;

    const data = await prisma.images.findMany({ 
        where: {
            user_id: parseInt(userId)
        },
    });

    if (data) {
        responseData(res, "Success!", 200, data)
    } else {
        responseData(res, "No image found!", 404, null)
    }
}

const getSavedImagesByUserId = async (req, res) => {
    let { userId } = req.params;

    const data = await prisma.user_images.findFirst({
        where: {
            user_id: parseInt(userId)
        },
    });

    if (data) {
        responseData(res, "Success!", 200, data)
    } else {
        responseData(res, "No image found!", 404, null)
    }
}

const deleteImage = async (req, res) => {
    let { imageId } = req.params;

    await prisma.images.delete({
        where: {
            image_id: parseInt(imageId)
        },
    });

    responseData(res, "Success!", 200, null)
}

export {getImages, getImageById, searchImages, getCreatedImagesByUserId, getSavedImagesByUserId, deleteImage}


