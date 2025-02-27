const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    que: {
      type: String,
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
const Faqs = new mongoose.model("Faqs", Schema);
module.exports = Faqs;
