import { useContext, useState } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder, deleteProduct } = context;

  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => setSelectedOrder(order);
  const closeModal = () => setSelectedOrder(null);

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
                  <td className="px-4 py-2 border">₹{totalAmount}</td>
                  <td className="px-4 py-2 border text-green-500">{order.status}</td>
                  <td className="px-4 py-2 border">
                    {order.firstName} {order.lastName}
                  </td>
                  <td className="px-4 py-2 border">{order.address}</td>
                  <td className="px-4 py-2 border">{order.phone}</td>
                  <td className="px-4 py-2 border">{order.email}</td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => openModal(order)}
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      View Items
                    </button>
                  </td>
                  <td
                    className="px-4 py-2 border text-red-500 cursor-pointer"
                    onClick={() => deleteProduct(order.order_id)}
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for order items */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 border border-gray-700">
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
                    <td className="px-4 py-2 border">{item.name || "Unnamed"}</td>
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
