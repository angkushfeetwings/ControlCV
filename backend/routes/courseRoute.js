const express = require("express");
const router = express.Router();
const {
	createCourse,
	deleteCourse,
	updateCourse,
	getCourse,
	getAllCourses,
} = require("../controllers/courseController");
const {
	addResource,
	deleteResource,
	updateResource,
	getAllResources,
	getResource,
} = require("../controllers/resourceController");
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");

router.route("/").get(getAllCourses);
router.route("/:id").get(getCourse);
router.route("/create").post(isUserAuthenticated, authorizeRoles("admin"), createCourse);
router.route("/update/:id").put(isUserAuthenticated, authorizeRoles("admin"), updateCourse);
router.route("/delete/:id").delete(isUserAuthenticated, authorizeRoles("admin"), deleteCourse);
router.route("/:id/resources").get(getAllResources);
router.route("/:courseId/resource/:resourceId").get(getResource);
router.route("/:id/add-resource").post(isUserAuthenticated, authorizeRoles("admin"), addResource);
router
	.route("/:courseId/update/:resourceId")
	.put(isUserAuthenticated, authorizeRoles("admin"), updateResource);
router
	.route("/:courseId/delete/:resourceId")
	.delete(isUserAuthenticated, authorizeRoles("admin"), deleteResource);

module.exports = router;
