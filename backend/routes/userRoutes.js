const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
} = require("../controllers/userController");

// This middleware will verify the user before giving them access to the data.
const { isAuthenticatedUser } = require("../middleware/authorization");
const { checkUserDoExist, runValidationUser, resetPasswordValidations, verifyUserPassword } = require("../middleware/validationMiddleware");

// Get is a test route.
router.route("/register").post(runValidationUser, registerUser);

router.route("/login").post(checkUserDoExist, verifyUserPassword,loginUser);

router.route("/logout").get(logoutUser);

router.route("/reset-password").post(isAuthenticatedUser, resetPasswordValidations, resetPassword);

module.exports = router;
