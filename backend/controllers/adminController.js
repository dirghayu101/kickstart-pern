const ErrorHandler = require("../utils/errorHandler");
const databaseConnection = require("../database/connection");
const catchAsyncError = require("../middleware/catchAsyncError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { insertUser, updateUserInformationRequest } = require("../database/databaseUserRequests");

const spaceAndSeatID = {
  "Conference-Room": 10000,
  "Cubicle": 20000,
  "Hot-Seat": 30000,
  "Private-Office": 40000,
};

function getDateScript(sDate, eDate, whichFunc) {
  let dateScript;
  let startDate, endDate;
  if (whichFunc === "active") {
    startDate = new Date().toISOString().slice(0, 10); //today
    let date = new Date();
    date.setDate(date.getDate() + 7);
    endDate = date.toISOString().slice(0, 10); //After 7 day
  } else {
    endDate = new Date().toISOString().slice(0, 10); //today
    let date = new Date();
    date.setDate(date.getDate() - 7);
    startDate = date.toISOString().slice(0, 10);
  }
  if (!eDate && !sDate) {
    dateScript = ``;
  } else if (!eDate) {
    dateScript = ` AND DATE("reservationDate")>='${sDate}' AND DATE("reservationDate")<='${endDate}' `;
  } else if (!sDate) {
    dateScript = ` AND DATE("reservationDate")>='${startDate}' AND DATE("reservationDate")<='${eDate}' `;
  } else {
    dateScript = ` AND DATE("reservationDate")>='${sDate}' AND DATE("reservationDate")<='${eDate}' `;
  }
  return dateScript;
}

function getTNumScript(tNum) {
  if (!tNum) {
    return "";
  }
  return ` AND "transactionNumber" = '${tNum}' `;
}

function getSeatIDScript(seatID) {
  if (!seatID) {
    return "";
  }
  return ` AND "seatID" = '${seatID}' `;
}

function getUserIDScript(userID) {
  if (!userID) {
    return "";
  }
  return ` AND "userID" = '${userID}' `;
}

function getStatusScript(status) {
  let statusScript;
  if (status === "update") {
    statusScript = ` AND "wasMuted" = true `;
  } else if (status === "cancel") {
    statusScript = ` AND "reservationStatus" = false `;
  } else {
    statusScript = "";
  }
  return statusScript;
}

function getSpaceScript(space) {
  let spaceScript;
  if (!space || space === "all") {
    spaceScript = `CAST("seatID" AS INTEGER) >= 10000 `;
  } else {
    let startID = spaceAndSeatID[space];
    let endID = startID + 10000;
    spaceScript = `CAST("seatID" AS INTEGER) >= ${startID} AND CAST("seatID" AS INTEGER) >= ${endID} `;
  }
  return spaceScript;
}

module.exports.sendAdminLogin = (req, res) => {
  res.json({
    message: "Hi we are working on the admin panel!",
  });
};

module.exports.authenticateAdmin = catchAsyncError(async (req, res, next) => {
  const { mailID:admin, password } = req.body;
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
    res.status(200).header('Authorization', `Bearer ${token}`).cookie("token", token, cookieOptions).json({
      success: true,
      token,
    });
  }
});

module.exports.sendActiveReservationInformation = catchAsyncError(
  async (req, res, next) => {
    let sqlQuery;
    let { space, status, sDate, eDate, userID, seatID, tNum } = req.query;
    space = getSpaceScript(space);
    status = getStatusScript(status);
    let dateScript = getDateScript(sDate, eDate, "active");
    tNum = getTNumScript(tNum);
    userID = getUserIDScript(userID);
    seatID = getSeatIDScript(seatID);
    sqlQuery = `SELECT "userID", "seatID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted" FROM public."Current-Reservation-Table" WHERE ${space}${status}${dateScript}${tNum}${userID}${seatID}`;
    console.log(sqlQuery);
    const { rows: dbResult } = await databaseConnection.query(sqlQuery);
    res.status(200).json({
      message: "Received your request.",
      response: dbResult,
    });
  }
);

module.exports.sendOldReservationInformation = catchAsyncError(
  async (req, res, next) => {
    let sqlQuery;
    let { space, status, sDate, eDate, userID, seatID, tNum } = req.query;
    const statusCopy = status;
    space = getSpaceScript(space);
    status = getStatusScript(status);
    let dateScript = getDateScript(sDate, eDate, "old");
    tNum = getTNumScript(tNum);
    userID = getUserIDScript(userID);
    seatID = getSeatIDScript(seatID);
    if (statusCopy === "all") {
      sqlQuery = `SELECT "userID", "seatID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted" FROM public."Current-Reservation-Table" WHERE ${space}${status}${dateScript}${tNum}${userID}${seatID} UNION SELECT "userID", "seatID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted" FROM public."All-Reservation-Table" WHERE ${space}${status}${dateScript}${tNum}${userID}${seatID};`;
    } else {
      sqlQuery = `SELECT "transactionNumber", "userID", "seatID", "wasMuted", "reservationDate", "bookingTime", "reservationStatus"
      FROM public."All-Reservation-Table" WHERE ${space}${status}${dateScript}${tNum}${userID}${seatID}`;
    }
    const { rows: dbResult } = await databaseConnection.query(sqlQuery);
    res.status(200).json({
      message: "Received your request.",
      response: dbResult,
    });
  }
);

