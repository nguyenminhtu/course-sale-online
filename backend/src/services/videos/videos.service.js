const multer = require("multer");
const fs = require("fs");

// Initializes the `videos` service on path `/videos`
const { Videos } = require("./videos.class");
const createModel = require("../../models/videos.model");
const hooks = require("./videos.hooks");

if (!fs.existsSync(process.env.PWD + "/public/uploads")) {
  fs.mkdirSync(process.env.PWD + "/public/uploads");
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) =>
    cb(null, process.env.PWD + "/public/uploads"), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // getting the file name
});

const upload = multer({
  storage,
});

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use(
    "/videos",
    upload.single("file"),
    (req, _, next) => {
      req.feathers.file = req.file;
      next();
    },
    new Videos(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("videos");

  service.hooks(hooks);
};
