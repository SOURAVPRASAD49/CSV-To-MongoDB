const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const memberSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("member", memberSchema);
