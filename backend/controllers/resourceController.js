const Course = require("../models/courseModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

exports.addResource = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const course = await Course.findById(id);
	if (!course) {
		return next(new ErrorHandler("Course not found", 404));
	}

	const { url, platform, description, author } = req.body;
	const resource = { url, platform, description, author };

	course.resources.push(resource);
	await course.save();

	res.status(201).json({ success: true, message: "Resource added successfully", course });
});

exports.getAllResources = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const course = await Course.findById(id);
	if (!course) {
		return next(new ErrorHandler("Course not found", 404));
	}
	if (!course.resources.length === 0) {
		return next(new ErrorHandler("No resources available yet, stay tuned", 400));
	}

	res.status(200).json({
		success: true,
		message: "Fetched all resources successfully",
		resources: course.resources,
	});
});

exports.getResource = catchAsyncErrors(async (req, res, next) => {
	const { resourceId, courseId } = req.params;

	const course = await Course.findById(courseId);
	if (!course) {
		return next(new ErrorHandler("Course not found", 404));
	}

	let reqResource = {};
	course.resources.forEach(resource => {
		if (String(resource._id) === resourceId) {
			reqResource = resource;
		}
	});

	res.status(200).json({
		success: true,
		message: "Fetched all resources successfully",
		resource: reqResource,
	});
});

exports.updateResource = catchAsyncErrors(async (req, res, next) => {
	const { resourceId, courseId } = req.params;
	const { url, platform, description, author } = req.body;

	const course = await Course.findById(courseId);
	if (!course) {
		return next(new ErrorHandler("Course not found", 404));
	}

	course.resources.forEach(resource => {
		if (String(resource._id) === resourceId) {
			resource.url = url;
			resource.platform = platform;
			resource.description = description;
			resource.author = author;
		}
	});
	await course.save();

	res.status(200).json({
		success: true,
		message: "Resource updated successfully",
		resources: course.resources,
	});
});

exports.deleteResource = catchAsyncErrors(async (req, res, next) => {
	const { resourceId, courseId } = req.params;

	const course = await Course.findById(courseId);
	if (!course) {
		return next(new ErrorHandler("Course not found", 404));
	}

	const newResources = [];
	course.resources.forEach(resource => {
		if (String(resource._id) !== resourceId) {
			newResources.push(resource);
		}
	});
	course.resources = newResources;
	await course.save();

	res.status(200).json({
		success: true,
		message: "Resource updated successfully",
		resources: course.resources,
	});
});
