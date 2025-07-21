import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../../componentss/loader/Loader";

const ProductDetail = () => {
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;
  const navigate = useNavigate();

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-white text-sm text-white">
            <thead>
              <tr className="bg-black">
                <th className="px-2 py-2 border border-white">S.No.</th>
                <th className="px-2 py-2 border border-white">Image</th>
                <th className="px-2 py-2 border border-white">Title</th>
                <th className="px-2 py-2 border border-white">Price</th>
                <th className="px-2 py-2 border border-white">Category</th>
                <th className="px-2 py-2 border border-white">Date</th>
                <th className="px-2 py-2 border border-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {getAllProduct.map((item, index) => {
                const {
                  id,
                  title,
                  price,
                  category,
                  date,
                  productImageUrl,
                } = item;

                return (
                  <tr key={id} className="bg-black text-center">
                    <td className="px-2 py-2 border border-white">{index + 1}</td>
                    <td className="px-2 py-2 border border-white">
                      <img
                        src={productImageUrl}
                        alt="product"
                        className="w-12 h-12 object-cover mx-auto"
                      />
                    </td>
                    <td className="px-2 py-2 border border-white">{title}</td>
                    <td className="px-2 py-2 border border-white">₹{price}</td>
                    <td className="px-2 py-2 border border-white capitalize">{category}</td>
                    <td className="px-2 py-2 border border-white">
                      {date ? new Date(date).toLocaleDateString() : "Invalid Date"}
                    </td>
                    <td className="px-2 py-2 border border-white">
                      <button
                        onClick={() => navigate(`/update-product/${id}`)}
                        className="text-blue-400 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
