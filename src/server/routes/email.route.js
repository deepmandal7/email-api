const router = require("express").Router();

const { emailController } = require("../controllers");

router.route("/").get(emailController).post(emailController);
router.get("/failed", emailController);
router.delete("/:_id", emailController);
router.put("/:_id", emailController);
module.exports = router;
