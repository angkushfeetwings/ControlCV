const { Schema, model, SchemaTypes } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
	name: { type: String, required: [true, "Please enter your name"] },
	email: { type: String, required: [true, "Please enter your e-mail ID"], unique: true },
	password: { type: String, required: [true, "Please enter a password"] },
	resetPassword: { type: String, default: "" },
	role: { type: String, default: "user" }, // user, admin
	courses: [{ type: SchemaTypes.ObjectId, ref: "course" }],
});

// delete password before sending it to client
userSchema.methods.returnUser = function () {
	const { name, email, courses, _id, role } = this;
	const newUser = { name, email, courses, _id, role };
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

// creating jwt token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, String(process.env.JWT_SECRET));
};

module.exports = model("user", userSchema);
