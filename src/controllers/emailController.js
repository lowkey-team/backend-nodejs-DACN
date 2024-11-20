const { sendEmail } = require("~/services/emailService");

const sendEmailController = async (req, res) => {
  const { to, subject, text, html } = req.body;

  // Kiểm tra đầu vào
  if (!to || !subject || !text) {
    return res.status(400).json({ message: "Missing required fields!" });
  }

  try {
    const result = await sendEmail({ to, subject, text, html });
    return res.status(200).json({
      message: "Email sent successfully!",
      response: result.response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send email.",
      error: error.message,
    });
  }
};

module.exports = {
  sendEmailController,
};
