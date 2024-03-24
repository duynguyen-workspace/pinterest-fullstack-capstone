//? CONFIGURE SERVER RESPONSE
export default (res, message, code, data) => {
    res.status(code).json({
        message,
        code,
        data,
        date: new Date()
    })
}