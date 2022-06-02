const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// DATABASE
require("./database");

const cors = require("cors");
app.use(cors({ origin: "*", credentials: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// ROUTES
const routes = require("./routes/userRoutes");
app.use("/api", routes);

// ERROR-MIDDLEWARE
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
