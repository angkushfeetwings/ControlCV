function catchAsyncErrors(theFunction) {
	return function (req, res, next) {
		Promise.resolve(theFunction(req, res, next)).catch(next);
	};
}

module.exports = catchAsyncErrors;
