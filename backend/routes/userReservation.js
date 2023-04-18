/*
NOTE: This file will have all the routes to handle the reservation related requests by the user.
*/

const express = require("express");
const {
  sendSpacesAvailable,
  sendFilterSpace,
  userMakeReservation,
  cancelReservation,
  updateReservation,
  activeReservationHistory,
  allReservationHistory,
  postReservationFeedback,
} = require("../controllers/userReservationController");
const {
  updateCurrentAndAllReservationTable,
} = require("../database/reservationTablePopulateUtils");
const router = express.Router();
const {
  isAuthenticatedUser,
  cancelValidations,
  validateUpdateRequest,
} = require("../middleware/authorization");
const { handlePayment } = require("../middleware/payment");

// This route will show all the spaces available for the user to reserve from.
router.route("/spaces/:date").get(isAuthenticatedUser, sendSpacesAvailable);

// This will be a route in query params format.
router.route("/space").get(isAuthenticatedUser, sendFilterSpace);

// This route will be used for making the reservation.
router
  .route("/reserve")
  .post(isAuthenticatedUser, handlePayment, userMakeReservation);

// This route will be used for deleting the reservation. We created a separate delete route because:
// 1. Delete method shouldn't have any body.
// 2. There might be a functionality where admin will approve the cancellation of a reservation, so post method will be much more handy to transfer all the information required

// NOTE: A user should not be able to exploit this route and get the history of every user in the database.
router
  .route("/reserve/history/all")
  .get(
    isAuthenticatedUser,
    updateCurrentAndAllReservationTable,
    allReservationHistory
  );

router
  .route("/reserve/history/current")
  .get(
    isAuthenticatedUser,
    updateCurrentAndAllReservationTable,
    activeReservationHistory
  );

router
  .route("/reserve/post/feedback")
  .post(isAuthenticatedUser, postReservationFeedback);

router
  .route("/reserve/:rNum")
  .post(
    isAuthenticatedUser,
    updateCurrentAndAllReservationTable,
    cancelValidations,
    updateReservation
  )
  .delete(
    isAuthenticatedUser,
    updateCurrentAndAllReservationTable,
    cancelValidations,
    cancelReservation
  );

module.exports = router;
