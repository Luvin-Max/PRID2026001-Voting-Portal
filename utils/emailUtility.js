import nodemailer from "nodemailer";

const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, userName, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Hello ${userName}, your verification code is: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { sent: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { sent: false };
  }
};
