// Initializes the `videos` service on path `/videos`
const { Videos } = require("./videos.class");
const createModel = require("../../models/videos.model");
const hooks = require("./videos.hooks");

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/videos", new Videos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("videos");

  service.hooks(hooks);
};
