const validator = require('validator')
const { findUser } = require('../database/databaseUserRequests')
const bcrypt = require('bcryptjs')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require("../utils/errorHandler")

const userAlreadyExist = async (req) => {
    let user
    try{
        user = await findUser(req)
    }catch(error){
        console.log(error)
    }
    if(user.length == 0){
        return false
    } else{
        return true
    }
}

const passwordIsCorrect = async (enteredPassword, hashedPassword) => {
    let correctPassword = await bcrypt.compare(enteredPassword, hashedPassword)
    if(correctPassword){
        return true
    } else{
        return false
    }
}

module.exports.runValidationUser = catchAsyncError(async (req, res, next) => {
    let userExist = await userAlreadyExist(req)
    if(userExist){
        return next(new ErrorHandler(`Email already registered.`, 400))
    }
    let userKeys = Object.keys(req.body)
    userKeys.forEach((key) => {
        if(validator.isEmpty(String(req.body[key]))){
            return next(new ErrorHandler(`Input values of user are invalid.`, 400))
        }
    })
    const {password: plainTextPassword, firstName, lastName, phoneNumber, mailID, gender} = req.body
    if(!validator.isEmail(mailID)){
        return next(new ErrorHandler(`Input values of user are invalid.`, 400))
    }
    if(!(validator.isAlpha(firstName) && validator.isAlpha(lastName))){
        return next(new ErrorHandler(`Input values of user are invalid.`, 400))
    }
    if(!validator.isInt(String(phoneNumber))){
        return next(new ErrorHandler(`Input values of user are invalid.`, 400))
    }
    if(!validator.isStrongPassword(plainTextPassword)){
        return next(new ErrorHandler(`Entered password is weak.`, 400))
    }
    return next()
})

module.exports.checkUserDoExist = catchAsyncError(async (req, res, next) => {
    let user = await findUser(req)
    if(!user.length){
        return next(new ErrorHandler(`User does not exist.`, 400))
    }
    req.user = user[0]
    return next()
})

module.exports.resetPasswordValidations = catchAsyncError(async (req, res, next) => {
    const {oldPassword, newPassword} = req.body
    if(!validator.isStrongPassword(newPassword)){
        return next(new ErrorHandler(`New password is weak.`, 400))
    }
    let hashedPassword = req.user[0].password
    let correctPassword = await passwordIsCorrect(oldPassword, hashedPassword)
    if(!correctPassword){
        return next(new ErrorHandler(`Entered password is incorrect`, 401))
    }
    return next()
})

module.exports.verifyUserPassword = catchAsyncError(async (req, res, next) => {
    const { password: enteredPassword} = req.body
    let hashedPassword = req.user.password
    let correctPassword = await passwordIsCorrect(enteredPassword, hashedPassword)
    if(correctPassword){
        return next()
    }
    return next(new ErrorHandler(`Email or Password is incorrect`, 401))
})