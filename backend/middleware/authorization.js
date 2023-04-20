const { getUserByID } = require("../database/databaseUserRequests");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const databaseConnection = require("../database/connection");
const moment = require("moment");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  if (!token) {
    return next(
      new ErrorHandler("Please login to access these resources", 401)
    );
  }
  const jwtVerified = jwt.verify(token, process.env.JWT_SECRET_USER);
  if (jwtVerified) {
    req.user = await getUserByID(jwtVerified.id);
    return next();
  }
  return next(new ErrorHandler("Authentication failed.", 401));
});

exports.isAuthenticatedAdmin = catchAsyncError(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  if (!token) {
    return next(
      new ErrorHandler("Please login to access these resources", 401)
    );
  }
  const jwtVerified = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
  if (jwtVerified) {
    return next();
  }
  return next(
    new ErrorHandler(
      "Resources doesn't exist or the request is unauthorized.",
      401
    )
  );
});

function getCurrentTimestamp() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // add leading zero if necessary
  const day = ("0" + currentDate.getDate()).slice(-2); // add leading zero if necessary
  const hours = ("0" + currentDate.getHours()).slice(-2); // add leading zero if necessary
  const minutes = ("0" + currentDate.getMinutes()).slice(-2); // add leading zero if necessary
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function dateInvalid(rows, next) {
  if (rows[0].wasMuted) {
    return next(
      new ErrorHandler(
        "A modified reservation cannot be cancelled. Contact the owner."
      )
    );
  }
  const date = moment(rows[0].reservationDate).format("YYYY-MM-DD") + " 00:00";
  const rowTimeStamp = new Date(date).getTime() / 3600000;
  const currentTimeStamp = new Date(getCurrentTimestamp()).getTime() / 3600000;
  let difference = rowTimeStamp - currentTimeStamp;
  if (difference >= 12) {
    return false;
  } else {
    return true;
  }
}

exports.cancelValidations = catchAsyncError(async (req, res, next) => {
  const rNum = req.params.rNum;
  const { rows } =
    await databaseConnection.query(`SELECT "userID", "seatID", "reservationID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted"
	FROM public."Current-Reservation-Table" WHERE "reservationID"='${rNum}'`);
  if (!rows.length) {
    return next(
      new ErrorHandler("Invalid action, reservation doesn't exist.", 400)
    );
  }
  if (rows[0].wasMuted) {
    return next(new ErrorHandler("You cannot update more than once.", 401));
  }
  if (dateInvalid(rows, next)) {
    return next(
      new ErrorHandler(
        "You can only update or cancel your reservation 12 hours prior. Contact the owner."
      )
    );
  }
  req.reservationInfo = rows;
  next();
});
