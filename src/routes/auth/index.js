const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.post("/register", controller.register.bind(this));
router.post("/login", controller.login.bind(this));

module.exports = router;
