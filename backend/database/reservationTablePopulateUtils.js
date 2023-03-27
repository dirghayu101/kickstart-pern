const databaseConnection = require("./connection");
const catchAsyncError = require("../middleware/catchAsyncError");
const moment = require('moment')

const spaceAndSeatID = {
  "Conference-Room": 10000,
  Cubicle: 20000,
  "Hot-Seat": 30000,
  "Private-Office": 40000,
};

module.exports.getAllRowsOfSpace = async (spaceName) => {
  let script = `SELECT "seatID", "isBookedBoolean", "reservedUserID", "bookingTime", "transactionNumber", "reservationDates"
	FROM public."${spaceName}";`;
  let allRows = await databaseConnection.query(script);
  return allRows;
};

module.exports.addSeatsToSpace = async (spaceName, numberOfSeats) => {
  const currentSeats = await this.getAllRowsOfSpace(spaceName);
  let startID = spaceAndSeatID[spaceName] + currentSeats.rowCount;
  let endID = startID + numberOfSeats;
  while (startID < endID) {
    let script = `INSERT INTO public."${spaceName}"("seatID", "isBookedBoolean") VALUES (${startID}, false);`;
    try {
      await databaseConnection.query(script);
    } catch (error) {
      console.log(error);
    }
    startID += 1;
  }
};

module.exports.cutColumnToSpecificSeats = async (spaceName, wantedSeats) => {
  const currentSeats = await this.getAllRowsOfSpace(spaceName);
  if (wantedSeats >= currentSeats.rowCount || currentSeats.rowCount === 0) {
    return;
  }
  let rows = currentSeats.rows;
  let totalSeats = rows.length - 1;
  for (let i = totalSeats; i >= wantedSeats || rows[i].isBookedBoolean; i--) {
    rows.splice(i, 1);
    if (i === 0) {
      break;
    }
  }
  if (rows.length === 0) {
    await databaseConnection.query(`TRUNCATE TABLE public."${spaceName}";`);
    return;
  }
  const values = rows.map((obj) => {
    const columns = Object.keys(obj);
    const values = Object.values(obj).map((value) => {
      if (value === null) {
        return `${value}`;
      }
      return `'${value}'`;
    });
    return `(${values.join(", ")})`;
  });
  const updateTableQuery = `TRUNCATE TABLE public."${spaceName}";
  INSERT INTO public."${spaceName}" ("${Object.keys(rows[0]).join('", "')}")
  VALUES
    ${values.join(", ")}
`;
  await databaseConnection.query(updateTableQuery);
};

function getSpaceType(seatID){
  if(seatID >= 10000 && seatID < 20000){
    return "Conference-Room"
  } else if(seatID >= 20000 && seatID < 30000){
    return "Cubicle"
  } else if(seatID >= 30000 && seatID < 40000){
    return "Hot-Seat"
  } else{
    return "Private-Office"
  }
}


async function updateSpaceTable(todayDate){
  // TODO: Change DATE("reservationDate")<='${todayDate}' to DATE("reservationDate")<'${todayDate}'
  const toInsertTuplesScript = `SELECT "userID", "seatID", "reservationDate"
  FROM public."Current-Reservation-Table" WHERE DATE("reservationDate")<='${todayDate}'`
  const {rows:tuples} = await databaseConnection.query(toInsertTuplesScript)
  for(const tuple of tuples){
    let {userID, seatID, reservationDate} = tuple
    const space = getSpaceType(seatID)
    const getSeat = `SELECT "reservedUserID", "reservationDates" FROM public."${space}" WHERE "seatID"='${seatID}'`
    const {rows} = await databaseConnection.query(getSeat)
    const currentValue = rows[0]
    currentValue.reservedUserID.splice(currentValue.reservedUserID.indexOf(userID), 1)
    currentValue.reservationDates.splice(currentValue.reservationDates.indexOf(reservationDate), 1)

    const updateScript = `UPDATE public."${space}" SET "reservationDates" = ARRAY[${currentValue.reservedUserID}] WHERE "seatID"='${seatID}'`


  }
  /*
  for(const tuple of tuples){
    const space = getSpaceType(tuple.seatID)
    const date = moment(tuple.reservationDate).format('YYYY-MM-DD')
    const updateScript = `UPDATE public."${space}"
    SET "reservedUserID"=array_remove("reservedUserID", '${tuple.userID}'), "reservationDates"=array_remove("reservationDates", '${date}')
    WHERE "seatID"='${tuple.seatID}'  AND array_position("reservedUserID", '${tuple.userID}') = 1 AND array_position("reservationDates", '${date}') = 1;`
    console.log(updateScript)
  }*/
  return
}

// 1. This should just insert successful reservations in the All-Reservation-Table.
// 2. The failed reservations will be installed via a different function.
// 3. The reservation status by default will be true here, which translates to success.
// 4. The cancellation route will insert it as false.
module.exports.updateCurrentAndAllReservationTable = catchAsyncError(
  async (req, res, next) => {
    try {
      const todayDate = new Date().toISOString().slice(0, 10);
      await updateSpaceTable(todayDate)
      const updateQuery = `INSERT INTO public."All-Reservation-Table"(
      "userID", "seatID", "reservationID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted")
      SELECT "userID", "seatID", "reservationID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted"
      FROM public."Current-Reservation-Table" WHERE DATE("reservationDate")<'${todayDate}';
      DELETE FROM public."Current-Reservation-Table" WHERE DATE("reservationDate")<'${todayDate}';`;
      await databaseConnection.query(updateQuery);
      return next();
    } catch (error) {
      console.log(error);
    }
  }
);
