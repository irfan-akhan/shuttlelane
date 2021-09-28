var mongoose = require("mongoose");
const shortid = require("shortid");

const prioritySchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    rate: {
      type: Number,
    },
  },
  { timestamps: true }
);

const PriorityClass = mongoose.model("priorityClass", prioritySchema);

module.exports = PriorityClass;
