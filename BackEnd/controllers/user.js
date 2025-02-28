const nodemailer = require("nodemailer");
const sendMail = (email,login_url) => {
  try{
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
        from: "ssponkiya612@gmail.com",
        to: email, 
        subject: "WelCome Mail",
        text: `WelCome Our FAQ's Management  Click on this URL :  ${login_url}`,
      };
      auth.sendMail(receiver, (error, emailResponse) => {
        if (error) throw error;
        console.log("success!");
        response.end();
      });
    
  }catch(err){
    console.log(err)
  }
  };
  
  module.exports = sendMail;
  