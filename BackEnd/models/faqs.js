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
    category: {
      type: String,
    },
  },
  { timestamps: true }
);
const Faqs = new mongoose.model("Faqs", Schema);
module.exports = Faqs;
