// Initializes the `courses` service on path `/courses`
const { Courses } = require("./courses.class");
const hooks = require("./courses.hooks");
const createCourseModel = require("../../models/courses.model");

module.exports = function (app) {
  const courseModel = createCourseModel(app);

  const options = {
    Model: courseModel,
    paginate: app.get("paginate"),
    whitelist: ["$populate", "$regex", "$options", "$sort"],
  };

  // Initialize our service with any options it requires
  app.use("/courses", new Courses(options, app));

  app.post("/remove_courses", async (req, res) => {
    const { selectedIds } = req.body;

    await courseModel.deleteMany({ _id: { $in: selectedIds } });

    const total = await courseModel.countDocuments({});
    const data = await courseModel.find({}).populate("category");

    res.json({ total, data });
  });

  // Get our initialized service so that we can register hooks
  const service = app.service("courses");

  service.hooks(hooks);
};
