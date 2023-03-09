const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

module.exports.sendSpacesAvailable = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        message: "Request received at the send spaces available route."
    })
})

module.exports.sendFilterSpace = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        message: "Request received at the filter space route."
    })
})

module.exports.userMakeReservation = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        message: "Request received at the make reservation route."
    })
})

module.exports.cancelReservation = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        message: "Request received at the cancel reservation route."
    })
})

module.exports.updateReservation = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        message: "Request received at the update reservation route."
    })
})

module.exports.updateRelatedData = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        message: "Request received at the route which will be used to send spaces available in the future."
    })
})

module.exports.allReservationHistory = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        message: "Request received at the get current user's reservation history route."
    })
})

module.exports.activeReservationHistory = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        message: "Request received at the active reservations of current user route."
    })  
})

module.exports.postReservationFeedback = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        success: true,
        message: "Request received to post reservation feedback."
    })
})
