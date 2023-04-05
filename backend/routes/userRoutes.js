const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  updateUserInformation,
  forgotPassword,
  resetPassword,
  sendUserInformation,
} = require("../controllers/userController");

// This middleware will verify the user before giving them access to the data.
const { isAuthenticatedUser } = require("../middleware/authorization");
const {
  checkUserDoExist,
  runValidationUser,
  updatePasswordValidations,
  verifyUserPassword,
  checkUserDoesNotExist,
  forgotPasswordValidations,
} = require("../middleware/validationMiddleware");

// Get is a test route.
router
  .route("/register")
  .post(checkUserDoesNotExist, runValidationUser, registerUser);

router.route("/login").post(checkUserDoExist, verifyUserPassword, loginUser);

router.route("/logout").get(logoutUser);

router
  .route("/password/update")
  .put(isAuthenticatedUser, updatePasswordValidations, updatePassword);

router
  .route("/update-information")
  .put(
    isAuthenticatedUser,
    runValidationUser,
    verifyUserPassword,
    updateUserInformation
  );

router.route("/user-info").get(isAuthenticatedUser, sendUserInformation)

router.route("/password/forgot").post(checkUserDoExist, forgotPassword);

router.route("/password/reset/:token").put(forgotPasswordValidations, resetPassword)

module.exports = router;