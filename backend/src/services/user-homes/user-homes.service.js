const createCourseModel = require("../../models/courses.model");
const createCategoryModel = require("../../models/categories.model");

module.exports = function (app) {
  app.get("/user-homes", async (req, res) => {
    const { categoryId } = req.query;

    const categories = await createCategoryModel(app)
      .find({})
      .sort({ createdAt: -1 });
    const courses = await createCourseModel(app).find({
      category: categoryId ? categoryId : categories[0]._id,
    });

    res.json({ categories, courses });
  });

  app.service("user-homes");
};
