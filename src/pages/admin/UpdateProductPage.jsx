import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../componentss/loader/Loader";
import Layout from "../../componentss/layout/Layout";

const sizesList = ["XS", "S", "M", "L", "XL"];

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    sizes: [],
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productDoc = await getDoc(doc(fireDB, "products", id));
      const data = productDoc.data();

      setProduct({
        title: data?.title || "",
        price: data?.price || "",
        sizes: data?.sizes || [],
        time: data?.time,
        date: data?.date,
      });

      setLoading(false);
    } catch (error) {
      console.error("Failed to load product:", error);
      setLoading(false);
    }
  };

  const handleSizeChange = (size) => {
    const updatedSizes = product.sizes.includes(size)
      ? product.sizes.filter((s) => s !== size)
      : [...product.sizes, size];
    setProduct({ ...product, sizes: updatedSizes });
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product, { merge: true });
      toast.success("Product updated successfully");
      getAllProductFunction();
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Update failed:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[80vh] text-white">
        {loading ? (
          <Loader />
        ) : (
          <div className="bg-black border border-gray-700 px-8 py-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-center text-2xl font-bold text-pink-400 mb-6">
              Update Product: <span className="text-white">{product.title}</span>
            </h2>

            {/* Price Input */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-300">
                Price (₹)
              </label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 outline-none"
                placeholder="Enter price"
              />
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-4">
                {sizesList.map((size) => (
                  <label key={size} className="flex items-center gap-2 text-gray-300">
                    <input
                      type="checkbox"
                      checked={product.sizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      className="accent-pink-500 w-4 h-4"
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Update Button */}
            <button
              onClick={updateProduct}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 font-semibold rounded-md transition"
            >
              Update Product
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UpdateProductPage;
