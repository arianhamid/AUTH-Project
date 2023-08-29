const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug");
const router = require("./src/routes");
//connect to mongodb using mongoose
mongoose
  .connect(config.get("db.address"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error.message));

app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.static("public"));
app.use("/api", router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening on port ${port}`));
