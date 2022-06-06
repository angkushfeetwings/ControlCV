const { Router } = require("express");
const { getEmail } = require("../controllers/getContactMail");
const router = Router();

router.route("/send-mail").post(getEmail);

module.exports = router;
