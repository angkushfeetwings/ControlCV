const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const validateEmail = require("../utils/validateMail");
const User = require("../models/userModel");

exports.signUp = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password, confirmPassword } = req.body;
	if (!name || !email || !password || !confirmPassword) {
		return next(new ErrorHandler("Please validate all the fields", 400));
	}
	if (confirmPassword !== password) {
		return next(new ErrorHandler("Password and confirm password fields should match", 400));
	}
	if (!validateEmail(email)) {
		return next(new ErrorHandler("Please enter a valid e-mail address", 400));
	}

	let user = await User.create({ name, email, password });
	user = user.returnUser();
	res.status(200).json({
		success: true,
		message: "User created successfully",
		user,
	});
});

exports.login = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;
	if (!validateEmail(email)) {
		return next(new ErrorHandler("Please enter a valid e-mail address", 400));
	}

	let user = await User.findOne({ email });
	if (!user) {
		return next(new ErrorHandler("Invalid credentials", 404));
	}

	const passwordComparisonResult = await user.comparePassword(password);
	if (!passwordComparisonResult) {
		return next(new ErrorHandler("Invalid credentials", 404));
	}

	user = user.returnUser();
	res.status(200).json({
		success: true,
		message: "User created successfully",
		user,
	});
});

// forgot-password, reset-password, update-account, delete-account, logout, add-course, remove-course
