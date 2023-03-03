/*
NOTE: This file will have all the routes to handle the reservation related requests by the user.
*/

const express = require("express")
const { sendSpacesAvailable, sendFilterSpace } = require("../controllers/userReservationController")
const router = express.Router()
const {isAuthenticatedUser} = require("../middleware/authorization")


// This route will show all the spaces available for the user to reserve from.
router.route('/spaces').get(isAuthenticatedUser, sendSpacesAvailable)

// This will be a route in query params format.
router.route('/space').get(isAuthenticatedUser, sendFilterSpace)

module.exports = router