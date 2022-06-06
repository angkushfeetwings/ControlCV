const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI_PRODUCTION;

mongoose
	.connect(DB_URI)
	.then(() => console.log("Connected to database"))
	.catch(err => console.log(err));
