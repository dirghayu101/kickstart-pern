const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cookieParser());

// Router imports
const user = require("./routes/userRoutes")

// Router use
app.use("/api/v1/user", user)

/* Error Middleware. 
This location is crucial because it will come when the next will be invoked from the routes.
*/
app.use(errorMiddleware)

// Dummy Route
app.get('/', (req, res) => {
    res.status(200).send('<h1>The website is under construction!</h1>')
})


module.exports = app