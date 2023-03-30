const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const cors = require("cors")
app.use(express.json());
app.use(cookieParser());

// Router imports
app.use(cors())
const user = require("./routes/userRoutes")
const admin = require("./routes/adminRoutes")
const userReservation = require('./routes/userReservation')

// Router use
app.use("/api/v1/user", user, userReservation)
app.use("/api/v1/admin", admin)
/* Error Middleware. 
This location is crucial because it will come when the next will be invoked from the routes.
*/
app.use(errorMiddleware)




module.exports = app