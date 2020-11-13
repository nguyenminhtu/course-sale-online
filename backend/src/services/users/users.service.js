// Initializes the `users` service on path `/users`
const { Users } = require("./users.class");
const createModel = require("../../models/users.model");
const hooks = require("./users.hooks");

module.exports = function (app) {
  const userModel = createModel(app);

  const options = {
    Model: userModel,
    paginate: app.get("paginate"),
    whitelist: ["$regex", "$options", "$sort"],
  };

  // Initialize our service with any options it requires
  app.use("/users", new Users(options, app));

  app.post("/remove_users", async (req, res) => {
    const { selectedIds } = req.body;

    await userModel.deleteMany({ _id: { $in: selectedIds } });

    const total = await userModel.countDocuments({});
    const data = await userModel.find({});

    res.json({ total, data });
  });

  // Get our initialized service so that we can register hooks
  const service = app.service("users");

  service.hooks(hooks);
};
