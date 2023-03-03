const ErrorHandler = require("../utils/errorHandler");
const databaseConnection = require("../database/connection");
const catchAsyncError = require("../middleware/catchAsyncError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.sendAdminLogin = (req, res) => {
  res.json({
    message: "Hi we are working on the admin panel!",
  });
};

module.exports.authenticateAdmin = catchAsyncError(async (req, res, next) => {
  const { admin, password } = req.body;
  if (!admin || !password) {
    return next(new ErrorHandler(`The request body is empty.`, 400));
  }
  const findAdmin = `SELECT "Password", "Admin-Username"
	FROM public."Admin" WHERE "Admin-Username"='${admin}'`;
  const dbAdminInfo = (await databaseConnection.query(findAdmin)).rows[0];
  if (!dbAdminInfo) {
    return next(new ErrorHandler(`Username or password is wrong.`, 400));
  }
  if (await bcrypt.compare(password, dbAdminInfo.Password)) {
    const token = jwt.sign({ id: admin }, process.env.JWT_SECRET_ADMIN, {
      expiresIn: process.env.JWT_ADMIN_EXPIRE,
    });
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.ADMIN_COOKIE_EXPIRE * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, cookieOptions).json({
      success: true,
      token,
    });
  }
});


// There will be following parameters in sendReservationInformation route:
// 1. space = {conference, cubicle, private office, hot seat, all}
// 3. status = {active, null (all), past, cancel, update}
// 2. date = {}
// 4. null = send all active reservation information 
// 5. tNum = this will send information about a single unique reservation. Information about its transaction number, date, status, user related.
// 6. uID = all reservations of this user. Active and past depends on the previous parameters.
// 7. seatID = all reservations of a single seat.
module.exports.sendReservationInformation = catchAsyncError(
  async (req, res, next) => {
    const resultArr = []
    if(!req.query){

    }
    const {space, status, date, userID, seatID, tNum} = req.query
    console.log(req.query)
    res.status(200).json({
        message: "Received your request."
    })
  }
);

module.exports.sendUserInformation = catchAsyncError(
    async (req, res, next) => {

    }
);

module.exports.addUserViaAdmin = catchAsyncError(
    async (req, res, next) => {

    }
)

module.exports.deleteUserViaAdmin = catchAsyncError(
    async(req, res, next) => {

    }
)

module.exports.updateUserViaAdmin = catchAsyncError(
    async(req, res, next) => {

    }
)

module.exports.makeReservationViaAdmin = catchAsyncError(
    async(req, res, next) => {

    }
)

module.exports.cancelReservationViaAdmin = catchAsyncError(
    async (req, res, next) => {

    }
)

module.exports.modifyReservationViaAdmin = catchAsyncError(
    async (req, res, next) => {

    }
)

module.exports.modifySpaceTablesViaAdmin = catchAsyncError(
    async (req, res, next) => {

    }
)

module.exports.logoutAdmin = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: `Logged out successfully!`,
  });
});
