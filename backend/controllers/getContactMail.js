const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendEmail = require("../utils/sendEmail");
const validateEmail = require("../utils/validateMail");

exports.getEmail = catchAsyncErrors(async (req, res, next) => {
	const { email, messageBody, name } = req.body;

	if (!validateEmail(email)) {
		return next(new ErrorHandler("Please enter a valid e-mail address", 400));
	}

	const subject = `Mail from ${name}`;
	const text = `
    You got a mail from ${name}
    E-mail id: ${email}
    His message 👇
    ------------------------------
    ${messageBody}
    ------------------------------
    `;

	const { success, message } = await sendEmail(process.env.MAIL, text, subject);
	if (!success) {
		return next(new ErrorHandler(message, 400));
	}

	res.status(200).json({
		success: true,
		message: "Mail sent successfully",
	});
});
