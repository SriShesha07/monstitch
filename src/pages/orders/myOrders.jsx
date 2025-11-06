import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../../componentss/layout/Layout";

const OrdersPerPage = 5;

const MyOrders = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (user) {
      const fullName = user.displayName || "";
      const [firstName, ...rest] = fullName.split(" ");
      const lastName = rest.join(" ");
      setUserInfo({
        email: user.email || "",
        firstName: firstName || "",
        lastName: lastName || "",
      });
    }
  }, [user]);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(fireDB, "products"));
    const productMap = {};
    snapshot.forEach((doc) => {
      productMap[doc.data().name] = doc.data().ImageUrl1 || "";
    });
    setProducts(productMap);
  };

  const fetchOrders = async () => {
    if (!user) return;

    const q = query(
      collection(fireDB, "orders"),
      where("email", "==", user.email),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const fetchedOrders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(fetchedOrders);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [user]);

  const indexOfLastOrder = currentPage * OrdersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - OrdersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / OrdersPerPage);
  const changePage = (page) => setCurrentPage(page);

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>

        <div className="bg-zinc-900 border border-gray-700 rounded-lg p-5 mb-6 shadow">
          <h2 className="font-semibold text-lg mb-2">Account Info</h2>
          <p className="text-sm">
            <span className="font-semibold text-white">Name:</span>{" "}
            {userInfo.firstName} {userInfo.lastName}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-white">Email:</span>{" "}
            {userInfo.email}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center text-lg text-gray-400 mt-10">
            <p className="mb-4">
              It looks like you haven't placed any orders yet. Start exploring
              our collection and treat yourself to something amazing!
            </p>
          </div>
        ) : (
          currentOrders.map((order) => {
            const shippingCharge = 50;
            const subtotal = order.cartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            );
            const totalPaid = subtotal + shippingCharge;

            return (
              <div
                key={order.id}
                className="border border-white rounded-lg p-5 mb-6 shadow-md"
              >
                <h2 className="font-semibold text-lg mb-2">
                  Order ID: {order.order_id}
                </h2>
                <p className="text-sm mb-1">
                  Status: <span className="font-semibold">{order.status}</span>
                </p>
                <p className="text-sm mb-1">
                  Ordered On:{" "}
                  {new Date(order.createdAt.toDate()).toLocaleString()}
                </p>
                <p className="text-sm">
                  Subtotal: <span className="font-semibold">₹{subtotal}</span>
                </p>
                <p className="text-sm">
                  Shipping: <span className="font-semibold">₹{shippingCharge}</span>
                </p>
                <p className="text-sm mb-2">
                  Total Paid: <span className="font-bold text-green-400">₹{order.totalPaid}</span>
                </p>

                <div className="mt-4 text-sm text-gray-300 space-y-1">
                  <p>
                    <span className="font-semibold text-white">Name:</span>{" "}
                    {order.firstName} {order.lastName}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Phone:</span>{" "}
                    {order.phone}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Email:</span>{" "}
                    {order.email}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Address:</span>{" "}
                    {order.apartment ? `${order.apartment}, ` : ""}
                    {order.address}, {order.city}, {order.state} - {order.pin}
                  </p>
                </div>

                {/* Ordered Items */}
                <div className="grid md:grid-cols-2 gap-4 mt-5">
                  {order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 border border-gray-700 p-3 rounded-lg"
                    >
                      <img
                        src={
                          products[item.name] ||
                          "https://via.placeholder.com/80"
                        }
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm">Size: {item.size}</p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                        <p className="text-sm">Price: ₹{item.price}</p>
                        <p className="text-sm">
                          Subtotal: ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => changePage(num + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === num + 1
                    ? "bg-white text-black font-bold"
                    : "bg-gray-700"
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOrders;
