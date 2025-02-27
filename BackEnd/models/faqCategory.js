const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  category:{
    type:String,
    required:true
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
  },{ timestamps: true });
const Category = new mongoose.model("Category", Schema);
module.exports = Category;