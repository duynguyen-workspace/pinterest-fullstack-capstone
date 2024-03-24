import responseData from "../config/responseData.js";

//? HIGHER-ORDER FUNCTION: error handling for server error
const handleAsync = fn => async (req, res) => {
    try {
        await fn(req, res);
    } catch (exception) {
        // console.error(exception);
        responseData(res, "InternalServerError", 500, null);
    }
};

export { handleAsync }