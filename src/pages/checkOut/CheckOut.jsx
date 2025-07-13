import React, { useState } from "react";
import { useSelector } from "react-redux";
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
            {/* <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="accent-blue-500" />
              <span>Email me with news and offers</span>
            </label> */}
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
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 p-3 bg-[#121212] border border-gray-700 rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 bg-[#121212] border border-gray-700 rounded mb-3"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc."
              className="w-full p-3 bg-[#121212] border border-gray-700 rounded mb-3"
            />
            <div className="flex gap-4 mb-3">
              <input
                type="text"
                placeholder="City"
                className="w-1/3 p-3 bg-[#121212] border border-gray-700 rounded"
              />
              <input
                type="text"
                placeholder="State"
                className="w-1/3 p-3 bg-[#121212] border border-gray-700 rounded"
              />
              <input
                type="text"
                placeholder="PIN code"
                className="w-1/3 p-3 bg-[#121212] border border-gray-700 rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-3 bg-[#121212] border border-gray-700 rounded mb-3"
            />
            {/* <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="accent-blue-500" />
              <span>Save this information for next time</span>
            </label> */}
          </div>

          {/* Shipping Method */}
          {/* <div>
            <h2 className="text-xl font-semibold mb-4">Shipping method</h2>
            <div className="w-full flex justify-between items-center bg-[#121212] border border-gray-700 rounded p-3">
              <span>Standard</span>
              <span>FREE</span>
            </div>
          </div> */}

          {/* Payment */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="space-y-4">
              <div className="bg-[#121212] border border-gray-700 rounded p-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payment" id="upi" className="accent-blue-500"  defaultChecked/>
                  <span>PhonePe Payment Gateway (UPI, Cards & NetBanking)</span>
                </label>
                <div className="mt-3 text-sm text-gray-400">
                  After clicking "Pay now", you will be redirected to PhonePe to complete your
                  purchase securely.
                </div>
              </div>
              <div className="bg-[#121212] border border-gray-700 rounded p-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payment" id="cod" className="accent-blue-500" />
                  <span>Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          {/* <div>
            <h2 className="text-xl font-semibold mb-4">Billing address</h2>
            <div className="space-y-2 text-sm">
              <label className="flex items-center space-x-2">
                <input type="radio" name="billing" className="accent-blue-500" />
                <span>Same as shipping address</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="billing" className="accent-blue-500" />
                <span>Use a different billing address</span>
              </label>
            </div>
          </div> */}

          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded">
            Pay now
          </button>
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className="space-y-12" >
        <CheckoutSummary />
      </div >
        {/* <div className="bg-[#121212] p-6 rounded-lg border border-gray-700 space-y-6">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-800 rounded"> <img
                      src={item.productImageUrl}
                      alt={item.title}
                     
                    /></div>
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full px-2">
                  {item.quantity}
                </span>
              </div>
              <div>
                <h4 className="text-white font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-400">Size: {item.size}</p>
              </div>
              <div className="ml-auto font-semibold text-white">₹{item.price}</div>
            </div>
          ))}

          <div className="flex justify-between text-sm border-t border-gray-600 pt-4">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-gray-600 pt-4">
            <span>Total</span>
            <span>INR ₹{total}</span>
          </div>
        </div> */}
      </div>
    </div>
    </Layout>
  );
};

export default CheckoutPage;
