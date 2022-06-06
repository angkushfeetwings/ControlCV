const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel");

exports.isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
	let token = req.cookies.token;
	if (!token && req.headers.cookie) {
		token = req.headers.cookie;
	}
	if (!token) {
		return next(new ErrorHandler("Please login to access this resource", 401));
	}

	const data = jwt.verify(token, String(process.env.JWT_SECRET));
	req.user = await User.findById(data.id);

	next();
});

exports.authorizeRoles = function (...roles) {
	return function (req, res, next) {
		if (!roles.includes(req.user.role)) {
			return next(new ErrorHandler("You are not allowed to access this resource", 403));
		}

		next();
	};
};
