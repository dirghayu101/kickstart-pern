const express = require("express");
const {
  sendAdminLogin,
  logoutAdmin,
  authenticateAdmin,
  sendActiveReservationInformation,
  sendUserInformation,
  addUserViaAdmin,
  deleteUserViaAdmin,
  updateUserViaAdmin,
  makeReservationViaAdmin,
  cancelReservationViaAdmin,
  modifyReservationViaAdmin,
  modifySpaceTablesViaAdmin,
  sendOldReservationInformation,
  sendUserReservationInformation,
  sendSpaceCapacity,
  getReadFeedbacks,
  markFeedbackCellAsRead,
  getUnreadFeedbacks,
  cancelReservationAdminRoute,
  updateReservationViaAdmin,
} = require("../controllers/adminController");
const {
  checkUserDoesNotExist,
  runValidationUser,
  checkUserDoExist,
  verifyUserPassword,
  checkUserDoExistQueryParams,
  runAdminUpdateUserValidation,
} = require("../middleware/validationMiddleware");
const {
  updateCurrentAndAllReservationTable,
} = require("../database/reservationTablePopulateUtils");
const { isAuthenticatedAdmin } = require("../middleware/authorization");
const {
  sendSpacesAvailable,
  updateReservation,
} = require("../controllers/userReservationController");

const router = express.Router();

router.route("/suman-kickstart").get(sendAdminLogin).post(authenticateAdmin);
router.route("/logout").get(isAuthenticatedAdmin, logoutAdmin);

router
  .route("/info/reservation/spaceCapacity")
  .get(isAuthenticatedAdmin, sendSpaceCapacity);

router
  .route("/info/reservation/spaceAvailable/:date")
  .get(isAuthenticatedAdmin, sendSpacesAvailable);

router
  .route("/info/current/reservation")
  .get(
    isAuthenticatedAdmin,
    updateCurrentAndAllReservationTable,
    sendActiveReservationInformation
  );

router
  .route("/info/old/reservation")
  .get(
    isAuthenticatedAdmin,
    updateCurrentAndAllReservationTable,
    sendOldReservationInformation
  );

router
  .route("/info/user/:userID")
  .get(
    isAuthenticatedAdmin,
    updateCurrentAndAllReservationTable,
    sendUserInformation
  );

router
  .route("/user/reserve/:type")
  .get(
    isAuthenticatedAdmin,
    updateCurrentAndAllReservationTable,
    sendUserReservationInformation
  );

// All user information
// A single user information based on id.
// checkUserDoesNotExist, runValidationUser,
router
  .route("/modify/row/user")
  .post(
    isAuthenticatedAdmin,
    updateCurrentAndAllReservationTable,
    checkUserDoesNotExist,
    runValidationUser,
    addUserViaAdmin
  )
  .delete(
    isAuthenticatedAdmin,
    updateCurrentAndAllReservationTable,
    checkUserDoExistQueryParams,
    deleteUserViaAdmin
  )
  .patch(
    isAuthenticatedAdmin,
    updateCurrentAndAllReservationTable,
    runAdminUpdateUserValidation,
    checkUserDoExistQueryParams,
    updateUserViaAdmin
  );
// CRUD user in the database

// TODO: Get information about all the spaces available.

router
  .route("/modify/current-reservation/cancel/:reserveID")
  .delete(isAuthenticatedAdmin, cancelReservationAdminRoute);

router
  .route("/modify/current-reservation/update/:reserveID")
  .patch(isAuthenticatedAdmin, updateReservationViaAdmin);

router
  .route("/modify/db/reservation")
  .patch(
    isAuthenticatedAdmin,
    updateCurrentAndAllReservationTable,
    modifySpaceTablesViaAdmin
  );
// Modify the tables
// Add more rows based on space type.
// Delete space table rows.

router
  .route("/reservation/feedbacks/unread")
  .get(
    isAuthenticatedAdmin,
    updateCurrentAndAllReservationTable,
    getUnreadFeedbacks
  );

router
  .route("/reservation/feedbacks/read")
  .get(
    isAuthenticatedAdmin,
    updateCurrentAndAllReservationTable,
    getReadFeedbacks
  );

router
  .route("/reservation/feedbacks/:feedbackID")
  .post(isAuthenticatedAdmin, markFeedbackCellAsRead);

module.exports = router;
