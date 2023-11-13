import jwt from 'jsonwebtoken';

//* Generate token
const createToken = (data) => {
    // HS256
    let token = jwt.sign({data}, "NODE35_CAPSTONE", { // Khoá bí mật
        expiresIn:"24h" // 5000, "5d", "1h"
    })
    return token
}

//* Validate token
const checkToken = (token) => {
    return jwt.verify(token, "NODE35_CAPSTONE");
}

//* Decode token
const decodeToken = (token) => {
    return jwt.decode(token);
}

export {
    createToken,
    checkToken,
    decodeToken
}