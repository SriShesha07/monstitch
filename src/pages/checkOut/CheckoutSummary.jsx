import React from "react";
import { useSelector } from "react-redux";

const CheckoutSummary = () => {
  const cartItems = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 20;
  const total = subtotal + shipping;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-black text-white p-6 rounded-lg w-full max-w-md">
      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 items-start relative">
            <div className="relative">
              <img
                src={item.ImageUrl2}
                alt={item.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-gray-400">Size: {item.size}</p>
            </div>
            <div className="text-sm font-medium whitespace-nowrap">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-6 border-t border-gray-700 pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal · {totalItems} items</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-white">₹{shipping.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 flex justify-between items-center text-lg font-bold">
        <span>Total</span>
        <span className="text-xl">
          INR ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default CheckoutSummary;
