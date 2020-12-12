const fs = require("fs");

const logger = require("./logger");
const app = require("./app");
const port = app.get("port");
const server = app.listen(port);

if (!fs.existsSync(__dirname + "/public/uploads")) {
  fs.mkdirSync(__dirname + "/public/uploads");
}

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () =>
  logger.info(
    "Feathers application started on http://%s:%d",
    app.get("host"),
    port
  )
);
