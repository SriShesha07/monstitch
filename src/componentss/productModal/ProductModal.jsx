import React, { useEffect, useState } from "react";
import { Minus, Plus, Truck, BadgeCheck, Store } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";



const ProductModal = ({ isOpen, onClose, product }) => {
  
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

   const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  if (!isOpen || !product) return null;

  const sizes = ["XS","S", "M", "L", "XL"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
      onClick={onClose} // close when clicking the backdrop
    >
      <div
        className="bg-black text-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside modal
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Product Image */}
          <div className="md:w-1/2 bg-zinc-900 p-6 flex justify-center items-center rounded-l-2xl h-full">
            <img
              src={product.ImageUrl2 }
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Right: Product Info */}
          <div className="md:w-1/2 p-6 relative h-full">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-2xl hover:text-zinc-400"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-zinc-400 mb-4 text-lg">Rs. {product.price}</p>

            {/* Size selection */}
            <div className="mb-4">
              <p className="mb-2 text-sm">Size</p>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`w-10 h-10 rounded-full border ${
                      selectedSize === size
                        ? "bg-white text-black font-bold"
                        : "border-white text-white"
                    } hover:bg-white hover:text-black transition`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <p className="mb-2 text-sm">Quantity</p>
              <div className="flex items-center w-32 border rounded-full overflow-hidden">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="w-10 h-10 flex items-center justify-center bg-zinc-800"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 text-center font-medium">{quantity}</div>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-zinc-800"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button onClick={handleAddToCart} className="w-full py-3 rounded-full border border-white text-white hover:bg-white hover:text-black font-semibold transition">
                Add to cart
              </button>
              {/* <button className="w-full py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition">
                Buy it now
              </button> */}
            </div>

            {/* Icons section */}
            <div className="grid grid-cols-3 gap-4 text-xs text-center border-t border-zinc-800 pt-4">
              <div className="flex flex-col items-center gap-1">
                <Store size={18} />
                <span>Trusted Seller</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BadgeCheck size={18} />
                <span>Assured Quality</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck size={18} />
                <span>Free Shipping</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-zinc-400 hover:text-white transition underline cursor-pointer">
              View full details →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
