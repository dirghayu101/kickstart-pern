const { getUserByID } = require("../database/databaseUserRequests")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("./catchAsyncError")
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies

    if(!token){
        return next(new ErrorHandler("Please login to access these resources", 401))
    }
    const jwtVerified = jwt.verify(token, process.env.JWT_SECRET_USER)
    if(jwtVerified){
        req.user = await getUserByID(jwtVerified.id)
        return next()
    }
    return next(new ErrorHandler("Authentication failed.", 401))
})

exports.isAuthenticatedAdmin = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Resources doesn't exist or the request is unauthorized.", 401))
    }
    const jwtVerified = jwt.verify(token, process.env.JWT_SECRET_ADMIN)
    if(jwtVerified){
        return next()
    }
    return next(new ErrorHandler("Resources doesn't exist or the request is unauthorized.", 401))
})