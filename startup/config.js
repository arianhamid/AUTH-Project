const bodyParser = require("body-parser");

module.exports = function (app,express) {
    app.use(bodyParser.json()); // parse requests of content-type - application/json
    app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.static("public"));
};
