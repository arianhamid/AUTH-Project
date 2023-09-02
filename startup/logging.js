require("express-async-errors");
const winston = require("winston");
const debug = require("debug")("app:main"); // set namespace app:main to app:main for using debug package (set DEBUG=app:main). npm start command in cmd automatically set name space to app:main and then run project using nodmon

module.exports = function () {
  winston.add(new winston.transports.File({ filename: "logFile.log" }));

  //caught Exceptions outside express routes and add to fileLog.log(this will work only for synchronous codes ) then close the app
  process.on("uncaughtException", (ex) => {
    debug(ex);
    winston.error(ex.message, ex);
    setTimeout(() => process.exit(1), 50000);
  });
  // throw new Error(
  //       "(uncaughtException)something goes wrong outside of express routes"
  //     );

  //caught Rejections outside express routes and add to fileLog.log(this will work only for asynchronous codes ) then close the app
  process.on("unhandledRejection", async (ex) => {
    await winston.error(ex.message, ex);
    debug(ex);
    setTimeout(() => process.exit(1), 50000);
  });
  // const p = Promise.reject(new Error("some thing goes wrong outside promise"));
};
