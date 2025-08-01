import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import ProductModal from "../productModal/ProductModal";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [signedUrls, setSignedUrls] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchSignedUrls = async () => {
      const urls = {};
      for (const product of getAllProduct) {
        const publicId = extractPublicId(product.ImageUrl2);
        try {
          const res = await fetch("/api/getSignedImageUrl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId }),
          });
          const data = await res.json();
          urls[product.id] = data.url;
        } catch (err) {
          console.error("Failed to fetch signed URL:", err);
        }
      }
      setSignedUrls(urls);
    };

    if (getAllProduct.length > 0) fetchSignedUrls();
  }, [getAllProduct]);

  const extractPublicId = (url) => {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    return parts[1].replace(/\.[^/.]+$/, ""); // remove extension
  };

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
            {[...getAllProduct]
              .sort((a, b) => parseInt(a.productId) - parseInt(b.productId))
              .map((item, idx) => {
                const { id, name, price } = item;
                const imageUrl = signedUrls[id];

                return (
                  <div
                    key={id || idx}
                    className="group overflow-hidden bg-black rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between"
                  >
                    <div className="relative overflow-hidden rounded-t-xl">
                      {imageUrl ? (
                        <img
                          onClick={() => navigate(`/productinfo/${id}`)}
                          src={imageUrl}
                          alt={name}
                          className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500 cursor-pointer"
                        />
                      ) : (
                        <div className="w-full h-80 bg-gray-800 animate-pulse"></div>
                      )}
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
  );
};

export default HomePageProductCard;
