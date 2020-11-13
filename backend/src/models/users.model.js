const createRequestModel = require("./requests.model");
const createReviewModel = require("./reviews.model");

module.exports = function (app) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");
  const schema = new mongooseClient.Schema(
    {
      username: { type: String, required: true },
      email: { type: String, unique: true, lowercase: true, required: true },
      password: { type: String, required: true },
      dob: { type: String },
      sex: { type: Number, enum: [0, 1, 2] },
      phone: { type: String },
      role: { type: Number, enum: [0, 1], default: 1 },
    },
    {
      timestamps: true,
    }
  );

  // cascade delete
  schema.pre("deleteMany", async function (next) {
    const query = this.getQuery()["_id"];
    await createRequestModel(app).deleteMany({ user: query });
    await createReviewModel(app).deleteMany({ user: query });
    next();
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
