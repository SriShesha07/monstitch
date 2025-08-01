import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import axios from "axios";
import toast from "react-hot-toast";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder } = context;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  const openModal = (order) => setSelectedOrder(order);
  const closeModal = () => setSelectedOrder(null);

  const markAsShipped = async (order) => {
    const { id, email, firstName, lastName, order_id, cartItems, totalPaid, address, city, state, pin, phone, apartment  } =
      order;

    try {
      setLoadingOrderId(id);

      const orderRef = doc(fireDB, "orders", id);
      await updateDoc(orderRef, { status: "Shipped" });

     const emailHTML = `
  <div style="background-color:#0d0d0d;padding:30px;font-family:sans-serif;color:#fff;">
    <div style="max-width:600px;margin:auto;background-color:#1a1a1a;padding:30px;border-radius:8px;border:1px solid #333;">
      <h2 style="color:#fff;margin-top:0;">Hi ${firstName} ${lastName},</h2>
      <p style="color:#ccc;">
        Great news! Your order from <span style="color:orange;font-weight:bold;">Monstitch</span> has been <strong style="color:#00FFAA;">shipped</strong> and is on its way to you. Here's what you ordered:
      </p>

      <hr style="border:1px solid #333;margin:20px 0;">

      <p><strong>Order ID:</strong> ${order_id}</p>

      <h3 style="margin-bottom:10px;">Items Shipped:</h3>

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

      <p><strong>Total Amount:</strong> ₹${(totalPaid).toFixed(2)} (including ₹20 shipping)</p>

      <hr style="border:1px solid #333;margin:20px 0;">

      <h3>Shipping Address:</h3>
      <p style="color:#ccc;line-height:1.6;">
        ${address}<br />
        ${city}, ${state} - ${pin}<br />
        <strong>Phone:</strong> ${phone}
      </p>

      <hr style="border:1px solid #333;margin:20px 0;">

      <p style="color:#bbb;">
        We hope you love your purchase! If you have any questions, feel free to reach out to us anytime.<br />
        <br />
        <span style="color:orange;font-weight:bold;">– Monstitch Team</span>
      </p>
    </div>
  </div>
`;

      await axios.post("/api/sendEmail", {
        to: email,
        subject: "Your Order Has Been Shipped! - Monstitch",
        html: emailHTML,
      });

      toast.success("Order marked as shipped and email sent.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to mark as shipped or send email.");
    } finally {
      setLoadingOrderId(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4">All Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-white text-white">
          <thead className="bg-slate-100 text-slate-700 font-bold">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Total Items</th>
              <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Items</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {getAllOrder.map((order, index) => {
              const totalAmount = order.cartItems.reduce(
                (acc, item) => acc + item.quantity * parseFloat(item.price),
                0
              );

              return (
                <tr key={order.order_id} className="text-white">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{order.order_id}</td>
                  <td className="px-4 py-2 border">{order.cartItems.length}</td>
                  <td className="px-4 py-2 border">₹{order.totalPaid}</td>
                  <td
                    className={`px-4 py-2 border font-semibold ${
                      order.status === "Shipped"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-2 border">
                    {order.firstName} {order.lastName}
                  </td>
                  <td className="px-4 py-2 border">{order.address}</td>
                  <td className="px-4 py-2 border">{order.phone}</td>
                  <td className="px-4 py-2 border">{order.email}</td>
                  <td className="px-4 py-2 border">
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleString()
                      : new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => openModal(order)}
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      View Items
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    {order.status !== "Shipped" ? (
                      <button
                        onClick={() => markAsShipped(order)}
                        className="bg-green-500 hover:bg-green-400 text-black font-semibold px-3 py-1 rounded disabled:opacity-50"
                        disabled={loadingOrderId === order.id}
                      >
                        {loadingOrderId === order.id
                          ? "Updating..."
                          : "Mark Shipped"}
                      </button>
                    ) : (
                      <span className="text-green-400">✔</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Simple Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 border border-gray-700"
            onClick={(e) => e.stopPropagation()} // This prevents close when clicking inside
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                🛒 Order Items - {selectedOrder.order_id}
              </h2>
              <button
                onClick={closeModal}
                className="text-red-400 hover:text-red-300 text-sm font-semibold"
              >
                ✖ Close
              </button>
            </div>

            <table className="w-full text-sm text-left text-white">
              <thead className="bg-gray-800 border-b border-gray-600">
                <tr>
                  <th className="px-4 py-3 border">#</th>
                  <th className="px-4 py-3 border">Product Name</th>
                  <th className="px-4 py-3 border">Size</th>
                  <th className="px-4 py-3 border">Price</th>
                  <th className="px-4 py-3 border">Qty</th>
                  <th className="px-4 py-3 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.cartItems.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="px-4 py-2 border">{idx + 1}</td>
                    <td className="px-4 py-2 border">
                      {item.name || "Unnamed"}
                    </td>
                    <td className="px-4 py-2 border">{item.size}</td>
                    <td className="px-4 py-2 border">₹{item.price}</td>
                    <td className="px-4 py-2 border">{item.quantity}</td>
                    <td className="px-4 py-2 border">
                      ₹{item.quantity * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
