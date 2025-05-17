require('dotenv').config(); // ← add this to load .env if needed

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: process.env.NUXT_SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NUXT_SMTP_USER,
    pass: process.env.NUXT_SMTP_PASS
  }
});

var mailOptions = {
  from: process.env.NUXT_SMTP_USER,
  to: 'kahennefer@gmail.com',
  subject: 'Hello ✔',
  text: 'Hello world!',
  html: '<b>Hello world ?</b>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Message sent:', info.response);
});
