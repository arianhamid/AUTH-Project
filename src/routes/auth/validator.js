const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  registerValidator() {
    return [
      check("email").isEmail().withMessage("Please enter a valid email"),
      check("name").not().isEmpty().withMessage("Please enter a Name"),
      check("password").not().isEmpty().withMessage("Please enter a Password"),
      //check if password and confirm password are the same using express-validator custom validate
      check("password").custom((value, { req }) => {
        console.log(value);
        if (value!== req.body.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
    ];
  }
  loginValidator() {
    return [
      check("email").isEmail().withMessage("Please enter a valid email"),
      check("password").not().isEmpty().withMessage("Please enter a Password"),
    ];
  }
})();
