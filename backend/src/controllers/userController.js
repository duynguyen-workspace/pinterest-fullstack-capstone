import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { createRefToken, createToken, decodeToken } from "../config/jwt.js";
import responseData from '../config/responseData.js';
import compress_images from 'compress-images'

const prisma = new PrismaClient()

/**
 ** API: Register 
 *? METHOD: POST
 */
const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    // Check if email already existed
    const checkedUser = await prisma.users.findFirst({
        where: {
            email: email,
        }
    })

    if (checkedUser) {
        responseData(res, "Email already existed", 404, null)
        return;
    }

    // Encrypt password - saltRound: 10
    const encryptedPass = bcrypt.hashSync(password, 10)

    const newUser = {
        full_name: fullName,
        age: null,
        email,
        user_password: encryptedPass,
        avatar: "",
        refresh_token: "",
        face_app_id: "",
    }

    await prisma.users.create({ data: newUser });

    responseData(res, "Register successfully!", 201, newUser)
}

/**
 ** API: Login
 *? METHOD: POST
 */
const login = async (req, res) => {
    const { email, password } = req.body

    // Check if email exists
    let checkedUser = await prisma.users.findFirst({
        where: {
            email: email
        }
    })

    if (!checkedUser) {
        responseData(res, "Email not existed!", 404, null)
        return
    }

    // Check password
    let checkedPw = bcrypt.compareSync(password, checkedUser.user_password)

    if (!checkedPw) {
        responseData(res, "Incorrect password", 404, null)
        return
    }

    //// console.log(checkedUser)

    // Create jwt token
    let token = createToken({
        userId: checkedUser.user_id,
        key: new Date().getTime()
    })

    //// console.log("Token: ", token)

    // Create jwt refresh token
    let refreshToken = createRefToken({
        userId: checkedUser.user_id,
        key: new Date().getTime()
    });

    //// console.log("Refresh token: ", refreshToken)

    // 
    await prisma.users.update({
        where: {
            user_id: checkedUser.user_id
        },
        data: {
            refresh_token: refreshToken,
        },
    })

    responseData(res, "Login successfully", 200, token)
}

/**
 ** API: Login Facebook
 *? METHOD: POST
 */
const loginFacebook = async (req, res) => {
    //* id: facebook id
    const { fullName, id } = req.body

    let checkedUser = await prisma.users.findFirst({
        where: {
            face_app_id: id
        }
    })

    //* User exists -> return token
    if (checkedUser) {
        let token = createToken({ userId: checkedUser.user_id, key: new Date().getTime() })

        responseData(res, "Login successfully!", 200, token)
        return
    }

    //? User not existed -> Create new user from facebook info
    let newUser = {
        full_name: fullName,
        email: "",
        pass_word: "",
        face_app_id: id,
    }

    await model.users.create(newUser)

    let token = createToken({ userId: newUser.user_id })
    responseData(res, "Login successfully!", 200, token)
}

//*
const getUsers = async (req, res) => {
    const data = await prisma.users.findMany()
    responseData(res, "Success!", 200, data)
}

/**
 * 
 * 
 */
const updateUser = async (req, res) => {
    let { fullName, age, email } = req.body;
    let { token } = req.headers;

    let { userId } = decodeToken(token);

    let checkedUser = await prisma.users.findFirst({
        where: {
            user_id: parseInt(userId),
        }
    })

    if (!checkedUser) {
        responseData(res, "No user found", 404, null)
        return
    }

    let newData = {
        full_name: fullName,
        age,
        email: email,
    }

    await prisma.users.update({
        where: {
            user_id: parseInt(userId)
        },
        data: newData
    });

    responseData(res, "Update user successfully", 200, newData)
}

const updatePassword = async (req, res) => {
    let { password } = req.body;
    let { token } = req.headers;

    let { userId } = decodeToken(token);

    let checkedUser = await prisma.users.findFirst({
        where: {
            user_id: parseInt(userId),
        }
    })

    if (!checkedUser) {
        responseData(res, "No user found", 404, null)
        return
    }

    let encryptedPw = bcrypt.hashSync(password, 10)

    await prisma.users.update({
        where: {
            user_id: parseInt(userId)
        },
        data: {
            user_password: encryptedPw
        }
    });

    responseData(res, "Update user password successfully", 200, "")

}

const uploadAvatar = async (req, res) => {
    const file = req.file;

    const { token } = req.headers;
    const { userId } = decodeToken(token)

    let checkedUser = await prisma.users.findFirst({
        where: {
            user_id: parseInt(userId)
        }
    })

    if (!checkedUser) {
        responseData(res, "User not found!", 404, null)
        return
    }

    await prisma.users.update({
        where: {
            user_id: parseInt(userId)
        },
        data: {
            avatar: file.filename
        }
    })

    //* Optimize image size (compress image)
    compress_images(
        process.cwd() + `/public/img/` + file.fileName,
        process.cwd() + "/public/files/",
        { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "25"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        (error, completed, statistic) => {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        }
    );

    responseData(res, "Upload successfully", 200, file.filename)
}

const uploadImage = async (req, res) => {
    const file = req.file;
    const { imageName, description } = req.body;


    const { token } = req.headers;
    const { userId } = decodeToken(token)

    let checkedUser = await prisma.users.findFirst({
        where: {
            user_id: parseInt(userId)
        }
    })

    if (!checkedUser) {
        responseData(res, "User not found!", 404, null)
        return
    }

    let newImage = {
        user_id: parseInt(userId),
        image_name: imageName,
        url: file.filename,
        description
    }

    try {
        await prisma.images.create({ data: newImage })
    } catch (err) {
        throw new Error(err)
    }
    //* Optimize image size (compress image)
    compress_images(
        process.cwd() + "/public/img/" + file.fileName,
        process.cwd() + "/public/files/",
        { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "25"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        (error, completed, statistic) => {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        }
    );

    responseData(res, "Upload successfully", 200, file.filename)
}

export { login, loginFacebook, register, getUsers, updateUser, updatePassword, uploadAvatar, uploadImage }