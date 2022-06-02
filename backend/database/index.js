const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI_LOCAL;

mongoose.connect(DB_URI);
