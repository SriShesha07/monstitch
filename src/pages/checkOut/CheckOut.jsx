import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CheckoutSummary from "../checkOut/CheckoutSummary";
import Layout from "../../componentss/layout/Layout";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
  });

  const cartItems = useSelector((state) => state.cart);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

   const loadScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

   const handlePayment = async () => {
    const res = await loadScript();
    if (!res) return alert("Razorpay SDK failed to load.");

    const amount = 500; // ₹5.00
    const receipt = `rcptid_${Math.random().toString(36).substr(2, 9)}`;

    const orderRes = await fetch("/api/createOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, receipt }),
    });

    const order = await orderRes.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "My Store",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
        // verify on backend
        const verifyRes = await fetch("/api/verifyPayment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const { valid } = await verifyRes.json();

        if (valid) {
          await addDoc(collection(db, "payments"), {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount,
            status: "success",
            createdAt: new Date(),
          });
          alert("Payment Successful");
        } else {
          alert("Payment Verification Failed");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-10">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* Contact */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 bg-[#121212] border border-gray-700 rounded mb-3"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Delivery */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Delivery</h2>
              <select className="w-full p-3 bg-[#121212] border border-gray-700 rounded mb-3">
                <option>India</option>
              </select>
              <div className="flex gap-4 mb-3">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-1/2 p-3 bg-[#121212] border border-gray-700 rounded"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-1/2 p-3 bg-[#121212] border border-gray-700 rounded"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 bg-[#121212] border border-gray-700 rounded mb-3"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc."
                className="w-full p-3 bg-[#121212] border border-gray-700 rounded mb-3"
                value={formData.apartment}
                onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
              />
              <div className="flex gap-4 mb-3">
                <input
                  type="text"
                  placeholder="City"
                  className="w-1/3 p-3 bg-[#121212] border border-gray-700 rounded"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="State"
                  className="w-1/3 p-3 bg-[#121212] border border-gray-700 rounded"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="PIN code"
                  className="w-1/3 p-3 bg-[#121212] border border-gray-700 rounded"
                  value={formData.pin}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                />
              </div>
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 bg-[#121212] border border-gray-700 rounded mb-3"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              <div className="space-y-4">
                <div className="bg-[#121212] border border-gray-700 rounded p-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" id="upi" className="accent-blue-500" defaultChecked />
                    <span>PhonePe / Razorpay Gateway</span>
                  </label>
                  <div className="mt-3 text-sm text-gray-400">
                    After clicking "Pay now", you’ll be redirected to Razorpay to complete payment.
                  </div>
                </div>
              </div>
            </div>

            {/* PAY NOW BUTTON */}
            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
            >
              Pay now
            </button>
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <div className="space-y-12">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
