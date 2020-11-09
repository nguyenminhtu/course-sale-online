// Initializes the `lessons` service on path `/lessons`
const { Lessons } = require('./lessons.class');
const createModel = require('../../models/lessons.model');
const hooks = require('./lessons.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/lessons', new Lessons(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('lessons');

  service.hooks(hooks);
};
