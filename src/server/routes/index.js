const router = require("express").Router();

const emailRoute = require("./email.route");

router.use("/email", emailRoute);

module.exports = router;
