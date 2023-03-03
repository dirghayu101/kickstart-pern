const app = require("./app");
const dotenv = require("dotenv");
// Configuration of package dotenv to initialize all the variables stored in the file.
dotenv.config({ path: __dirname + "/config.env" });
const connectDatabase = require("./database/connection");
const { getAllRowsOfSpace, addSeatsToSpace, cutColumnToSpecificSeats } = require("./database/reservationTablePopulateUtils");
const PORT = process.env.PORT;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the system due to uncaught exception.`);
  process.exit(1);
});

const insertTestRows = async () => {
  await addSeatsToSpace('Private-Office', 30)
  await addSeatsToSpace('Hot-Seat', 30)
  await addSeatsToSpace('Cubicle', 30)
  await addSeatsToSpace('Conference-Room', 30)
}

const deleteTestRows = async () => {
  await cutColumnToSpecificSeats('Private-Office', 0)
  await cutColumnToSpecificSeats('Hot-Seat', 0)
  await cutColumnToSpecificSeats('Cubicle', 0)
  await cutColumnToSpecificSeats('Conference-Room', 0)
}
 
const start = async () => {
  try {
    await connectDatabase.connect();
    // await deleteTestRows()
    await insertTestRows()
    console.log(`Database connected successfully!`);
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};

start();

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection.`);
  server.close(() => {
    process.exit(1);
  });
});
