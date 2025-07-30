import { useDispatch, useSelector } from "react-redux";
import Layout from "../../componentss/layout/Layout";
import { Trash } from "lucide-react";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteCart = (item) => {
    dispatch(deleteFromCart({ id: item.id, size: item.size }));
    toast.success("Removed from cart");
  };

  const handleIncrement = (item) => {
    dispatch(incrementQuantity({ id: item.id, size: item.size }));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity({ id: item.id, size: item.size }));
  };

  const cartItemTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="bg-black text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Top Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your cart</h1>
            <Link
              to="/"
              className="text-sm text-gray-300 hover:text-white underline"
            >
              Continue shopping
            </Link>
          </div>

          {/* Table Headings */}
          {cartItems.length > 0 && (
            <div className="grid grid-cols-12 text-sm text-gray-400 font-semibold border-b border-gray-700 py-2 mb-4">
              <div className="col-span-6">PRODUCT</div>
              <div className="col-span-3 text-center">QUANTITY</div>
              <div className="col-span-3 text-right">TOTAL</div>
            </div>
          )}

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              Your cart is empty.{" "}
              <Link to="/" className="text-pink-500 underline">
                Shop now
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-4 items-center bg-zinc-900 p-4 rounded-xl mb-4 shadow-md"
                >
                  {/* Product Info */}
                  <div className="col-span-6 flex gap-4 items-center">
                    <img
                      src={item.ImageUrl2}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="font-semibold text-base">{item.name}</h2>
                      <p className="text-sm text-gray-400">
                        Rs. {Number(item.price).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400">
                        Size: {item.size || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-12 md:col-span-3 flex md:flex-row flex-col items-center justify-center gap-2">
                    <div className="flex items-center border border-gray-600 rounded-full overflow-hidden bg-zinc-800">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="px-3 py-1 text-lg"
                      >
                        −
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item)}
                        className="px-3 py-1 text-lg"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => deleteCart(item)}
                      className="md:ml-2"
                    >
                      <Trash className="text-red-500 w-4 h-4" />
                    </button>
                  </div>

                  {/* Total Price */}
                  <div className="col-span-3 text-right font-semibold text-lg">
                    ₹
                    {(Number(item.price).toFixed(2) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              {/* Summary */}
              <div className="bg-zinc-900 mt-10 p-6 rounded-xl shadow-lg">
                <div className="flex justify-between text-lg font-semibold mb-2">
                  <span>Estimated total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Taxes, discounts and shipping calculated at checkout
                </p>
                <button
                  onClick={() => navigate(`/checkout`)}
                  className="w-full bg-white text-black rounded-full py-2 font-semibold hover:bg-gray-200 transition"
                >
                  Check out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
