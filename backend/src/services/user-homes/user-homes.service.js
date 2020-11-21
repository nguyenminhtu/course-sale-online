const createCourseModel = require("../../models/courses.model");
const createCategoryModel = require("../../models/categories.model");
const createLessonModel = require("../../models/lessons.model");
const createReviewModel = require("../../models/reviews.model");

module.exports = function (app) {
  app.get("/user-homes", async (req, res) => {
    const { categoryId } = req.query;

    const categories = await createCategoryModel(app)
      .find({})
      .sort({ createdAt: -1 });
    const courses = await createCourseModel(app).find({
      category: categoryId ? categoryId : categories[0]._id,
    });

    const hotCourses = await createCourseModel(app)
      .find({})
      .sort({ purchaseNumber: -1 })
      .limit(4);

    res.json({ categories, courses, hotCourses });
  });

  app.get("/course-detail", async (req, res) => {
    const { courseId } = req.query;

    const course = await createCourseModel(app).findOne({ _id: courseId });

    const lessons = await createLessonModel(app).find({ course: courseId });

    const reviews = await createReviewModel(app)
      .find({ course: courseId })
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ course, lessons, reviews });
  });

  app.service("user-homes");
};
