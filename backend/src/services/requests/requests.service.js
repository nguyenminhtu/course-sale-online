// Initializes the `requests` service on path `/requests`
const { Requests } = require("./requests.class");
const createModel = require("../../models/requests.model");
const hooks = require("./requests.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/requests", new Requests(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("requests");

  service.hooks(hooks);
};
