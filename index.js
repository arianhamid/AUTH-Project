require("express-async-errors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("app:main");
const router = require("./src/routes");
const winston = require("winston");

//connect to mongodb using mongoose
mongoose
  .connect(config.get("db.address"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => debug("MongoDB connected"))
  .catch((error) => debug(error.message));

app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.static("public"));
app.use("/api", router);

winston.add(new winston.transports.File({ filename: "logFile.log" }));

//caught Exceptions outside express routes and add to fileLog.log(this will work only for synchronous codes ) then close the app
process.on("uncaughtException", (ex) => {
  console.log("uncaughtException");
  winston.error(ex.message, ex);
  process.exit(1);
});
// throw new Error("something goes wrong outside of express routes");

//caught Rejections outside express routes and add to fileLog.log(this will work only for asynchronous codes ) then close the app
process.on("unhandledRejection", (ex) => {
  console.log("unhandledRejection");
  winston.error(ex.message, ex);
  process.exit(1);
});
// const p = Promise.reject(new Error("some thing goes wrong outside promise"));
// p.then(() => console.log("making promise error done"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening on port ${port}`));
