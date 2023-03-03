const express = require("express");
const {
  sendAdminLogin,
  logoutAdmin,
  authenticateAdmin,
  sendReservationInformation,
  sendUserInformation,
  addUserViaAdmin,
  deleteUserViaAdmin,
  updateUserViaAdmin,
  makeReservationViaAdmin,
  cancelReservationViaAdmin,
  modifyReservationViaAdmin,
  modifySpaceTablesViaAdmin,
} = require("../controllers/adminController");
const { updateCurrentAndAllReservationTable } = require("../database/reservationTablePopulateUtils");
const { isAuthenticatedAdmin } = require("../middleware/authorization");
const router = express.Router();

router.route("/suman-kickstart").get(sendAdminLogin).post(authenticateAdmin);
router.route("/logout").get(isAuthenticatedAdmin, logoutAdmin);

router
  .route("/info/reservation")
  .get(isAuthenticatedAdmin, updateCurrentAndAllReservationTable, sendReservationInformation);
// Single Reservation info
// Multiple reservation info based on date and seat type filter.
// All current active reservations.
// Current active reservation based on space type.
// All reservations of a particular user.
// All active reservations of a particular user.
// All reservations of a single seat.
// All current reservations of a single seat.
// A particular space type reservation based on different params like all reservation which are active of a current space type.

router.route("/info/user").get(isAuthenticatedAdmin, updateCurrentAndAllReservationTable, sendUserInformation);
// All user information
// A single user information based on id.

router
  .route("/modify/row/user")
  .get(isAuthenticatedAdmin, updateCurrentAndAllReservationTable, addUserViaAdmin)
  .delete(isAuthenticatedAdmin, updateCurrentAndAllReservationTable, deleteUserViaAdmin)
  .patch(isAuthenticatedAdmin, updateCurrentAndAllReservationTable, updateUserViaAdmin);
// CRUD user in the database

router
  .route("/modify/row/reservation")
  .get(isAuthenticatedAdmin, updateCurrentAndAllReservationTable, makeReservationViaAdmin)
  .delete(isAuthenticatedAdmin, updateCurrentAndAllReservationTable, cancelReservationViaAdmin)
  .patch(isAuthenticatedAdmin, updateCurrentAndAllReservationTable, modifyReservationViaAdmin);
// CRUD in the reservation table rows.

router.route("/modify/db/reservation").patch(isAuthenticatedAdmin,updateCurrentAndAllReservationTable, modifySpaceTablesViaAdmin)
// Modify the tables
// Add more rows based on space type.
// Delete space table rows.

module.exports = router;
