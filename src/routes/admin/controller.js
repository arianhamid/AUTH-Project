const controller = require("../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async dashboard(req, res) {
    res.json({ message: "admin dashboard" });
  }
})();
