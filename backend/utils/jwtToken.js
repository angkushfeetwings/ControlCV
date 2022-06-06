const sendToken = (res, user, statusCode, message) => {
	const token = user.getJwtToken();

	const options = {
		httpOnly: true,
		expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
	};

	const returnUser = user.returnUser();
	res.status(statusCode)
		.cookie("token", token, options)
		.json({ success: true, message, user: returnUser });
};

module.exports = sendToken;
