// /api/sendConfirmation.js

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { to, name, orderId, items, total } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_EMAIL,         // Your Gmail address
        pass: process.env.SMTP_APP_PASSWORD, // App Password from Google
      },
    });

    const itemList = items
      .map((item) => `• ${item.name} (${item.size}) x${item.quantity} - ₹${item.price * item.quantity}`)
      .join("<br/>");

    await transporter.sendMail({
      from: `"Monstitch" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for your order. Here are your order details:</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Items:</strong><br/>${itemList}</p>
        <p><strong>Total:</strong> ₹${total}</p>
        <br/>
        <p>We’ll update you once the order is shipped.</p>
        <p><strong>– Monstitch Team</strong></p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email sending failed:", err);
    return res.status(500).json({ success: false, error: "Email failed to send." });
  }
}
