const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("./../models/users");

const isLoggedIn = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      message: "access denied",
    });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "invalid token" });
  }
};
async function isAdmin(req, res, next) {
  if (!req.user.isAdmin) res.status(403).send("access denied");
  next();
}

module.exports = { isLoggedIn, isAdmin };
