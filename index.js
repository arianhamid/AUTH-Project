const express = require("express");
const app = express();
const router = require("./src/routes");

require("./startup/db")();
require("./startup/config")(app, express);
require("./startup/logging")();

app.use("/api", router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening on port ${port}`));
