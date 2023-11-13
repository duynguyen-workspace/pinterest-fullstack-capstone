import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { createToken, decodeToken } from "../config/jwt.js";

let prisma = new PrismaClient()

//* 
const userSignUp = async (req, res) => {
    const { full_name, age, email, user_password } = req.body;

    const user = await prisma.users.findMany({
        where: {
            email: email
        }
    })
    // console.log(user)

    if (user.length != 0) {
        res.send("Email đã tồn tại")
        return;
    }

    //* 
    const encryptedPass = bcrypt.hashSync(user_password, 10)
    const newUser = {
        full_name,
        age,
        email,
        user_password: encryptedPass, //* mã hoá password
        avatar:"",
    }

    await prisma.users.create({data: newUser}); 

    res.send("Đăng ký thành công");
}

//*
const userLogin = async (req, res) => {
    let {email, user_password} = req.body

    let user = await prisma.users.findFirst({
        where: {
            email: email
        }
    })
    console.log(user)

    //* Check if user exists
    if (user) {
        let checkPass = await bcrypt.compareSync(user_password, user.user_password)
        if (checkPass) {
            //* json web token
            let token = createToken({user, user_password: ""})
            res.status(200).send(token);
        } else {
            res.status(404).send("Mật khẩu không đúng");
        }
    } else {
        res.status(404).send("Email không đúng");
    }
}

//*
const getUserById = async (req, res) => {
    let { userId } = req.params;

    const data = await prisma.users.findFirst({
        where: {
            user_id: parseInt(userId)
        }
    })

    res.send(data)
}

//*
const updateUser = async (req, res) => {
    let { full_name, email, user_password } = req.body;

    let { token } = req.headers;
    let userInfo = decodeToken(token);

    let { user_id } = userInfo.data.user;
    let encryptedPass = bcrypt.hashSync(user_password, 10)

    let foundUser = await prisma.users.findFirst({
        where: {
            user_id: user_id
        }
    })

    foundUser = {...foundUser, full_name: full_name, email: email, user_password: encryptedPass};

    //* UPDATE users SET ... WHERE user_id = ...
    await prisma.users.update(foundUser, {
        where: {
            user_id: user_id
        }
    });

    res.send("Update info successfully");
}

export {userLogin, userSignUp, getUserById, updateUser}