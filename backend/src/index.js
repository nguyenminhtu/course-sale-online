const fs = require("fs");

const logger = require("./logger");
const app = require("./app");
const port = app.get("port");
const server = app.listen(port);

if (!fs.existsSync(process.env.PWD + "/public/uploads")) {
  fs.mkdirSync(process.env.PWD + "/public/uploads");
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
