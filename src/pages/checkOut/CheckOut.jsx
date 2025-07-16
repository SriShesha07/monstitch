import React, { useState } from "react";
import { useSelector } from "react-redux";
import CheckoutSummary from "../checkOut/CheckoutSummary";
import Layout from "../../componentss/layout/Layout";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth/cordova";
import { useEffect } from "react";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

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

  const cartItems = useSelector((state) => state.cart);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const user = auth.currentUser;
    if (user?.email) {
      handleChange("email", user.email);
    }
  }, []);

  const loadScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const validateForm = () => {
    const newErrors = {};
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

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${
          field[0].toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    const res = await loadScript();
    if (!res) {
      console.error("Razorpay SDK failed to load.");
      return;
    }

    const amount = total;
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
      name: "MONSTITCH",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
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
            firebaseUser: {
              uid: user?.uid || "",
              email: user?.email || "",
              displayName: user?.displayName || "",
            },
            customer: {
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              apartment: formData.apartment,
              city: formData.city,
              state: formData.state,
              pin: formData.pin,
              phone: formData.phone,
            },
            cartItems: cartItems.map((item) => ({
              name: item.name,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
            })),
          });
          // Send confirmation email
          await fetch("/api/sendConfirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: formData.email,
              name: `${formData.firstName} ${formData.lastName}`,
              orderId: response.razorpay_order_id,
              items: cartItems.map((item) => ({
                name: item.name,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
              })),
              total,
            }),
          });

          localStorage.removeItem("cart"); // clear local storage
          navigate("/orderSummary");
        } else {
          navigate("/checkout");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field) =>
    `w-full p-3 bg-[#121212] border rounded mb-1 ${
      errors[field] ? "border-red-500" : "border-gray-700"
    }`;

  return (
    <Layout>
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
