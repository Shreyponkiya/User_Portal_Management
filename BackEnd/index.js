const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const connect_mongo = require("./connection/user");
const userRouter = require("./routes/user");
const faqCategoryRouter = require("./routes/faqcategory");
const Faqs = require("./routes/faqs")
const app = express();
const PORT = 4000;

connect_mongo("mongodb://127.0.0.1:27017/signup_user");
app.use(cors());
app.use(body_parser.json());

app.use("/user", userRouter);
app.use("/faqcategory", faqCategoryRouter);
app.use("/faqs", Faqs);

app.listen(PORT, () => {
  console.log("server run on", PORT);   
});
