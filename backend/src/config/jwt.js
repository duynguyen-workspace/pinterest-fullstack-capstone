import jwt from 'jsonwebtoken';

/**
 * * Function: Generate Token
 * @param {*} data: object contains user's info (user_id) and key (current datetime)
 * @returns: jwt encrypted token
 * ? Encryption Algorithm: HS256
 * ? Secret Key: PINTEREST_SECRET
 * ? Expiration: 3 hours
 */
const createToken = (data) => {
    
    let token = jwt.sign(data, "PINTEREST_SECRET", {
        expiresIn:"3h"
    })
    return token
}

/**
 * * Function: Validate Token
 * @param {*} token
 * @returns boolean
 * ? Secret Key: PINTEREST_SECRET
 */
const checkToken = (token) => {
    return jwt.verify(token, "PINTEREST_SECRET", error => error);
}

/**
 * * Function: Decode Token
 * @param {*} token
 * @returns object: decrypted user's info
 */
const decodeToken = (token) => {
    return jwt.decode(token);
}

/**
 * * Function: Generate Refresh Token
 * @param {*} data: object contains user's info (user_id) and key (current datetime)
 * @returns: jwt encrypted token
 * ? Encryption Algorithm: HS256
 * ? Secret Key: PINTEREST_SECRET_REF
 * ? Expiration: 3 hours
 */
const createRefToken = (data) => {
    let token = jwt.sign(data, "PINTEREST_SECRET_REF", { 
        algorithm: "HS256",
        expiresIn: "1m" 
    })
    return token
}

/**
 * * Function: Validate Refresh Token
 * @param {*} token
 * @returns boolean
 * ? Secret Key: PINTEREST_SECRET_REF
 */
const checkRefToken = (token) => {
    return jwt.verify(token, "PINTEREST_SECRET_REF", error => error);
}

export {
    createToken,
    checkToken,
    decodeToken
}