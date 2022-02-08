const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let projectSchema = new Schema(
  {
    name: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    document: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "Projects",
  }
);

module.exports = mongoose.model("Project", projectSchema);
