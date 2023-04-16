const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const databaseConnection = require("../database/connection");
const { v1: generateReservationID } = require("uuid");
const moment = require("moment-timezone");
const allSpaces = [
  "Conference-Room",
  "Cubicle",
  "Hot-Seat",
  "Private-Office",
  "Conference-Room",
];

async function getSeatNumber(space, date) {
  const seatQuery = `SELECT "seatID" FROM public."${space}" WHERE "${space}"."reservationDates" IS NULL OR NOT '${date}' = ANY("${space}"."reservationDates");`;
  const { rows: seatArr } = await databaseConnection.query(seatQuery);
  return seatArr[0];
}

/*
Alternate way for the "getAllSeatsForDate" function:
    async function getAllSeatsForDate(date) {
    let seatObject = []
    for (const space of allSpaces) {
        const seatQuery = `SELECT "seatID" FROM public."${space}" WHERE "${space}"."reservationDates" IS NULL OR NOT '${date}' = ANY("${space}"."reservationDates");`
        const { rows: seatArr } = await databaseConnection.query(seatQuery)
        const seatObj = {}
        seatObj[space] = seatArr.length
        seatObject.push(seatObj)
    }
    return seatObject
    }

This is using for of loop. 

 Promise.all() and async/await with a for...of loop both allow you to execute multiple asynchronous operations in parallel, there are some important differences between the two approaches. For example, Promise.all() will reject if any of the given promises reject, whereas async/await with a for...of loop will continue to execute the remaining iterations even if one of the asynchronous operations fails. Therefore, it's important to choose the approach that best suits your specific use case.
*/

async function getAllSeatsForDate(date) {
  let seatObject = [];
  await Promise.all(
    allSpaces.map(async (space) => {
      const seatQuery = `SELECT "seatID" FROM public."${space}" WHERE "${space}"."reservationDates" IS NULL OR NOT '${date}' = ANY("${space}"."reservationDates");`;
      const { rows: seatArr } = await databaseConnection.query(seatQuery);
      const seatObj = {};
      seatObj[space] = seatArr.length;
      seatObject.push(seatObj);
    })
  );
  return seatObject;
}

function getTimestamp() {
  const date = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
    hour12: false,
  };
  return date.toLocaleString("en-US", options);
}

async function insertInCurrentReservationTable(userID, seat, transID, date) {
  const reservationID = generateReservationID();
  const bookingTime = getTimestamp();
  const insertScript = `INSERT INTO public."Current-Reservation-Table"(
        "userID", "seatID", "reservationID", "transactionNumber", "reservationDate", "bookingTime")
        VALUES ('${userID}', '${seat}', '${reservationID}', '${transID}', '${date}', '${bookingTime}');`;
  await databaseConnection.query(insertScript);
}

async function makeReservation(space, date, userID, transID) {
  try {
    const { seatID: seat } = await getSeatNumber(space, date);
    await insertInCurrentReservationTable(userID, seat, transID, date);
    const reserveSeatQuery = `UPDATE public."${space}"
	SET "reservationDates" = array_append("reservationDates", '${date}'), "reservedUserID" = array_append("reservedUserID", '${userID}'),
	"bookingTime" = now()
	WHERE "seatID"='${seat}';`;
    return await databaseConnection.query(reserveSeatQuery);
  } catch (error) {
    console.log(error);
  }
}

// This query will have a date as its parameter.
module.exports.sendSpacesAvailable = catchAsyncError(async (req, res, next) => {
  let date = req.params.date;
  let resObj = await getAllSeatsForDate(date);
  res.status(201).json({
    success: true,
    message: "Request received at the send spaces available route.",
    response: resObj,
  });
});

module.exports.sendFilterSpace = catchAsyncError(async (req, res, next) => {
  res.status(201).json({
    message: "Request received at the filter space route.",
  });
});

/*
The req.body will have the following parameters:
1. userID
2. reservation -> This will be an object.

If there will be two dates for the same space, it will have separate entry.

The key cannot repeat in a key value pair so this is not possible. There will be an array of dates.
reservation = {
    spaceType : date,
    spaceType: date
}

We don't need to specify the number of seats because the reservation object will have array for each reservation.

The spaceType value should be:
1. Conference-Room
2. Cubicle
3. Hot-Seat
4. Private-Office

One problem in this arrangement that I can see is, let's say a user has booked two seats for different dates, the table should get updated before the user makes another query to the database otherwise it may lead to some anomalies. 
-> The above problem has been fixed using for of loop.

What is the use of isBookedBoolean if we are selecting the rows based on the dates they are available on?
*/

