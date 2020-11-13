const { Service } = require("feathers-mongoose");

exports.Videos = class Videos extends Service {
  async create(data, params) {
    console.log(params.file);
    const videoParam = {
      name: data.name,
      path: `/uploads/${params.file.filename}`,
    };
    return super.create(videoParam);
  }
};
