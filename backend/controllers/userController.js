const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const {
  insertUser,
  updatePassword,
  updateUserInformationRequest,
  insertResetPasswordToken,
  deleteResetToken,
  findUserWithResetPasswordToken,
  RemoveTimedOutEntries,
} = require("../database/databaseUserRequests");
const sendToken = require("../utils/jwtSetup");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const getResetPasswordToken = (req) => {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding to userSchema
  let ResetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  let ResetPasswordExpire = Date.now() + 10 * 60 * 1000; //The time for expiration of this string is 10 minutes.

  req.resetTokenInfo = { ResetPasswordToken, ResetPasswordExpire };

  return resetToken;
};

exports.registerUser = catchAsyncError(async (req, res, next) => {
  let boolInsert = await insertUser(req);
  if (boolInsert) {
    return sendToken(req.userID, 200, res);
  } else {
    return next(new ErrorHandler(`Something went wrong!`, 500));
  }
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  return sendToken(req.user[0], 200, res);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: `Logged out successfully!`,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const { newPassword } = req.body;
  const { userID } = req.user[0];
  const result = await updatePassword(userID, newPassword);
  if (result) {
    return res.status(200).json({
      success: true,
      message: `Password successfully changed!`,
    });
  }
  return next(new ErrorHandler(`Something went wrong!`, 500));
});

exports.updateUserInformation = catchAsyncError(async (req, res, next) => {
  const result = await updateUserInformationRequest(req);
  if (result) {
    return res.status(200).json({
      success: true,
      message: `Updated user information successfully!`,
    });
  }
  return next(new ErrorHandler(`Something went wrong!`, 500));
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const resetToken = getResetPasswordToken(req);
  await RemoveTimedOutEntries()
  let result = await insertResetPasswordToken(req);
  if (!result) {
    return next(
      new ErrorHandler(`Something went wrong, please try again later.`, 500)
    );
  }
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/user/password/reset/${resetToken}`;
  const userEmail = req.user[0].mailID
  const message = `Your reset password link is: \n\n ${resetPasswordUrl}. If you have not requested this email then please ignore it.`
  try {
    await sendEmail({
      email: userEmail,
      subject: `Password recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${userEmail} successfully!`,
    });
  } catch (error) {
    // Delete entry on the table for the user.
    const userID = req.user[0].userID
    await deleteResetToken(userID)
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  await RemoveTimedOutEntries()
  const token = req.params.token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const row = await findUserWithResetPasswordToken(resetPasswordToken)
  if(!row.length){
    return next(new ErrorHandler("Reset Password Token is invalid or has expired.", 404))
  }
  const userID = row[0].userID
  const newPassword = req.body.password 
  updatePassword(userID, newPassword)
  await deleteResetToken(userID)
  return sendToken(userID, 200, res);
})