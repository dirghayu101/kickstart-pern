const app = require("./app");
const dotenv = require("dotenv");
const {initializeDatabase} = require('./database/initialiseScript')
// Configuration of package dotenv to initialize all the variables stored in the file.

dotenv.config({ path: __dirname + "/config.env" });

const databaseConnection = require("./database/connection");
const { getAllRowsOfSpace, addSeatsToSpace, cutColumnToSpecificSeats } = require("./database/reservationTablePopulateUtils");
const PORT = process.env.PORT || 4500;

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

const rowsExistInSpace = async () => {
  const script = `SELECT * from public."Private-Office"`
  const {rows: result} = await databaseConnection.query(script)
  if(!result.length){
    return true
  } else{
    return false
  }
}

// Dummy Route
app.get('/', (req, res) => {
  console.log("Request received at get '/' route.")
  res.status(200).send('<h1>The website is under construction!</h1>')
})

const start = async () => {
  try {
    await databaseConnection.connect();
    // await initializeDatabase();
    // if(await rowsExistInSpace()){
    //   await deleteTestRows()
    //   await insertTestRows()
    // }
    console.log(`Database connected successfully!`);
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
    console.log("After database connection.")
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
