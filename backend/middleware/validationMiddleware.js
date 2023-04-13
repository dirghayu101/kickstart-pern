const validator = require('validator')
const { findUser, getUserByID } = require('../database/databaseUserRequests')
const bcrypt = require('bcryptjs')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require("../utils/errorHandler")

const passwordIsCorrect = async (enteredPassword, hashedPassword) => {
    let correctPassword = await bcrypt.compare(enteredPassword, hashedPassword)
    if(correctPassword){
        return true
    } else{
        return false
    }
}

module.exports.checkUserDoesNotExist = catchAsyncError(async (req, res, next) => {
    let user = await findUser(req)
    if(user.length){
        return next(new ErrorHandler(`Email already registered.`, 400))
    }
    return next()
})

module.exports.runAdminUpdateUserValidation = catchAsyncError(async (req, res, next) => {
    let userKeys = Object.keys(req.body)
    userKeys.forEach((key) => {
        if(validator.isEmpty(String(req.body[key]))){
            return next(new ErrorHandler(`Input values of user are invalid.`, 400))
        }
    })
    const { firstName, lastName, phoneNumber, mailID} = req.body
    if(!validator.isEmail(mailID)){
        return next(new ErrorHandler(`Input values of user are invalid.`, 400))
    }
    if(!(validator.isAlpha(firstName) && validator.isAlpha(lastName))){
        return next(new ErrorHandler(`Input values of user are invalid.`, 400))
    }
    if(!validator.isInt(String(phoneNumber))){
        return next(new ErrorHandler(`Input values of user are invalid.`, 400))
    }
    return next()
})

module.exports.runValidationUser = catchAsyncError(async (req, res, next) => {
   let userKeys = Object.keys(req.body)
    userKeys.forEach((key) => {
        if(validator.isEmpty(String(req.body[key]))){
            return next(new ErrorHandler(`Input values of user are invalid.`, 400))
        }
    })
    const {password: plainTextPassword, firstName, lastName, phoneNumber, mailID} = req.body
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

module.exports.forgotPasswordValidations = catchAsyncError(async (req, res, next) => {
    const {password, confirmPassword} = req.body
    if(password != confirmPassword){
        return next(new ErrorHandler("Password does not match.", 400))
    }
    if(!validator.isStrongPassword(password)){
        return next(new ErrorHandler(`New password is weak.`, 400))
    }
    return next()
})

module.exports.checkUserDoExist = catchAsyncError(async (req, res, next) => {
    let user = await findUser(req)
    if(!user.length){
        return next(new ErrorHandler(`User does not exist.`, 400))
    }
    req.user = user
    return next()
})

module.exports.updatePasswordValidations = catchAsyncError(async (req, res, next) => {
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
    let hashedPassword = req.user[0].password
    let correctPassword = await passwordIsCorrect(enteredPassword, hashedPassword)
    if(correctPassword){
        return next()
    }
    return next(new ErrorHandler(`Email or Password is incorrect`, 401))
})

module.exports.checkUserDoExistQueryParams = catchAsyncError(async (req, res, next) => {
    const userID = req.query.id
    const user = await getUserByID(userID)
    if(!user.length){      
        return next(new ErrorHandler(`User does not exist.`, 400))
    } 
    req.user = user
    return next()
})