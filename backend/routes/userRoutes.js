const express = require("express");
const router = express.Router();
const {
	getUser,
	updateUser,
	deleteUser,
	forgotPassword,
	resetPasswordFunction,
	logoutUser,
	addCourse,
	removeCourse,
	getSavedCourses,
	userLogin,
	userSignUp,
} = require("../controllers/userController");
const { isUserAuthenticated } = require("../middleware/auth");

router.route("/").get(isUserAuthenticated, getUser);
router.route("/signup").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/update").put(isUserAuthenticated, updateUser);
router.route("/logout").get(isUserAuthenticated, logoutUser);
router.route("/delete/:id").delete(isUserAuthenticated, deleteUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").put(resetPasswordFunction);
router.route("/courses").get(isUserAuthenticated, getSavedCourses);
router.route("/add-course/:courseId").put(isUserAuthenticated, addCourse);
router.route("/remove-course/:courseId").put(isUserAuthenticated, removeCourse);

module.exports = router;
