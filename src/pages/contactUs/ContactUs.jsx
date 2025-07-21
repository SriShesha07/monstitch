// ContactUs.jsx
import React, { useState } from 'react';
import Layout from '../../componentss/layout/Layout';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #111; color: #eee; padding: 20px;">
        <div style="max-width: 700px; margin: auto; background-color: #111; padding: 30px; border-radius: 10px; border: 1px solid #333;">
          <h2 style="color: #ffffff;">Hey Monstitch Team,</h2>
          <p style="line-height: 1.6;">
            A customer has submitted a support request via the <strong style="color: #ff4d00;">Contact Us</strong> form.
          </p>
          <hr style="border-color: #444; margin: 20px 0;" />
          <div style="line-height: 1.8;">
            <p><strong style="color: #fff;">Name:</strong> ${name}</p>
            <p><strong style="color: #fff;">Email:</strong> ${email}</p>
            <p><strong style="color: #fff;">Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong style="color: #fff;">Message:</strong><br/>${message}</p>
          </div>
          <hr style="border-color: #444; margin: 20px 20px;" />
          <p style="line-height: 1.6;">Please get in touch with the customer at your earliest convenience.</p>
          <p style="margin-top: 30px;">Thanks,<br/><strong style="color: #ff4d00;">– Contact Form Bot</strong></p>
        </div>
      </div>
    `;

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'monstitchclothing@gmail.com',
          subject: 'New Customer Support Request',
          html: emailHtml,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert('Message sent to support team successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      console.error('Email sending error:', err);
      alert('Something went wrong while sending the message.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white px-4 py-10 font-sans">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Got a question<span className="text-white">?</span>
          </h2>

          <p className="text-lg font-semibold mb-2">
            Monstitch Team – We’re Here to Help!
          </p>
          <p className="mb-4 text-gray-300">
            If you have any questions or need assistance, please don’t hesitate to reach out to our team.
          </p>

          <ul className="text-left mb-8 text-gray-300 space-y-1">
            <li><strong>Support Email:</strong> monstitchclothing@gmail.com</li>
            <li><strong>Support Phone Number:</strong> +91 9499961707</li>
            <li><strong>Timing of Support:</strong> 9AM to 9PM</li>
          </ul>

          <p className="mb-6 text-gray-300">
            Our team is ready to provide you with the support you need. We look forward to assisting you!
          </p>

          <form className="space-y-4 text-black" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full px-4 py-2 rounded-full border border-gray-400 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email *"
                required
                className="w-full px-4 py-2 rounded-full border border-gray-400 focus:outline-none"
              />
            </div>

            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="w-full px-4 py-2 rounded-full border border-gray-400 focus:outline-none"
            />

            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Comment"
              rows={4}
              required
              className="w-full px-4 py-2 rounded-2xl border border-gray-400 focus:outline-none resize-none"
            ></textarea>

            <button
              type="submit"
              className="bg-white text-black px-8 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
