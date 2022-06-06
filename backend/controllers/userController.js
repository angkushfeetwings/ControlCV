const crypto = require("crypto");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const validateEmail = require("../utils/validateMail");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const sendEmail = require("../utils/sendEmail");
const sendToken = require("../utils/jwtToken");

exports.userSignUp = catchAsyncErrors(async (req, res, next) => {
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
	if (!user) {
		return next(new ErrorHandler("Unable to create user", 400));
	}
	sendToken(res, user, 201, "User account created successfully");
});

exports.userLogin = catchAsyncErrors(async (req, res, next) => {
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
	sendToken(res, user, 200, "User login successful");
});

exports.getUser = catchAsyncErrors(async (req, res, next) => {
	let user = await User.findById(req.user.id).populate("courses");
	res.status(200).json({ success: true, message: "User found successfully", user });
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
	const id = req.user.id;
	const { name, email } = req.body;
	let newUserData = { name, email };

	if (!validateEmail(email)) {
		return next(new ErrorHandler("Please enter a valid e-mail address", 400));
	}

	let user = await User.findByIdAndUpdate(id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	if (!user) {
		return next(new ErrorHandler("Unable to update user", 404));
	}

	user = user.returnUser();
	res.status(200).json({ success: true, message: "User updated successfully", user });
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
	let user = req.user;
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "User logout successful" });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	let user = req.user;
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	await user.remove();
	res.status(200).json({
		success: true,
		message: "User account deleted successfully",
	});
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const { email } = req.body;
	let user = await User.findOne({ email });
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	const resetPassword = crypto.randomBytes(10).toString("hex");
	user.resetPassword = resetPassword;
	await user.save();

	const text = `
	Click on the link below or copy paste it into your browser
	${resetPassword}

	P.S.: Please do not reply to this e-mail.
	`;

	const subject = "Reset password link";

	const { success, message } = await sendEmail(email, text, subject);
	if (!success) {
		return next(new ErrorHandler(message, 400));
	}

	res.status(200).json({
		success: true,
		message:
			"An email has been sent to this e-mail address, please reset your password from the link provided in the e-mail",
	});
});

exports.resetPasswordFunction = catchAsyncErrors(async (req, res, next) => {
	const { link, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return next(new ErrorHandler("Password and confirm password fields should match", 400));
	}

	let user = await User.findOne({ resetPassword: link });
	if (!user) {
		return next(new ErrorHandler("Link Expired", 404));
	}

	user.password = password;
	user.resetPassword = "";

	await user.save();

	user = user.returnUser();
	res.status(200).json({ success: true, message: "Password updated successfully", user });
});

exports.getSavedCourses = catchAsyncErrors(async (req, res, next) => {
	const courses = await User.findById(req.user.id).populate("courses");

	res.status(200).json({
		success: true,
		message: "Fetched all saved courses successfully",
		courses,
	});
});

exports.addCourse = catchAsyncErrors(async (req, res, next) => {
	const { courseId } = req.params;
	if (!courseId) {
		return next(new ErrorHandler("Please select a course", 400));
	}

	const course = await Course.findById(courseId);
	if (!course) {
		return next(new ErrorHandler("Course not found", 404));
	}

	let user = req.user;
	user.courses.push(courseId);
	await user.save();

	res.status(200).json({ success: true, message: "Course added successfully" });
});

exports.removeCourse = catchAsyncErrors(async (req, res, next) => {
	const { courseId } = req.params;
	if (!courseId) {
		return next(new ErrorHandler("Please select a course", 400));
	}

	let user = req.user;
	let newCourses = [];
	user.courses.forEach(course => {
		if (String(course._id) !== courseId) {
			newCourses.push(course);
		}
	});
	user.courses = newCourses;
	await user.save();

	res.status(200).json({ success: true, message: "Course removed successfully" });
});
