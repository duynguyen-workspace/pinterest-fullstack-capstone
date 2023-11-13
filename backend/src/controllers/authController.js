import { checkToken } from "../config/jwt.js";

const lockApi = (req, res, next) => { 
    try {
        let { token } = req.headers;
        checkToken(token);
        next();
    } catch (exception) {
        res.status(401).send("Không có quyền truy cập !");
    }
    
};

export default lockApi