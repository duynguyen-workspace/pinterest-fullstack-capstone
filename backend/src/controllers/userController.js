import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { createRefToken, createToken, decodeToken } from "../config/jwt.js";
import responseData from '../config/responseData.js';

const prisma = new PrismaClient()

/**
 ** API: Register 
 *? METHOD: POST
 */
const register = async (req, res) => {
    const { full_name, email, user_password } = req.body;

    // Check if email already existed
    const checkedUser = await prisma.users.findMany({
        where: {
            email: email
        }
    })

    if (checkedUser) {
        responseData(res, "Email already existed", 404, null)
        return;
    }

    // Encrypt password - saltRound: 10
    const encryptedPass = bcrypt.hashSync(user_password, 10)

    const newUser = {
        full_name,
        age: null,
        email,
        user_password: encryptedPass,
        avatar:"",
    }

    await prisma.users.create({data: newUser}); 

    responseData(res, "Register successfully!", 201, newUser)
}

/**
 ** API: Login
 *? METHOD: POST
 */
const login = async (req, res) => {
    const { email, password } = req.body

    // Check if user exists
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

    // Create jwt token
    let token = createToken({ 
        userId: checkedUser.user_id,
        key: new Date().getTime()
    })

    // Create jwt refresh token
    let refreshToken = createRefToken({ 
        userId: checkedUser.user_id,
        key: new Date().getTime()
    });
    
    await prisma.users.update({
        where: {
            user_id: checkedUser.user_id
        },
        data: {
            refresh_token: refreshToken
        }
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

//*
const updateUser = async (req, res) => {
    let { fullName, age, email, password } = req.body;
    let { token } = req.headers;

    let { user_id } = decodeToken(token);

    let checkedUser = await prisma.users.findFirst({
        where: {
            user_id,
        }
    })

    if (!checkedUser) {
        responseData(res, "No user found", 404, null)
        return
    }

    let encryptedPw = bcrypt.hashSync(password, 10)

    await prisma.users.update(checkedUser, {
        where: {
            user_id: user_id
        },
        data: {
            full_name: fullName,
            age,
            email: email,
            user_password: encryptedPw
        }
    }); 

    responseData(res, "Update user successfully", 200, )
}

export {login, loginFacebook, register, getUsers, updateUser}