const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const { isLoggedIn } = require("./../middlewares/auth");

router.use("/auth", authRouter);
router.use("/user", isLoggedIn, userRouter);
module.exports = router;
