const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"

    // JSON Web Token is invalid Error
    if(err.name === "JsonWebTokenError"){
        const message = `JSON Web token is invalid, Try Again.`
        err = new ErrorHandler(message, 400)
    }

    // JSON Web Token has expired Error
    if(err.name === "TokenExpiredError"){
        const message = `JSON Web token is expired, Try Again.`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err.stack,
    })
}