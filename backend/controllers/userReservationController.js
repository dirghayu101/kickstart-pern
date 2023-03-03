const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

module.exports.sendSpacesAvailable = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        message: "Received your request."
    })
})

module.exports.sendFilterSpace = catchAsyncError(async (req, res, next) => {
    console.log(req.query)
    res.status(201).json({
        message: "Request received at the filter space route."
    })
})