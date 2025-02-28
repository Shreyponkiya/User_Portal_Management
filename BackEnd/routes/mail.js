const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.get("/", (req, res) => {
  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: "shreyponkiya@gmail.com",
      pass: "oxxl zygk qofk atlm",
    },
  });

  const receiver = {
    from: "ssponkiya612@gmail.com", // sender address
    to: "shreyponkiya11@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
  };
  auth.sendMail(receiver, (error, emailResponse) => {
    if (error) throw error;
    console.log("success!");
    response.end();
  });
});

module.exports = router;
