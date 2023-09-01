const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("app:main");

module.exports = function () {
  //connect to mongodb using mongoose
  mongoose
    .connect(config.get("db.address"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => debug("MongoDB connected"))
    .catch((error) => debug(error.message));
};
