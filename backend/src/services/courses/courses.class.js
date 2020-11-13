const { Service } = require("feathers-mongoose");

exports.Courses = class Courses extends Service {
  async find(params) {
    const queryParams = { $populate: "category", $sort: { createdAt: -1 } };
    Object.keys(params.query).forEach((key) => {
      if (key === "search") {
        queryParams["name"] = {
          $regex: params.query[key],
          $options: "ig",
        };
        return;
      }

      queryParams[`$${key}`] = params.query[key];
    });
    return super.find({ query: queryParams });
  }
};
