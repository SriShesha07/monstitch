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

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("/api/createOrder", {
        amount: total * 100,
        currency: "INR",
      });

      const { order } = data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Monstitch Store",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await axios.post("/api/verifyPayment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            formData,
            cartItems,
            total,
          });

          if (verifyRes.data.success) {
            alert("✅ Payment successful!");
            // Redirect or clear cart, etc.
          } else {
            alert("❌ Payment verification failed.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong during payment.");
    }
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
