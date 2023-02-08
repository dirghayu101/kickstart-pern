const jwt = require('jsonwebtoken')

const jsonWebToken = (userID) => {
    return token = jwt.sign({id:userID}, process.env.JWT_SECRET_USER, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const sendToken = (userID, statusCode, res) => {
    const token = jsonWebToken(userID)
    
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 
        ),
        httpOnly: true,
    }

    res.status(statusCode).cookie('token', token, cookieOptions).json({
        success: true,
        token,
    })
}

module.exports = sendToken