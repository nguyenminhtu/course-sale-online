const nodemailer = require("nodemailer");

module.exports = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  return transporter.sendMail(mailOptions);
};
