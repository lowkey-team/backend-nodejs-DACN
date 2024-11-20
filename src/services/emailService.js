const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nguyenvanvuong.2823@gmail.com",
      pass: "pnho pkoj yebw rlxt",
    },
  });

  const mailOptions = {
    from: "nguyenvanvuong.2823@gmail.com",
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, response: info.response };
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = {
  sendEmail,
};
