const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    premiseType: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: String,
      required: true,
      default: "",
    },
    budget: {
      type: String,
      required: true,
      default: "",
    },
    ownership: {
      type: String,
      required: true,
      default: "",
    },
    rooms: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const ProjectModel = mongoose.model("projects", projectSchema);

module.exports = ProjectModel;
