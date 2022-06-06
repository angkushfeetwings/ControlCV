const Course = require("../models/courseModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createCourse = catchAsyncErrors(async (req, res, next) => {
	const { title, description, category, language } = req.body;
	if (!title || !description || !category || !language) {
		return next(new ErrorHandler("Please enter all the fields", 400));
	}

	let course = await Course.create({ title, description, category, language });
	if (!course) {
		return next(new ErrorHandler("Unable to add course", 400));
	}

	res.status(201).json({ success: true, message: "Course added successfully" });
});

exports.getAllCourses = catchAsyncErrors(async (req, res, next) => {
	let courses;
	const { items } = req.query;
	courses = await Course.find().limit(items);
	if (!courses || !courses.length) {
		return next(new ErrorHandler("No courses available, stay tuned", 400));
	}
	const numberOfCourses = courses.length;

	res.status(200).json({
		success: true,
		message: "Found all courses successfully",
		courses,
		numberOfCourses,
	});
});

exports.getCourse = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	let course = await Course.findById(id);
	if (!course) {
		return next(new ErrorHandler("Course not found", 404));
	}

	res.status(200).json({ success: true, message: "Course found successfully", course });
});

exports.updateCourse = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const { title, description, category } = req.body;
	let newCourseData = { title, description, category };

	let course = await Course.findByIdAndUpdate(id, newCourseData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	if (!course) {
		return next(new ErrorHandler("Course not found", 404));
	}

	res.status(200).json({ success: true, message: "Course updated successfully", course });
});

exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const course = await Course.findById(id);
	if (!course) {
		return next(new ErrorHandler("Course not found", 404));
	}

	await course.remove();
	res.status(200).json({ success: true, message: "Course deleted successfully" });
});
