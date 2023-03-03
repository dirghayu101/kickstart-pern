const databaseConnection = require("./connection");
const catchAsyncError = require("../middleware/catchAsyncError");

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

module.exports.updateCurrentAndAllReservationTable = catchAsyncError(
  async (req, res, next) => {
    const todayDate = new Date().toISOString().slice(0, 10);
    const updateQuery = `INSERT INTO public."All-Reservation-Table"(
      "userID", "seatID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted")
      SELECT "userID", "seatID", "transactionNumber", "bookingTime", "reservationDate", "wasMuted"
      FROM public."Current-Reservation-Table" WHERE DATE("reservationDate")<'${todayDate}';
      DELETE FROM public."Current-Reservation-Table" WHERE DATE("reservationDate")<'${todayDate}';`;
    await databaseConnection.query(updateQuery);
    return next();
  }
);
