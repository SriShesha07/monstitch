// /api/sendEmail.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { name, email, message } = req.body;

  // Setup transporter with Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    //   user: process.env.SMTP_EMAIL,        // your email
    //   pass: process.env.SMTP_APP_PASSWORD, // app password
      user: process.env.SMTP_EMAIL,        // your email
      pass: process.env.SMTP_APP_PASSWORD, // app password
    },
  });

  const mailOptions = {
    from: "testMonstitch@gmail.com",
    to: "srishesha07@gmail.com",
    subject: `New Contact Form Message from ${name}`,
    text: `Email: ${email}\n\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Email sending failed.' });
  }
}
