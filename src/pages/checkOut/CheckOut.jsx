import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSummary from "../checkOut/CheckoutSummary";
import Layout from "../../componentss/layout/Layout";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth/cordova";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/cartSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true); // 🔵 Start loading
    const res = await loadScript();
    if (!res) {
      console.error("Razorpay SDK failed to load.");
      setIsLoading(false); // 🔴 Stop loading
      return;
    }

    const amount = total;
    const receipt = `rcptid_${Math.random().toString(36).substr(2, 9)}`;

    // const orderRes = await fetch("/api/createOrder", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount, receipt }),
    // });
  

     const orderRes = await fetch("/api/createOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: cartItems.map((item) => ({
          productId: item.productId, // Ensure `id` exists in cart
          quantity: item.quantity,
        })),
        receipt,
      }),
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
        // Show loading during verification
        setIsLoading(true);
        const verifyRes = await fetch("/api/verifyPayment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const { valid } = await verifyRes.json();

        if (valid) {
          await addDoc(collection(fireDB, "payments"), {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            status: "success",
            amount,
            createdAt: new Date(),
            uid: user?.uid || "",
            email: user?.email || "",
            name: user?.displayName || "",
            phone: formData.phone || "",
          });

          await addDoc(collection(fireDB, "orders"), {
            order_id: response.razorpay_order_id,
            uid: user?.uid || "",
            createdAt: new Date(),

            // Flattened customer fields
            email: formData.email || "",
            firstName: formData.firstName || "",
            lastName: formData.lastName || "",
            address: formData.address || "",
            apartment: formData.apartment || "",
            city: formData.city || "",
            state: formData.state || "",
            pin: formData.pin || "",
            phone: formData.phone || "",

            // Cart details
            cartItems: cartItems.map((item) => ({
              name: item.name || "",
              size: item.size || "",
              quantity: item.quantity,
              price: item.price,
              amount,
            })),
            status: "success",
          });
          // Send confirmation email
          const itemListHTML = cartItems
            .map(
              (item) =>
                `• ${item.name} (${item.size}) x${item.quantity} - ₹${
                  item.quantity * item.price
                }`
            )
            .join("<br/>");

          const emailHtml = `
  <div style="font-family: Arial, sans-serif; background-color: #111; color: #eee; padding: 20px;">
    <div style="max-width: 700px; width: 100%; margin: 0 auto; background-color: #111; padding: 30px; border-radius: 10px; border: 1px solid #333;">
      <h2 style="color: #ffffff;">Hi ${formData.firstName} ${
            formData.lastName
          },</h2>
      
      <p style="line-height: 1.6;">Thank you for shopping with <strong style="color: #ff4d00;">Monstitch</strong>! Your order has been placed successfully. Here are your order details:</p>

      <hr style="border-color: #444; margin: 20px 0;" />

      <p><strong style="color: #fff;">Order ID:</strong> ${
        response.razorpay_order_id
      }</p>

      <div style="margin-top: 15px;">
        <p style="margin-bottom: 6px;"><strong style="color: #fff;">Items Ordered:</strong></p>
        <table style="width: 100%; border-collapse: collapse;">
          ${cartItems
            .map(
              (item) => `
              <tr style="border-bottom: 1px solid #444;">
                <td style="padding: 10px 0;">
                  <img src="${item.ImageUrl1}" alt="${
                item.name
              }" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px; border: 1px solid #555;" />
                </td>
                <td style="padding: 10px; vertical-align: top;">
                  <div style="color: #fff; font-weight: bold;">${
                    item.name
                  }</div>
                  <div style="color: #aaa;">Size: ${item.size}</div>
                  <div style="color: #aaa;">Qty: ${item.quantity}</div>
                </td>
                <td style="padding: 10px; vertical-align: top; text-align: right; color: #fff;">
                  ₹${item.price * item.quantity}
                </td>
              </tr>`
            )
            .join("")}
        </table>
      </div>

      <p style="margin-top: 20px;"><strong style="color: #fff;">Total Amount:</strong> ₹${total}</p>

      <hr style="border-color: #444; margin: 20px 0;" />

      <div style="margin-top: 20px;">
        <p style="margin-bottom: 6px;"><strong style="color: #fff;">Shipping Address:</strong></p>
        <p style="color: #ccc; line-height: 1.6;">
          ${formData.address}<br/>
          ${formData.city}, ${formData.state} - ${formData.pin}<br/>
         
          <strong>Phone:</strong> ${formData.phone}
        </p>
      </div>

      <hr style="border-color: #444; margin: 20px 0;" />

      <p style="margin-top: 30px;">Cheers,<br/><strong style="color: #ff4d00;">– Monstitch Team</strong></p>
    </div>
  </div>
`;

          try {
            const res = await fetch("/api/sendEmail", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: formData.email,
                subject: `Order Confirmation - ${response.razorpay_order_id}`,
                html: emailHtml,
              }),
            });

            const data = await res.json();

            if (res.ok) {
              console.log("✅ Email sent successfully:", data);
            } else {
              console.error(
                "❌ Email failed to send:",
                data.error || data.message
              );
            }
          } catch (err) {
            console.error(
              "❌ Network or server error while sending email:",
              err
            );
          }

          // setIsLoading(false); // ✅ Done loading after everything

          dispatch(clearCart());
          localStorage.removeItem("cart"); // clear local storage
          toast.success(`Order placed successfully!`);
          setIsLoading(false); // ✅ Stop loader before navigation
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
        } else {
          setIsLoading(false);
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
