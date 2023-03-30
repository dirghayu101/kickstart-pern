const jwt = require('jsonwebtoken')

const jsonWebToken = (user) => {
    return token = jwt.sign({id:user.userID}, process.env.JWT_SECRET_USER, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const sendToken = (user, statusCode, res) => {
    const token = jsonWebToken(user)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 
        ),
        httpOnly: true,
    }

    res.header('Authorization', `Bearer ${token}`).status(statusCode).cookie('token', token, cookieOptions).json({
        success: true,
        user: user.userID,
        token,
    })
}

module.exports = sendToken