/*
    module.exports.userMakeReservation = catchAsyncError(async (req, res, next) => {
        const {userID, reservation} = req.body
        const reservationObj = Object.keys(reservation)
        reservationObj.forEach(async (space) => {
            const dates = reservation[space]
            dates.forEach(async (date) => {
                const result = await makeReservation(space, date)

            })

        })
        res.status(201).json({
            message: "Request received at the make reservation route."
        })
    })
*/

module.exports.userMakeReservation = catchAsyncError(async (req, res, next) => {
  const { reservation, transID } = req.body;
  const { userID } = req.user[0];
  const reservationObj = Object.keys(reservation);
  for (const space of reservationObj) {
    const dates = reservation[space];
    for (const date of dates) {
      const result = await makeReservation(space, date, userID, transID);
    }
  }
  res.status(201).json({
    success: true,
    message: "Reservations made successfully.",
  });
});

module.exports.cancelReservation = catchAsyncError(async (req, res, next) => {
  const { transactionNumber, userID, seatID, reservationID, wasMuted } =
    req.reservationInfo[0];
  const reservationDate = moment(req.reservationInfo[0].reservationDate).format(
    "YYYY-MM-DD"
  );
  const bookingTime = moment
    .utc(req.reservationInfo[0].bookingTime)
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");
  const insertScript = `INSERT INTO public."All-Reservation-Table"(
    "transactionNumber", "userID", "seatID", "reservationID", "wasMuted", "reservationDate", "bookingTime", "reservationStatus")
    VALUES ('${transactionNumber}', '${userID}', '${seatID}', '${reservationID}', '${wasMuted}', '${reservationDate}', '${bookingTime}', false);`;
  await databaseConnection.query(insertScript);
  const deleteScript = `DELETE FROM public."Current-Reservation-Table" WHERE "reservationID" = '${reservationID}'`;
  await databaseConnection.query(deleteScript);
  res.status(201).json({
    success: true,
    message:
      "We are processing your cancellation, you will receive your refund in 5-7 business days.",
  });
});

module.exports.updateReservation = catchAsyncError(async (req, res, next) => {
  const { seatID, wasMuted, reservationID } = req.reservationInfo[0];
  if (wasMuted) {
    return next(new ErrorHandler("You cannot update more than once.", 401));
  }
  const { newDate } = req.body;
  const space = getSpaceType(seatID);
  const { seatID: seatNum } = await getSeatNumber(space, newDate);
  const updateScript = `UPDATE public."Current-Reservation-Table"
	SET "seatID"='${seatNum}', "reservationDate"='${newDate}', "wasMuted"=true
	WHERE "reservationID"='${reservationID}';`;
  await databaseConnection.query(updateScript);
  res.status(201).json({
    message: "Request received at the update reservation route.",
  });
});

module.exports.allReservationHistory = catchAsyncError(
  async (req, res, next) => {
    const { userID } = req.user[0];
    const allReservationScript = `SELECT "transactionNumber", "userID", "seatID", "reservationID", "wasMuted", "reservationDate", "bookingTime", "reservationStatus"
    FROM public."All-Reservation-Table" WHERE "userID" = '${userID}'`;
    const { rows: allReservationHistory } = await databaseConnection.query(
      allReservationScript
    );
    res.status(201).json({
      message:
        "Request received at the get current user's reservation history route.",
      allReservationHistory,
    });
  }
);

module.exports.activeReservationHistory = catchAsyncError(
  async (req, res, next) => {
    const { userID } = req.user[0];
    const activeReservationScript = `SELECT "userID", "seatID", "reservationID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted"
    FROM public."Current-Reservation-Table" WHERE "userID" = '${userID}'`;
    const { rows: activeReservationHistory } = await databaseConnection.query(
      activeReservationScript
    );
    res.status(201).json({
      message:
        "Request received at the active reservations of current user route.",
      activeReservationHistory,
    });
  }
);

module.exports.postReservationFeedback = catchAsyncError(
  async (req, res, next) => {
    const { seatNum, rating, comment } = req.body;
    const { userID } = req.user[0];
    const insertScript = `INSERT INTO public."Reservation-Feedback"(
      "userID", "seatNum", rating, "comment")
      VALUES ('${userID}', '${seatNum}', ${rating}, '${comment}');`;
    await databaseConnection.query(insertScript);
    res.status(201).json({
      success: true,
      message: "Your response has been received successfully!.",
    });
  }
);

function getSpaceType(seatID) {
  if (seatID >= 10000 && seatID < 20000) {
    return "Conference-Room";
  } else if (seatID >= 20000 && seatID < 30000) {
    return "Cubicle";
  } else if (seatID >= 30000 && seatID < 40000) {
    return "Hot-Seat";
  } else {
    return "Private-Office";
  }
}
