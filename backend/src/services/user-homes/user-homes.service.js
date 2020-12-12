const crypto = require("crypto");

const createCourseModel = require("../../models/courses.model");
const createCategoryModel = require("../../models/categories.model");
const createLessonModel = require("../../models/lessons.model");
const createReviewModel = require("../../models/reviews.model");
const createRequestModel = require("../../models/requests.model");
const createUserModel = require("../../models/users.model");

const sendMail = require("../../sendMail");

module.exports = function (app) {
  app.get("/user-homes", async (req, res) => {
    const { categoryId, userId } = req.query;

    const categories = await createCategoryModel(app)
      .find({})
      .sort({ createdAt: -1 });
    let courses = categories.length
      ? await createCourseModel(app).find({
          category: categoryId ? categoryId : categories[0]._id,
        })
      : [];

    let hotCourses = await createCourseModel(app)
      .find({})
      .sort({ purchaseNumber: -1 })
      .limit(4);

    if (userId) {
      const user = await createUserModel(app).findOne({ _id: userId });
      courses = courses.filter((course) => !user.courses.includes(course._id));
      hotCourses = hotCourses.filter(
        (course) => !user.courses.includes(course._id)
      );
    }

    res.json({ categories, courses, hotCourses });
  });

  app.get("/course-detail", async (req, res) => {
    const { courseId } = req.query;

    const course = await createCourseModel(app).findOne({ _id: courseId });

    const reviews = await createReviewModel(app)
      .find({ course: courseId })
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ course, reviews });
  });

  app.get("/search-courses", async (req, res) => {
    const { q, userId } = req.query;

    let courses = await createCourseModel(app).find({
      name: { $regex: q, $options: "ig" },
    });

    if (userId) {
      const user = await createUserModel(app).findOne({ _id: userId });
      courses = courses.filter((course) => !user.courses.includes(course._id));
    }

    res.json({ courses });
  });

  app.post("/checkout", async (req, res) => {
    const { courses, user, note } = req.body;

    for (let i = 0; i < courses.length; i++) {
      await createRequestModel(app).create({
        user,
        course: courses[i],
        note,
      });
    }

    res.json({ status: "success" });
  });

  app.get("/my-courses", async (req, res) => {
    const { userId, categoryId, search } = req.query;

    const categories = await createCategoryModel(app)
      .find({})
      .select(["_id", "name"]);

    const user = await createUserModel(app)
      .findOne({
        _id: userId,
      })
      .populate("courses")
      .select("courses");

    let courseResponse = user.courses;

    if (categoryId) {
      courseResponse = courseResponse.filter(
        (course) => course.category == categoryId
      );
    }

    if (search) {
      courseResponse = courseResponse.filter(
        (course) => course.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    }

    res.json({ courses: courseResponse, categories });
  });

  app.get("/my-course-detail", async (req, res) => {
    const { courseId } = req.query;

    const course = await createCourseModel(app).findOne({ _id: courseId });

    const lessons = await createLessonModel(app).find({ course: courseId });

    res.json({ course, lessons });
  });

  app.patch("/my-course-detail/finish-lesson", async (req, res) => {
    const { lessonId, courseId } = req.body;

    await createLessonModel(app).findOneAndUpdate(
      { _id: lessonId },
      { isFinish: true }
    );

    const course = await createCourseModel(app).findOne({ _id: courseId });

    const lessons = await createLessonModel(app).find({ course: courseId });

    res.json({ course, lessons });
  });

  app.get("/active-account", async (req, res) => {
    const { activationToken } = req.query;

    let user = null;

    try {
      user = await createUserModel(app).findOne({ activationToken });

      if (user) {
        await createUserModel(app).update(
          { _id: user._id },
          { activationToken: null }
        );
      }
    } catch {}

    res.json({ user });
  });

  app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    let user = null;

    try {
      user = await createUserModel(app).findOne({ email });

      if (user) {
        const forgotPasswordToken = crypto.randomBytes(12).toString("hex");
        const mailOptions = {
          from: "no-reply@nkh.com",
          to: email,
          subject: "Reset password",
          html: `<div align="center">
						<h1>Welcome to NKH</h1>

						<p>Please click to the link below to reset your password !</p>

						<p>
							<a href="http://localhost:3000/reset-password?token=${forgotPasswordToken}">Reset password</a>
						</p>
					</div>`,
        };

        await sendMail(mailOptions);

        await createUserModel(app).update({ email }, { forgotPasswordToken });
      }
    } catch {}

    const response = user
      ? {
          message:
            "An email was sent to your email. Please check your email to reset your password.",
        }
      : { code: 400, message: "Email not found." };

    res.json(response);
  });

  app.get("/reset-password", async (req, res) => {
    const { forgotPasswordToken } = req.query;

    let user = null;

    try {
      user = await createUserModel(app).findOne({ forgotPasswordToken });
    } catch {}

    res.json({ user });
  });

  app.post("/update-password", async (req, res) => {
    const { forgotPasswordToken, password } = req.body;

    let response = null;

    try {
      const user = await createUserModel(app).findOne({ forgotPasswordToken });
      response = await app
        .service("users")
        .patch(user._id, { password, forgotPasswordToken: null });
    } catch (err) {
      console.log("============= error update password", err);
    }

    res.json(response);
  });

  app.service("user-homes");
};
