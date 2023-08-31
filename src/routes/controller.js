const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");
const User = require("./../models/users");
module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
  }
  validationBody = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const messages = [];
      errors.forEach((error) => messages.push(error.msg));
      res.status(400).json({
        messages: "validation failed",
        data: messages,
      });
      return false;
    }
    return true;
  };
  validate = (req, res, next) => {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  };
  response({res, message, code = 200, data = {}}) {
    res.status(code).json({ message, data });
    console.log(message, code, data);
  }
};
