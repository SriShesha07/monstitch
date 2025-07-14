// Contact.jsx
import React from 'react';
import Layout from '../../componentss/layout/Layout';

const ContactUs = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-black text-white px-4 py-10 font-sans">
      <div className="max-w-3xl mx-auto text-center">
        {/* <p className="text-sm font-semibold tracking-widest text-white mb-2">
          FREE COUNTRY WIDE SHIPPING
        </p> */}
        {/* <h1 className="text-4xl font-bold mb-8">MONSTITCH</h1> */}

        <h2 className="text-3xl font-bold mb-6">Got a question<span className="text-white">?</span></h2>

        <p className="text-lg font-semibold mb-2">Monstitch Team – We’re Here to Help!</p>
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

        <form className="space-y-4 text-black">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 rounded-full border border-gray-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email *"
              className="w-full px-4 py-2 rounded-full border border-gray-400 focus:outline-none"
            />
          </div>

          <input
            type="text"
            placeholder="Phone number"
            className="w-full px-4 py-2 rounded-full border border-gray-400 focus:outline-none"
          />

          <textarea
            placeholder="Comment"
            rows={4}
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
