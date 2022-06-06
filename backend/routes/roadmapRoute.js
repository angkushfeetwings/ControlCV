const {
	addRoadmap,
	updateRoadmap,
	deleteRoadmap,
	getAllRoadmaps,
	getOneRoadmap,
} = require("../controllers/roadmapController");
const { Router } = require("express");
const { authorizeRoles, isUserAuthenticated } = require("../middleware/auth");
const router = Router();

router.route("/").get(getAllRoadmaps);
router.route("/:id").get(getOneRoadmap);
router.route("/add").post(isUserAuthenticated, authorizeRoles("admin"), addRoadmap);
router.route("/update/:id").put(isUserAuthenticated, authorizeRoles("admin"), updateRoadmap);
router.route("/delete/:id").delete(isUserAuthenticated, authorizeRoles("admin"), deleteRoadmap);

module.exports = router;
