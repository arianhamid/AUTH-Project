const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const adminRouter = require("./admin");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const error = require("../middlewares/error");

router.use("/auth", authRouter);
router.use("/user", isLoggedIn, userRouter);
router.use("/admin", isLoggedIn, isAdmin, adminRouter);
router.use(error);

module.exports = router;
