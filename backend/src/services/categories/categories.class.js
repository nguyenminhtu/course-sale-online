const { Service } = require("feathers-mongoose");

exports.Categories = class Categories extends Service {
  async find(params) {
    const queryParams = {};
    Object.keys(params.query).forEach((key) => {
      queryParams[`$${key}`] = params.query[key];
    });
    return super.find({ query: queryParams });
  }
};
