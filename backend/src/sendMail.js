const nodemailer = require("nodemailer");

module.exports = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alertscript123@gmail.com",
      pass: "Tunguyen02071995",
    },
  });

  return transporter.sendMail(mailOptions);
};