// "/info/user/:userID"
module.exports.sendUserInformation = catchAsyncError(async (req, res, next) => {
  // user = userID || all
  let user = req.params.userID;
  let sqlQuery;
  if (user === "all") {
    sqlQuery = `SELECT "userID", "phoneNumber", "mailID", "firstName", "lastName", gender FROM public."User";`;
  } else {
    sqlQuery = `SELECT "userID", "phoneNumber", "mailID", "firstName", "lastName", password, gender FROM public."User" WHERE "userID" = '${user}';`;
  }
  const { rows: dbResult } = await databaseConnection.query(sqlQuery);
  res.status(200).json({
    message: "Received your request.",
    result: dbResult,
  });
});

// "/user/reserve/:type"
module.exports.sendUserReservationInformation = catchAsyncError(
  async (req, res, next) => {
    // reserveParam = 'currentReserve' || 'allReserve'
    // This query will give all the users who have an active reservation.
    let sqlQuery;
    let reserveParam = req.params.type;
    if (reserveParam === "allReserve") {
      sqlQuery = `SELECT "user"."userID", "phoneNumber", "mailID", "firstName", "lastName", password, gender
      FROM public."User" as "user"
      INNER JOIN public."All-Reservation-Table" as "allReservationTable"
      on "user"."userID" = "allReservationTable"."userID";`;
    } else {
      // This query will give all the users in the database who ever made a reservation.
      sqlQuery = `SELECT "user"."userID", "phoneNumber", "mailID", "firstName", "lastName", password, gender
      FROM public."User" as "user"
      INNER JOIN public."Current-Reservation-Table" as "currentReservationTable"
      on "user"."userID" = "currentReservationTable"."userID";`;
    }
    const { rows: dbResult } = await databaseConnection.query(sqlQuery);
    res.status(200).json({
      message: "Received your request.",
      result: dbResult,
    });
  }
);

module.exports.addUserViaAdmin = catchAsyncError(async (req, res, next) => {
  let boolInsert = await insertUser(req);
  if (!boolInsert) {
    return next(new ErrorHandler(`Something went wrong!`, 500));
  }
  res.status(201).json({
    message: "Successfully created a new user!",
    result: boolInsert,
  });
});

module.exports.deleteUserViaAdmin = catchAsyncError(
  async (req, res, next) => {
    let userID = req.query.id
    let sqlScript = `DELETE FROM public."User"
    WHERE "userID" = '${userID}';`
    let {rowCount: result} = await databaseConnection.query(sqlScript)

    if(!result){
      return next(new ErrorHandler(`Something went wrong!`, 500));
    }
    res.status(204).json({
      message: "Resource deleted successfully.",
      result
    });
  }
);

module.exports.updateUserViaAdmin = catchAsyncError(
  async (req, res, next) => {
    const result = await updateUserInformationRequest(req)
    if (!result) {
      return next(new ErrorHandler(`Something went wrong!`, 500));
    }
    res.status(200).json({
      success: true,
      message: `Updated user information successfully!`,
      result,
    });
  }
);

module.exports.makeReservationViaAdmin = catchAsyncError(
  async (req, res, next) => {
    res.status(200).json({
      success: true,
      message: "Received your request in make reservation via admin route."
    })
  }
);

module.exports.cancelReservationViaAdmin = catchAsyncError(
  async (req, res, next) => {
    res.status(200).json({
      success: true,
      message: "Received your request in cancel reservation via admin route."
    })
  }
);

module.exports.modifyReservationViaAdmin = catchAsyncError(
  async (req, res, next) => {
    res.status(200).json({
      success: true,
      message: "Received your request in update reservation via admin route."
    })
  }
);

module.exports.modifySpaceTablesViaAdmin = catchAsyncError(
  async (req, res, next) => {
    
    res.status(200).json({
      success: true,
      message: "Received your request in modify space table structure via admin route."
    })
  }
);

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

module.exports.getAllFeedback = catchAsyncError(async (req, res, next) => {
  const result = await databaseConnection.query(`SELECT "userID", "seatNum", rating, comment, "time"
	FROM public."Reservation-Feedback"`)
  res.status(200).json({
    success: true,
    feedback: result
  });
})