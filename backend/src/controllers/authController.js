import { checkRefToken, checkToken, createToken, decodeToken } from "../config/jwt.js";
import responseData from "../config/responseData.js";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * * Middleware Function: Authenticate user
 */
const lockApi = (req, res, next) => { 
    try {
        let { token } = req.headers;

        if (!checkToken(token)) {
            next()
        } else {
            throw new Error
        }
    } catch (exception) {
        responseData(res, "Access permission denied", 401, "")
    }
};

/**
 * * Middleware Function: Reset refresh token
 */
const resetToken = async (req, res) => {
    // Verify token
    const { token } = req.headers
    const errToken = checkToken(token)

    //* Check if token is expired => denied user
    if (errToken && errToken.name !== "TokenExpiredError") {
        responseData(res, "Access permission denied!", 401, "")
        return
    }

    // Get user data from token
    const checkedToken = decodeToken(token)
    
    let checkedUser = await prisma.users.findFirst({
        where: {
            user_id: checkedToken.userId,
        }
    })

    if (!checkedUser) {
        responseData(res, "User not found. Access permission denied!", 401, "")
        return
    }

    // Check refresh token (if expired)
    const refreshToken = checkedUser.refresh_token
    const errRefToken = checkRefToken(refreshToken)

    if (errRefToken && errRefToken.name !== "TokenExpiredError") {
        responseData(res, "Access permission denied!", 401, "")
        return
    }

    // Compare login token and refresh token "key"
    let checkedRefToken = decodeToken(refreshToken)

    if (checkedToken.key !== checkedRefToken.key) {
        responseData(res, "Access permission denied!", 401, "")
        return
    }
    
    // Create token
    let newToken = createToken({ user_id: checkedUser.user_id })

    if (newToken) {
        responseData(res, "Reset token successfully!", 200, newToken)
    } else {
        responseData(res, "Error in reseting token!", 404, "")
    }
}

export { lockApi, resetToken }