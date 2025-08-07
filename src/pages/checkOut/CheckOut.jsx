// 🧾 CheckoutPage.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth/cordova";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/cartSlice";
import Layout from "../../componentss/layout/Layout";
import CheckoutSummary from "../checkOut/CheckoutSummary";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const cartItems = useSelector((state) => state.cart);

  const [isLoading, setIsLoading] = useState(false);
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
  const [errors, setErrors] = useState({});

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (user?.email) handleChange("email", user.email);
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field) =>
    `w-full p-3 bg-[#121212] border rounded mb-1 ${
      errors[field] ? "border-red-500" : "border-gray-700"
    }`;

  const validateForm = () => {
    const requiredFields = [
      "email",
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "pin",
      "phone",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field[0].toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    const sdkLoaded = await loadScript();
    if (!sdkLoaded) {
      toast.error("Failed to load Razorpay SDK.");
      setIsLoading(false);
      return;
    }

    const amount = total + 20;
    const receipt = `rcptid_${Math.random().toString(36).substr(2, 9)}`;

    let order;
    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          receipt,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      order = await res.json();
    } catch (err) {
      toast.error("Unable to create order.");
      setIsLoading(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "MONSTITCH",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const verify = await fetch("/api/verifyPayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const { valid } = await verify.json();
          if (!valid) throw new Error("Invalid payment verification");

          await addDoc(collection(fireDB, "payments"), {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            status: "success",
            amount,
            createdAt: new Date(),
            uid: user?.uid,
            email: user?.email,
            name: user?.displayName,
            phone: formData.phone,
          });

          await addDoc(collection(fireDB, "orders"), {
            order_id: response.razorpay_order_id,
            uid: user?.uid,
            createdAt: new Date(),
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            apartment: formData.apartment,
            city: formData.city,
            state: formData.state,
            pin: formData.pin,
            phone: formData.phone,
            totalPaid: amount,
            cartItems: cartItems.map((item) => ({
              name: item.name,
              image: item.ImageUrl1,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
            })),
            status: "Ordered",
          });

          await sendConfirmationEmail({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            cartItems,
            amount,
            order_id: response.razorpay_order_id,
            address: formData.address,
            city: formData.city,
            apartment : formData.apartment,
            state: formData.state,
            pin: formData.pin,
            phone: formData.phone,
          });

          dispatch(clearCart());
          localStorage.removeItem("cart");
          toast.success("Order placed successfully!");
          navigate("/orderSummary", {
            state: {
              orderDetails: {
                order_id: response.razorpay_order_id,
                amount,
                createdAt: new Date(),
                uid: user?.uid,
                email: user?.email,
                name: user?.displayName,
                phone: formData.phone,
                customer: formData,
                cartItems,
                status: "success",
              },
            },
          });
        } catch (err) {
          toast.error("Payment failed. Try again.");
        } finally {
          setIsLoading(false);
        }
      },
      modal: {
        ondismiss: () => {
          toast("Payment popup closed.");
          setIsLoading(false);
        },
      },
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
        emi: false,
        paylater: false,
      },
      theme: {
        mode: "dark",
        color: "#121212",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const sendConfirmationEmail = async (orderDetails) => {
    const {
      email,
      firstName,
      lastName,
      cartItems,
      amount,
      order_id,
      address,
      city,
      state,
      pin,
      phone,
    } = orderDetails;

   const html = `
    <div style="background-color:#0d0d0d;padding:30px;font-family:sans-serif;color:#fff;">
      <div style="max-width:600px;margin:auto;background-color:#1a1a1a;padding:30px;border-radius:8px;border:1px solid #333;">
        <h2 style="color:#fff;margin-top:0;">Hi ${firstName} ${lastName},</h2>
        <p style="color:#ccc;">
          Thank you for shopping with <span style="color:orange;font-weight:bold;">Monstitch</span>! Your order has been placed successfully. Here are your order details:
        </p>

        <hr style="border:1px solid #333;margin:20px 0;">

        <p><strong>Order ID:</strong> ${order_id}</p>

        <h3 style="margin-bottom:10px;">Items Ordered:</h3>

        ${cartItems
          .map(
            (item) => `
          <div style="display:flex;align-items:center;margin-bottom:15px;border-bottom:1px solid #333;padding-bottom:10px;">
            <img src="${item.ImageUrl2}" alt="${item.name}" width="60" height="60" style="border-radius:4px;margin-right:15px;">
            <div style="flex:1;">
              <p style="margin:0;color:#fff;font-weight:600;">${item.name}</p>
              <p style="margin:0;font-size:14px;color:#aaa;">Size: ${item.size}</p>
              <p style="margin:0;font-size:14px;color:#aaa;">Qty: ${item.quantity}</p>
            </div>
            <div style="color:#fff;font-weight:500;">₹${item.price}</div>
          </div>
        `
          )
          .join("")}

        <hr style="border:1px solid #333;margin:20px 0;">

        <p><strong>Total Amount:</strong> ₹${(amount).toFixed(2)} (including ₹20 shipping)</p>

        <hr style="border:1px solid #333;margin:20px 0;">

        <h3>Shipping Address:</h3>
        <p style="color:#ccc;line-height:1.6;">
          ${address}<br />
          ${city}, ${state} - ${pin}<br />
          <strong>Phone:</strong> ${phone}
        </p>

        <hr style="border:1px solid #333;margin:20px 0;">

        <p style="color:#bbb;">Cheers,<br />
        <span style="color:orange;font-weight:bold;">– Monstitch Team</span></p>
      </div>
    </div>
  `;
    try {
      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email, subject: "Order Confirmation - MONSTITCH", html }),
      });
    } catch (error) {
      console.error("Email send failed:", error);
    }
  };

  return (
    <Layout>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      <div className="min-h-screen bg-black text-white font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-10">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <input
                type="email"
                placeholder="Email"
                className={inputClass("email") + " cursor-not-allowed"}
                value={formData.email}
                readOnly
                // onChange={(e) => handleChange("email", e.target.value)}
              />
              {/* {errors.email && (
                <p className="text-red-500 text-sm mb-3">{errors.email}</p>
              )} */}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Delivery</h2>
              <select className="w-full p-3 bg-[#121212] border border-gray-700 rounded mb-3">
                <option>India</option>
              </select>
              <div className="flex gap-4 mb-1">
                <input
                  type="text"
                  placeholder="First name"
                  className={`w-1/2 ${inputClass("firstName")}`}
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className={`w-1/2 ${inputClass("lastName")}`}
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm mb-1">{errors.firstName}</p>
              )}
              {errors.lastName && (
                <p className="text-red-500 text-sm mb-1">{errors.lastName}</p>
              )}

              <input
                type="text"
                placeholder="Address"
                className={inputClass("address")}
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mb-1">{errors.address}</p>
              )}

              <input
                type="text"
                placeholder="Apartment, suite, etc."
                className="w-full p-3 bg-[#121212] border border-gray-700 rounded mb-3"
                value={formData.apartment}
                onChange={(e) => handleChange("apartment", e.target.value)}
              />

              <div className="flex gap-4 mb-1">
                <input
                  type="text"
                  placeholder="City"
                  className={`w-1/3 ${inputClass("city")}`}
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="State"
                  className={`w-1/3 ${inputClass("state")}`}
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="PIN code"
                  className={`w-1/3 ${inputClass("pin")}`}
                  value={formData.pin}
                  onChange={(e) => handleChange("pin", e.target.value)}
                />
              </div>
              {errors.city && (
                <p className="text-red-500 text-sm mb-1">{errors.city}</p>
              )}
              {errors.state && (
                <p className="text-red-500 text-sm mb-1">{errors.state}</p>
              )}
              {errors.pin && (
                <p className="text-red-500 text-sm mb-1">{errors.pin}</p>
              )}

              <input
                type="text"
                placeholder="Phone"
                className={inputClass("phone")}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mb-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              <div className="space-y-4">
                <div className="bg-[#121212] border border-gray-700 rounded p-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      id="upi"
                      className="accent-blue-500"
                      defaultChecked
                    />
                    <span>Razorpay Gateway</span>
                  </label>
                  <div className="mt-3 text-sm text-gray-400">
                    After clicking "Pay now", you’ll be redirected to Razorpay
                    to complete payment.
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
            >
              Pay now
            </button>
          </div>

          <div className="space-y-12">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
