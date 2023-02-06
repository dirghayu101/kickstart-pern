const app = require("./app");
const dotenv = require("dotenv");
// Configuration of package dotenv to initialize all the variables stored in the file.
dotenv.config({ path: __dirname + "/config.env" });
const connectDatabase = require("./database/connection");
const PORT = process.env.PORT;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the system due to uncaught exception.`);
  process.exit(1);
});

const start = async () => {
  try {
    await connectDatabase.connect();
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
