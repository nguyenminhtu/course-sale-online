const { Service } = require("feathers-mongoose");

exports.Users = class Users extends Service {
  async find(params) {
    if (params.query["$limit"]) {
      return super.find({ query: params.query });
    }

    const queryParams = { $sort: { createdAt: -1 } };

    Object.keys(params.query).forEach((key) => {
      if (key === "search") {
        queryParams["username"] = {
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
