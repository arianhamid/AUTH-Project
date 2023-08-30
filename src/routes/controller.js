const { validationResult } = require("express-validator");
const User = require("./../models/users")
module.exports = class {
  constructor() {
    this.User = User
  }
  validationBody = (req, res)=> {
    console.log(req.body);
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
  }
  validate= (req, res, next) => {
    console.log("routes controller:", this);
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }
  response(res,message,code=200,data={}){
res.status(code).json({message,data})
  }
};
