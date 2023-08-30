const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");

router.post(
  "/register",
  validator.registerValidator(), // array of validators
  controller.validate.bind(this), //checks if there is errors
  controller.register.bind(this) // controls what to do next
);
router.post(
  "/login",
  validator.loginValidator(),
  controller.validate,
  controller.login.bind(this)
);

module.exports = router;
