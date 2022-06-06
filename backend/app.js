const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// DATABASE
require("./database");

const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// ROUTES
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoute");
const roadmapRoutes = require("./routes/roadmapRoute");
const contactRoutes = require("./routes/contactRoute");
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/contact", contactRoutes);

// ERROR-MIDDLEWARE
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
