import { useNavigate } from "react-router";
import Layout from "../../componentss/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import ProductModal from "../../componentss/productModal/ProductModal"; // adjust path as needed

const AllProduct = () => {
  const navigate = useNavigate();
  const { getAllProduct } = useContext(myContext);

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="py-8 bg-black text-white">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-center text-3xl font-bold tracking-wide">ALL PRODUCTS</h1>
        </div>

        {/* Product Grid */}
        <section>
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getAllProduct.map((item, idx) => {
                const { id, name, price, ImageUrl2, ImageUrl1 } = item;
                const inCart = cartItems.some((p) => p.id === id);

                return (
                  <div
                    key={idx}
                    className="group overflow-hidden bg-black border border-gray-700 rounded-xl shadow-lg flex flex-col justify-between"
                  >
                    {/* Image Section */}
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        src={ImageUrl2}
                        alt={name}
                        className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500 cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 pointer-events-none"></div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow justify-between pt-4 px-4">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {name.length > 30 ? name.substring(0, 27) + "..." : name}
                      </h3>
                      <p className="text-md font-semibold text-white mb-4">₹{price}</p>
                    </div>

                    {/* Button */}
                     {/* <button onClick={() => setSelectedProduct(item)} className="w-full py-3 border-t border-gray-700 text-white text-sm font-bold tracking-wider rounded-b-xl transition duration-300 hover:bg-white hover:text-black">
                    Choose Options
                  </button> */}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <ProductModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
      </div>
    </Layout>
  );
};

export default AllProduct;
