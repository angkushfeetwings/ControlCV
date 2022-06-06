const Course = require("../models/courseModel");
const Roadmap = require("../models/roadmapSchema");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

exports.addRoadmap = catchAsyncErrors(async (req, res, next) => {
	const { url, courseName } = req.body;
	const course = await Course.findOne({ title: { $regex: courseName, $options: "i" } });
	const newRoadmap = { url, courseName };
	if (course) {
		newRoadmap.courseId = course.id;
	}
	const roadmap = await Roadmap.create(newRoadmap);
	if (!roadmap) {
		return next(new ErrorHandler("Unable to create roadmap", 400));
	}
	// Saving the roadmap id in the course as well
	course.roadmap = roadmap.id;
	await course.save();

	res.status(201).json({ success: true, message: "Roadmap created successfully", roadmap });
});

exports.getAllRoadmaps = catchAsyncErrors(async (req, res, next) => {
	let roadmap;
	const { items } = req.query;
	roadmap = await Roadmap.find().limit(items);
	if (!roadmap || !roadmap.length) {
		return next(new ErrorHandler("No roadmaps available, stay tuned", 400));
	}
	const numberOfRoadmaps = roadmap.length;

	res.status(200).json({
		success: true,
		message: "Found all roadmaps successfully",
		roadmap,
		numberOfRoadmaps,
	});
});

exports.getOneRoadmap = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	let roadmap = await Roadmap.findById(id);
	if (!roadmap) {
		return next(new ErrorHandler("Roadmap not found", 404));
	}

	res.status(200).json({
		success: true,
		message: "Found roadmap successfully",
		roadmap,
	});
});

exports.updateRoadmap = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const { url, courseName } = req.body;
	let roadmap = await Roadmap.findById(id);
	if (!roadmap) {
		return next(new ErrorHandler("Roadmap not found", 404));
	}

	const newCourse = await Course.findOne({ title: { $regex: courseName, $options: "i" } });

	if (newCourse && newCourse.id !== roadmap.courseId) {
		const oldCourse = await Course.findById(roadmap.courseId);

		if (oldCourse) {
			oldCourse.roadmap = null;
			await oldCourse.save();
		}

		roadmap.courseId = newCourse.id;

		// Saving the roadmap id in the course as well
		newCourse.roadmap = roadmap.id;
		await newCourse.save();
	} else if (!newCourse) {
		const oldCourse = await Course.findById(roadmap.courseId);

		if (oldCourse) {
			oldCourse.roadmap = null;
			await oldCourse.save();
		}

		roadmap.courseId = null;
	}
	roadmap.url = url;
	roadmap.courseName = courseName;
	await roadmap.save();

	res.status(200).json({ success: true, message: "Roadmap updated successfully", roadmap });
});

exports.deleteRoadmap = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	let roadmap = await Roadmap.findById(id);
	if (!roadmap) {
		return next(new ErrorHandler("Roadmap not found", 404));
	}

	const course = await Course.findById(roadmap.courseId);
	if (course) {
		course.roadmap = null;
		await course.save();
	}

	await roadmap.remove();

	res.status(200).json({ success: true, message: "Roadmap deleted successfully" });
});
