import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Minus, Plus, Truck, BadgeCheck, Store } from "lucide-react";
import myContext from "../../context/myContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import Layout from "../../componentss/layout/Layout";
import { auth } from "../../firebase/FirebaseConfig";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAllProduct } = useContext(myContext);
  const product = getAllProduct.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please sign in to add items to cart.");
      navigate("/login"); // or show a login modal
      return;
    }
    dispatch(addToCart({ ...product, size: selectedSize ,quantity }));
    toast.success("Added to cart!");
    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };

  useEffect(() => window.scrollTo(0, 0), []);

  if (!product) return <p>Loading...</p>;

 return (
 <Layout>
  <div className="bg-black text-white p-4">
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Image 1 */}
      <div className="w-full h-full">
        <Zoom>
          <div className="aspect-[3/4] h-full relative group overflow-hidden rounded-xl border border-gray-700">
            <img
              src={product.ImageUrl1}
              alt="Product Front"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </Zoom>
      </div>

      {/* Image 2 */}
      <div className="w-full">
        <Zoom>
          <div className="aspect-[3/4] h-full relative group overflow-hidden rounded-xl border border-gray-700">
            <img
              src={product.ImageUrl2}
              alt="Product Back"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </Zoom>
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between space-y-6 h-full">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-400 text-lg mb-4">Rs. {product.price}</p>

          {/* Size Selector */}
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Size</h2>
            <div className="flex gap-3">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-full border ${
                    selectedSize === size
                      ? "bg-white text-black"
                      : "border-white text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Quantity</h2>
            <div className="flex items-center w-32 border rounded-full overflow-hidden bg-zinc-900">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2"
              >
                —
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 border border-white rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              Add to Cart
            </button>
          </div>

          {/* Badges */}
          {/* <div className="grid grid-cols-3 gap-4 text-center text-sm mb-6">
            <div>
              <Store className="mx-auto mb-1" />
              <span>Trusted Seller</span>
            </div>
            <div>
              <BadgeCheck className="mx-auto mb-1" />
              <span>Assured Quality</span>
            </div>
            <div>
              <Truck className="mx-auto mb-1" />
              <span>Free Shipping</span>
            </div>
          </div> */}
<br/>
          {/* Size Chart Table */}
         <div className="space-y-4">
  <h4 className="font-semibold text-2xl text-white">Size Chart</h4>
  <div className="overflow-x-auto rounded-lg shadow-md border border-gray-700">
    <table className="w-full text-sm text-left text-gray-200">
      <thead className="bg-zinc-900 text-gray-100">
        <tr>
          <th className="px-4 py-3 border-b border-gray-700">Size</th>
          <th className="px-4 py-3 border-b border-gray-700">Chest (in)</th>
          <th className="px-4 py-3 border-b border-gray-700">Length (in)</th>
           <th className="px-4 py-3 border-b border-gray-700">Shoulder (in)</th>
          <th className="px-4 py-3 border-b border-gray-700">Sleeve (in)</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {[
          { size: 'XS', chest: 40, length: 28 , shoulder: 21, sleeve: 9 },
          { size: 'S', chest: 42, length: 28.5 , shoulder: 21.5, sleeve: 9.5},
          { size: 'M', chest: 44, length: 29 , shoulder: 22, sleeve: 10},
          { size: 'L', chest: 44, length: 29.5, shoulder: 23, sleeve: 10.25 },
          { size: 'XL', chest: 46, length: 30 , shoulder: 24, sleeve: 10.5},
        ].map((row) => (
          <tr key={row.size} className="hover:bg-zinc-800 transition">
            <td className="px-6 py-3">{row.size}</td>
            <td className="px-6 py-3">{row.chest}</td>
            <td className="px-6 py-3">{row.length}</td>
            <td className="px-6 py-3">{row.shoulder}</td>
            <td className="px-6 py-3">{row.sleeve}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        </div>
      </div>
    </div>
  </div>
</Layout>

);

};

export default ProductInfo;
