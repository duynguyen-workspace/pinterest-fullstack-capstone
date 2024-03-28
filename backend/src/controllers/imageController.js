import { PrismaClient } from '@prisma/client';
import responseData from '../config/responseData.js';
import { checkToken, decodeToken } from '../config/jwt.js';

const prisma = new PrismaClient()

/**
 * * API: Get all images data
 * ? Method: GET
 */
const getImages = async (req, res) => {
    const data = await prisma.images.findMany();
    responseData(res, "Success!", 200, data)
}

const getImagePagination = async (req, res) => {
    let { page } = req.params

    let pageSize = 3

    let data = await prisma.images.findAll({
        limit: pageSize,
        offset: pageSize * (page - 1)
    })

    let dataCount = await model.video.count()

    responseData(res, "Success", 200, {content: data, pagination: Math.ceil(dataCount / pageSize)})
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
    let { searchTerm } = req.body;

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
 * * API: Check image saved status 
 * ? Method: GET
 */
const getImageSavedStatus = async (req, res) => {
    let { imageId } = req.params;
    let { token } = req.headers;

    let { user_id } = decodeToken(token)

    const data = await prisma.user_images.findFirst({
        where: {
            image_id: parseInt(imageId),
            user_id: parseInt(user_id),
        },
    });

    // Case 1: User never like the image before
    if (!data) {
        responseData(res, "No existing saved status!", 200, false)
        return
    }

    // Case 2: User already like/dislike before
    let likeStatus = data.status;

    if (likeStatus == 1) {
        responseData(res, "Saved!", 200, true)
    } else {
        responseData(res, "Unsaved!", 200, false)
    }
}

/**
 * * API: Save image
 * ? Method: POST
 */
const saveImage = async (req, res) => {
    let { imageId } = req.params;
    let { token } = req.headers;

    let { user_id } = decodeToken(token)

    const data = await prisma.user_images.findFirst({
        where: {
            image_id: parseInt(imageId),
            user_id: parseInt(user_id),
        },
    });

    //* Case 1: No saved data found
    if (!data) {
        let savedModel = {
            image_id: parseInt(imageId),
            user_id: parseInt(user_id),
            saved_date: new Date(),
            status: 1
        }
    
        await prisma.user_images.create({data: savedModel});
        return
    }

    //* Case 2: If image was saved before => update saved status
    let newSavedStatus = data.status == 1 ? 0 : 1

    await prisma.user_images.update({
        where: {
            image_id: parseInt(imageId),
            user_id: parseInt(user_id),
        },
        data: {
            status: newSavedStatus
        }
    })

    responseData(res, "Update saved status successfully!", 200, null)
}

/**
 * * API: Get images that were created by user
 * ? Method: GET
 */
const getCreatedImagesByUserId = async (req, res) => {
    let { token } = req.headers;
    let { user_id } = decodeToken(token)

    const data = await prisma.images.findMany({ 
        where: {
            user_id: parseInt(user_id)
        },
    });

    if (data) {
        responseData(res, "Success!", 200, data)
    } else {
        responseData(res, "No image found!", 404, null)
    }
}

const getSavedImagesByUserId = async (req, res) => {
    let { token } = req.headers;
    let { user_id } = decodeToken(token)

    const data = await prisma.user_images.findFirst({
        where: {
            user_id: parseInt(user_id)
        },
    });

    if (data) {
        responseData(res, "Success!", 200, data)
    } else {
        responseData(res, "No image found!", 404, null)
    }
}

/**
 * * API: Delete existing image
 * ! Method: DELETE
 */
const deleteImage = async (req, res) => {
    let { imageId } = req.params;

    await prisma.images.delete({
        where: {
            image_id: parseInt(imageId)
        },
    });

    responseData(res, "Success!", 200, null)
}

export {getImages, getImageById, searchImages, getCreatedImagesByUserId, getSavedImagesByUserId, deleteImage, getImageSavedStatus, saveImage}


