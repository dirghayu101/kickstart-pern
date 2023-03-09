const catchAsyncError = require("./catchAsyncError")

module.exports.handlePayment = catchAsyncError(async (req, res, next) => {
    //The code for handling payment will come here.
    return next();
})