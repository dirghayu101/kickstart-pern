const catchAsyncError = require("./catchAsyncError")

module.exports.handlePayment = catchAsyncError(async (req, res, next) => {
    //The code for handling payment will come here.
    req.body.transID = 'insert-trans-id'
    return next();
})

module.exports.reservationExist = catchAsyncError(async (req, res, next) => {
    return next();
})