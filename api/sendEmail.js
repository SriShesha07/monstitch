// /api/sendEmail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Monstitch" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email sending failed:", err);
    return res.status(500).json({ success: false, error: "Email failed to send." });
  }
}
