import React, { useRef, useState, useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import myContext from "../../context/myContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { auth } from "../../firebase/FirebaseConfig";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Layout from "../../componentss/layout/Layout";

const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAllProduct } = useContext(myContext);
  const product = getAllProduct.find((p) => p.id === id);
  const allSizes = ["XS", "S", "M", "L", "XL"];

  // Check if product has available sizes
  const hasSizes = product?.sizes?.length > 0;

  const firstAvailableSize = useMemo(() => {
    if (!hasSizes) return null;
    return allSizes.find((size) => product?.sizes?.includes(size)) || null;
  }, [product, hasSizes]);

  const [selectedSize, setSelectedSize] = useState(firstAvailableSize);
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedSize(firstAvailableSize);
  }, [firstAvailableSize]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSizeChart(false);
      }
    }
    if (showSizeChart) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSizeChart]);

  const relatedProducts = useMemo(() => {
    return getAllProduct
      .filter((p) => p.id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [getAllProduct, id]);

  const handleAddToCart = () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please sign in to add items to cart.");
      navigate("/login");
      return;
    }

    if (!hasSizes) {
      toast.error("This item is out of stock.");
      return;
    }

    dispatch(addToCart({ ...product, size: selectedSize, quantity }));
    toast.success("Added to cart!");
  };

  useEffect(() => window.scrollTo(0, 0), []);

  if (!product) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="bg-black text-white p-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.Images?.map((img, i) => (
                <Zoom key={i}>
                  <div className="aspect-[3/4] relative group overflow-hidden rounded-xl border border-gray-700">
                    <img
                      src={img}
                      alt={`Product ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </Zoom>
              ))}
            </div>

            {/* Related Products */}
            <h2 className="text-xl font-semibold mt-4 text-white">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/productinfo/${item.id}`)}
                  className="bg-zinc-900 rounded-xl overflow-hidden border border-gray-700 cursor-pointer hover:scale-105 transition"
                >
                  <img
                    src={item.ImageUrl2}
                    alt={item.name}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm">Rs. {item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col space-y-6 h-full">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-400 text-lg mb-4">
                <span className="text-gray-400 line-through mr-2">Rs. 885</span>
                <span className="text-white">Rs. {product.price}</span>
              </p>

              {/* Size Selector */}
              <div className="mb-4">
                <h2 className="font-semibold mb-1">Size</h2>
                <div className="flex flex-wrap gap-3">
                  {allSizes.map((size) => {
                    const isAvailable = product?.sizes?.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`w-10 h-10 rounded-full border text-sm font-medium transition ${
                          selectedSize === size && isAvailable
                            ? "bg-white text-black"
                            : isAvailable
                            ? "border-white text-white hover:bg-white hover:text-black"
                            : "border-gray-500 text-gray-500 line-through cursor-not-allowed"
                        }`}
                        title={!isAvailable ? "Out of Stock" : ""}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h2 className="font-semibold mb-1">Quantity</h2>
                <div className="flex items-center w-32 border rounded-full overflow-hidden bg-zinc-900">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2"
                  >
                    <Minus />
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2"
                  >
                    <Plus />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!hasSizes}
                className={`w-full py-3 border rounded-full font-semibold transition ${
                  hasSizes
                    ? "border-white hover:bg-white hover:text-black"
                    : "border-gray-600 text-gray-500 cursor-not-allowed"
                }`}
              >
                {hasSizes ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* View Size Chart */}
              {hasSizes && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="font-semibold text-white underline hover:text-gray-300 transition"
                  >
                    View Size Chart
                  </button>
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="mt-6 space-y-8 text-white">
              <div>
                <h2 className="text-2xl font-bold mb-2">Description</h2>
                <p className="text-gray-300 leading-relaxed">
                  Introducing the <strong>MONSTITCH Acid Wash T-Shirt</strong> –
                  where comfort meets raw street style. Crafted from 100%
                  premium cotton, this T-shirt is soft, breathable, and built
                  for everyday wear.
                  <br />
                  <br />
                  The acid-wash finish gives each piece a unique,
                  vintage-inspired look. Pair it with jeans, cargos, or joggers
                  — it's a statement on its own.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Product Features</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>100% soft-washed cotton</li>
                  <li>Acid-wash finish for a vintage, worn-in look</li>
                  <li>Pre-shrunk for lasting shape</li>
                  <li>Classic crew neck</li>
                  <li>Unisex fit</li>
                  <li>Each piece is uniquely dyed – no two are the same</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Care Instructions</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Machine wash cold inside out</li>
                  <li>Do not bleach</li>
                  <li>Tumble dry low or hang dry</li>
                  <li>Use mild detergent</li>
                  <li>Turn T-shirt inside out to preserve color</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Size Chart Modal */}
        {showSizeChart && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
            <div
              ref={modalRef}
              className="bg-zinc-900 border border-gray-700 rounded-lg max-w-3xl w-full p-6 overflow-y-auto max-h-[80vh] relative"
            >
              <button
                onClick={() => setShowSizeChart(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl"
              >
                ✕
              </button>
              <h4 className="font-bold text-xl text-white mb-4">Size Chart</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-200 border border-gray-700 rounded-lg">
                  <thead className="bg-zinc-800">
                    <tr>
                      <th className="px-4 py-2">Size</th>
                      <th className="px-4 py-2">Chest (in)</th>
                      <th className="px-4 py-2">Length (in)</th>
                      <th className="px-4 py-2">Shoulder (in)</th>
                      <th className="px-4 py-2">Sleeve (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {[
                      {
                        size: "XS",
                        chest: 40,
                        length: 28,
                        shoulder: 21,
                        sleeve: 9,
                      },
                      {
                        size: "S",
                        chest: 42,
                        length: 28.5,
                        shoulder: 21.5,
                        sleeve: 9.5,
                      },
                      {
                        size: "M",
                        chest: 44,
                        length: 29,
                        shoulder: 22,
                        sleeve: 10,
                      },
                      {
                        size: "L",
                        chest: 44,
                        length: 29.5,
                        shoulder: 23,
                        sleeve: 10.25,
                      },
                      {
                        size: "XL",
                        chest: 46,
                        length: 30,
                        shoulder: 24,
                        sleeve: 10.5,
                      },
                    ].map((row) => (
                      <tr
                        key={row.size}
                        className="hover:bg-zinc-800 transition"
                      >
                        <td className="px-4 py-2">{row.size}</td>
                        <td className="px-4 py-2">{row.chest}</td>
                        <td className="px-4 py-2">{row.length}</td>
                        <td className="px-4 py-2">{row.shoulder}</td>
                        <td className="px-4 py-2">{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductInfo;
