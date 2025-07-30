import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { doc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const AllProducts = () => {
  const { getAllProduct, getAllProductFunction } = useContext(myContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editSizes, setEditSizes] = useState([]);

  const sizeOrder = ["XS", "S", "M", "L", "XL"];

  const openModal = (product) => {
    setSelectedProduct(product);
    setEditPrice(product.price);
    setEditSizes(product.sizes || []);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setEditPrice("");
    setEditSizes([]);
  };

  const handleSizeToggle = (size) => {
    if (editSizes.includes(size)) {
      setEditSizes(editSizes.filter((s) => s !== size));
    } else {
      setEditSizes([...editSizes, size]);
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;
    try {
      const productRef = doc(fireDB, "products", selectedProduct.id);
      const sortedSizes = sizeOrder.filter((size) => editSizes.includes(size));
      await setDoc(productRef, {
        ...selectedProduct,
        price: editPrice,
        sizes: sortedSizes,
      });

      toast.success("Product updated successfully");

      if (typeof getAllProductFunction === "function") {
        await getAllProductFunction();
      }

      closeModal();
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update product");
    }
  };

  const sortedProducts = [...getAllProduct].sort((a, b) =>
    a.productId?.localeCompare(b.productId)
  );

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-white text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-2 py-2 border border-white">S.No</th>
              <th className="px-2 py-2 border border-white">Product Name</th>
              <th className="px-2 py-2 border border-white">Price (₹)</th>
              <th className="px-2 py-2 border border-white">Available Sizes</th>
              <th className="px-2 py-2 border border-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={product.id} className="bg-black text-center">
                <td className="px-2 py-2 border border-white">{index + 1}</td>
                <td className="px-2 py-2 border border-white">{product.name}</td>
                <td className="px-2 py-2 border border-white">₹{product.price}</td>
                <td className="px-2 py-2 border border-white">
                  {sizeOrder
                    .filter((size) => product.sizes?.includes(size))
                    .join(", ") || "N/A"}
                </td>
                <td className="px-2 py-2 border border-white">
                  <button
                    onClick={() => openModal(product)}
                    className="bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded text-white text-xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 w-[90%] max-w-md border border-gray-700">
            <h2 className="text-lg font-bold mb-4">
              Edit Product - {selectedProduct.name}
            </h2>

            <label className="block mb-2 text-sm">Price (₹)</label>
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              className="w-full p-2 rounded bg-black text-white border border-gray-600 mb-4"
            />

            <label className="block mb-2 text-sm">Available Sizes</label>
            <div className="flex gap-4 flex-wrap mb-4">
              {sizeOrder.map((size) => (
                <label key={size} className="text-sm">
                  <input
                    type="checkbox"
                    checked={editSizes.includes(size)}
                    onChange={() => handleSizeToggle(size)}
                    className="mr-1"
                  />
                  {size}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded text-white text-sm"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
