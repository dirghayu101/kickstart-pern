const validator = require('validator')
const { findUser } = require('../database/databaseUserRequests')

module.exports.runValidationUser = (req) => {
    let userKeys = Object.keys(req.body)
    userKeys.forEach((key) => {
        if(validator.isEmpty(String(req.body[key]))){
            return false
        }
    })
    const {password: plainTextPassword, firstName, lastName, phoneNumber, mailID, gender} = req.body
    if(!validator.isEmail(mailID)){
        return false
    }
    if(!(validator.isAlpha(firstName) && validator.isAlpha(lastName))){
        return false
    }
    if(!validator.isInt(String(phoneNumber))){
        return false
    }
    if(!validator.isStrongPassword(plainTextPassword)){
        return false
    }
    return true
}

module.exports.userAlreadyExist = async (req) => {
    let user
    try{
        user = await findUser(req)
    }catch(error){
        console.log(error)
    }
    if(user.length == 0){
        return false
    } else{
        return true;
    }
}