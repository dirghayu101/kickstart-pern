const catchAsyncError = require("./catchAsyncError")
const { v4: uuidv4 } = require('uuid');

module.exports.handlePayment = catchAsyncError(async (req, res, next) => {
    //The code for handling payment will come here.
    req.body.transID = uuidv4()
    return next();
})