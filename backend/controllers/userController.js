const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const {insertUser, findUser} = require("../database/databaseUserRequests")
const {runValidationUser, userAlreadyExist} = require("../database-validators/validator-functions")
const bcrypt = require("bcryptjs")
const sendToken = require("../utils/jwtSetup")

exports.registerUser = catchAsyncError( async(req, res, next) => {
    let userExist = await userAlreadyExist(req)
    if(userExist){
        return next(new ErrorHandler(`Email already registered.`, 400))
    }
    if(!runValidationUser(req)){
        return next(new ErrorHandler(`Input values of user are invalid.`, 400))
    }
    let boolInsert = await insertUser(req)
    if(boolInsert){
        res.status(200).json({
            success: true,
            message: `Successfully registered the user in the database!`
        })
    }
    else{
        return next(new ErrorHandler(`Something went wrong!`, 500))
    }
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    let user = await findUser(req)
    if(!user.length){
        return next(new ErrorHandler(`User does not exist.`, 400))
    }
    const { password: enteredPassword} = req.body
    user = user[0]
    let hashedPassword = user.password
    let correctPassword = await bcrypt.compare(enteredPassword, hashedPassword)
    if(correctPassword){
        return sendToken(user, 200, res)
    }
    next(new ErrorHandler(`Email or Password is incorrect`, 401))
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

// This is a test route.
exports.sendMessage = catchAsyncError( (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "The server is working fine!"
    })
})