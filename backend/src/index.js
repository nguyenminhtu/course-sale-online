const fs = require("fs");
const path = require("path");

const logger = require("./logger");
const app = require("./app");
const port = app.get("port");
const server = app.listen(port);

const uploadPath = path.join(__dirname, "../public/uploads");

if (!fs.existsSync(uploadPath)) {
  try {
    fs.mkdirSync(uploadPath);
  } catch {}
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
