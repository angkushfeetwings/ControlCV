const nodemailer = require("nodemailer");

const sendEmail = async (email, text, subject) => {
	try {
		const transporter = nodemailer.createTransport({
			service: process.env.MAIL_SERVICE,
			auth: {
				user: process.env.MAIL,
				pass: process.env.MAIL_PASS,
			},
		});

		const mailOptions = {
			from: process.env.MAIL,
			to: email,
			subject,
			text,
		};

		await transporter.sendMail(mailOptions);
		return { success: true, message: "Mail sent successfully" };
	} catch (error) {
		return { success: false, message: "Unable to send e-mail" };
	}

	return true;
};

module.exports = sendEmail;
