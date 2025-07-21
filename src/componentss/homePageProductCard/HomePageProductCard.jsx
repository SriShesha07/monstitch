import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // make sure you're importing from 'react-router-dom'
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import ProductModal from "../productModal/ProductModal";

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10 bg-black py-8">
      <div>
        <h1 className="text-center mb-8 text-3xl font-bold text-white tracking-wide">
          FEATURED COLLECTION
        </h1>
      </div>

      <section className="text-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getAllProduct.map((item, idx) => {
              const { id, name, price, ImageUrl2 } = item;

              return (
                <div
                  key={id || idx}
                  className="group overflow-hidden bg-black rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between"
                >
                
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      onClick={() => navigate(`/productinfo/${id}`)} // make sure to use _id if your route expects it
                      src={ImageUrl2 }
                      alt={name}
                      className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500 cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 pointer-events-none"></div>
                  </div>

                  <div className="flex flex-col flex-grow justify-between pt-4 px-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {name?.substring(0, 30)}
                    </h3>
                    <p className="text-md font-semibold text-white mb-4">
                      ₹{price}
                    </p>
                  </div>

                  {/* Optional modal button */}
                  {/* <button
                    onClick={() => setSelectedProduct(item)}
                    className="w-full py-3 border-t border-gray-700 text-white text-sm font-bold tracking-wider rounded-b-xl transition duration-300 hover:bg-white hover:text-black"
                  >
                    Choose Options
                  </button> */}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product modal */}
      <ProductModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </div>
  );
};

export default HomePageProductCard;
