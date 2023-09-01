const controller = require("../controller");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require('jsonwebtoken')
const config = require("config")


module.exports = new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: "Email already exists",
      });
    }
    // const {name,email,password}= req.body
    // user = new this.User({
    //   name,
    //   email,
    //   password,
    // });
    //codes commented above should be like these with lodash package
    user = new this.User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    this.response({
      res,
      message: "User created successfully",
      data: _.pick(user, ["name", "email"]),
    });
  }

  async login(req, res) {
    // throw new Error('login failed');
    const user = await this.User.findOne({email:req.body.email});
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "Invalid Email Or Password!",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return this.response({
        res,
        code: 400,
        message: "Invalid Email Or Password!",
      });
    }
    const token = jwt.sign({ id: user.id }, config.get("jwt_key"));
    this.response({
      res,
      message: "User logged in successfully",
      data: token,
    });
  }
})();
