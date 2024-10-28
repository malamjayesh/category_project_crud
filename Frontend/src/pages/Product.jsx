import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getproducts");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);
  const handleClick = () => {
    navigate("/addproduct");
  };
  return (
    <div className="overflow-x-auto w-full mt-10">
      <button
        onClick={() => handleClick()}
        className=" float-right px-4 py-2 mb-10 text-black rounded-lg bg-green-500"
      >
        Add Product
      </button>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.image}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="border border-gray-300 p-2">{product.price}</td>
                <td className="border border-gray-300 p-2">
                  {product.description}
                </td>
                <td className="border border-gray-300 p-2">
                  {product.categoryId?.name || "No Category"}
                </td>
                <td className="border border-gray-300 p-2 ">
                  <button className="text-blue-800 underline">Edit</button>
                  <button className="float-right text-red-600 underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="border border-gray-300 p-2 text-center"
              >
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
