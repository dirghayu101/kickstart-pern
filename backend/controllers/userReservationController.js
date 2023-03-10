const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const databaseConnection = require("../database/connection")

async function getSeatNumber(space, date){
    const seatQuery = `SELECT "seatID" FROM public."${space}" WHERE "${space}"."reservationDates" IS NULL OR NOT '${date}' = ANY("${space}"."reservationDates");`
    const {rows: seatArr} = await databaseConnection.query(seatQuery)
    return seatArr[0]
}

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

/*
The req.body will have the following parameters:
1. userID
2. reservation -> This will be an object.

If there will be two dates for the same space, it will have separate entry.

The key cannot repeat in a key value pair so this is not possible. There will be an array of dates.
reservation = {
    spaceType : date,
    spaceType: date
}

We don't need to specify the number of seats because the reservation object will have array for each reservation.

The spaceType value should be:
1. Conference-Room
2. Cubicle
3. Hot-Seat
4. Private-Office

One problem in this arrangement that I can see is, let's say a user has booked two seats for different dates, the table should get updated before the user makes another query to the database otherwise it may lead to some anomalies. 

What is the use of isBookedBoolean if we are selecting the rows based on the dates they are available on?
*/

module.exports.userMakeReservation = catchAsyncError(async (req, res, next) => {
    const {userID, reservation} = req.body
    const reservationObj = Object.keys(reservation)
    reservationObj.forEach(async (space) => {
        const dates = reservation[space]
        dates.forEach(async (date) => {
            const seatID = await getSeatNumber(space, date)
            console.log(seatID)
        })

    })
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

