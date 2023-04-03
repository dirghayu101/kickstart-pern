const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")

app.use(function(req, res, next) {
    // Add headers to enable CORS
    res.header("Access-Control-Allow-Origin", "*"); // allow requests from any origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // allow the specified methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // allow the specified headers
    next();
});
app.use(express.json());
app.use(cookieParser());

// Router imports
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