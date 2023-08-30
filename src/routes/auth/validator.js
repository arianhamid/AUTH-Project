const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  registerValidator() {
    return [
      check("email").isEmail().withMessage("Please enter a valid email"),
      check("name").not().isEmpty().withMessage("Please enter a Name"),
      check("password").not().isEmpty().withMessage("Please enter a Password"),
    ];
  }
  loginValidator() {
    return [
      check("email").isEmail().withMessage("Please enter a valid email"),
      check("password").not().isEmpty().withMessage("Please enter a Password"),
    ];
  }
})();
