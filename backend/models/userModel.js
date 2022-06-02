const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Please enter your name"] },
	email: { type: String, required: [true, "Please enter your e-mail ID"], unique: true },
	password: { type: String, required: [true, "Please enter a password"] },
	resetPassword: { type: String, default: "" },
	role: { type: String, default: "user" },
	courses: [{ type: String }],
});

// delete password before sending it to client
userSchema.methods.returnUser = function () {
	const { name, email, courses, _id } = this;
	const newUser = { name, email, courses, _id };
	return newUser;
};

// hashing passwords before saving
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// comparing hash passwords with given passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
	const result = await bcrypt.compare(enteredPassword, this.password);
	return result;
};

module.exports = mongoose.model("user", userSchema);
