import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../componentss/layout/Layout";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails) {
    return (
      <Layout>
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>
          <h2 className="text-xl font-semibold mb-4">No order found.</h2>
          <button
            className="bg-white text-black px-4 py-2 rounded-full font-semibold"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
      </Layout>
    );
  }

  const {
    order_id,
    payment_id,
    amount,
    status,
    createdAt,
    firebaseUser,
    customer,
    cartItems,
  } = orderDetails;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
  <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
    ✅ Thank you for your order!
  </h1>
  <p className="text-center text-gray-400 mb-10">
    We've received your order and sent a confirmation to{" "}
    <span className="text-white font-medium">{customer.email}</span>.
  </p>

  {/* Side-by-side Order and Customer Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    {/* Order Info */}
    <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Information</h2>
      <div className="space-y-2 text-gray-300">
        <p><span className="text-white">Order ID:</span> {order_id}</p>
        {/* <p><span className="text-white">Status:</span> {status}</p> */}
        <p><span className="text-white">Paid Amount:</span> ₹{amount}</p>
        <p><span className="text-white">Date:</span> {new Date(createdAt).toLocaleString()}</p>
      </div>
    </div>

    {/* Customer Info */}
    <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
      <div className="space-y-2 text-gray-300">
        <p><span className="text-white">Name:</span> {customer.firstName} {customer.lastName}</p>
        <p><span className="text-white">Email:</span> {customer.email}</p>
        <p><span className="text-white">Phone:</span> {customer.phone}</p>
        <p>
  <span className="text-white">Address:</span>{" "}
  {customer.address}
  {customer.apartment ? `, ${customer.apartment}` : ""}
  , {customer.city}, {customer.state} - {customer.pin}
</p>
      </div>
    </div>
  </div>

  {/* Cart Items */}
  <div className="bg-zinc-900 p-6 rounded-xl shadow-md mb-10">
    <h2 className="text-xl font-semibold mb-4">Order Items</h2>
    <div className="space-y-4">
      {cartItems?.map((item, index) => (
        <div key={index} className="flex items-center gap-4 border-b border-gray-700 pb-4">
          <img
            src={item.ImageUrl1}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg border border-gray-600"
          />
          <div>
            <p className="text-white font-medium">{item.name}</p>
            <p className="text-gray-400">Size: {item.size}</p>
            <p className="text-gray-400">Quantity: {item.quantity}</p>
            <p className="text-gray-400">Price: ₹{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Back to home */}
  <div className="text-center">
    <button
      onClick={() => navigate("/")}
      className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
    >
      Continue Shopping
    </button>
  </div>
</div>

    </Layout>
  );
};

export default OrderSummary;
