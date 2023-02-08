const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const {insertUser} = require("../database/databaseUserRequests")
const sendToken = require("../utils/jwtSetup")
const validator = require("validator")

exports.registerUser = catchAsyncError( async(req, res, next) => {  
    let boolInsert = await insertUser(req)
    if(boolInsert){
        return sendToken(req.userID, 200, res)
    }
    else{
        return next(new ErrorHandler(`Something went wrong!`, 500))
    }
})

exports.loginUser = catchAsyncError(async (req, res, next) => { 
    return sendToken(req.user.userID, 200, res)

})

exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: `Logged out successfully!`,
    })
})

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const {oldPassword, newPassword} = req.body
    
})

// 