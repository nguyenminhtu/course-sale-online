const users = require('./users/users.service.js');
const courses = require('./courses/courses.service.js');
const categories = require('./categories/categories.service.js');
const reviews = require('./reviews/reviews.service.js');
const lessons = require('./lessons/lessons.service.js');
const exams = require('./exams/exams.service.js');
const questions = require('./questions/questions.service.js');
const answers = require('./answers/answers.service.js');
const requests = require('./requests/requests.service.js');
const videos = require('./videos/videos.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(courses);
  app.configure(categories);
  app.configure(reviews);
  app.configure(lessons);
  app.configure(exams);
  app.configure(questions);
  app.configure(answers);
  app.configure(requests);
  app.configure(videos);
};
