const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");

router.post(
  "/register",
  validator.registerValidator(), // array of validators
  controller.validate, //checks if there is errors
  controller.register // controls what to do next
);
router.post(
  "/login",
  validator.loginValidator(),
  controller.validate,
  controller.login
);

module.exports = router;
