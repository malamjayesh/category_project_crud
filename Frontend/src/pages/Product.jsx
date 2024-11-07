import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products and categories when component mounts
    const fetchProductsAndCategories = async () => {
      try {
        const productRes = await axios.get(
          "http://localhost:5000/api/getproducts"
        );
        setProducts(productRes.data.products);
        setFilteredProducts(productRes.data.products);

        const categoryRes = await axios.get(
          "http://localhost:5000/api/getcategory"
        );
        setCategories(categoryRes.data.categories);
      } catch (error) {
        console.error("Error fetching products or categories", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.categoryId?.name === category)
      );
    }
  };

  const handleClick = () => {
    navigate("/addproduct");
  };

  const handleUpdate = (id) => {
    navigate(`/editproduct/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteproduct/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      setFilteredProducts(
        filteredProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="overflow-x-auto w-full mt-10">
      {/* Dropdown for selecting category */}
      <div className="mb-4 text-[20px]">
        <label htmlFor="category" className="mr-2">
          Filter by Category:
        </label>
        <select
          id="category"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleClick}
        className="float-right px-4 py-2 mb-10 text-black rounded-lg bg-green-500"
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.image}
                    className="h-16 w-16 object-cover rounded-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">{product.price}</td>
                <td className="border border-gray-300 p-2">
                  {product.description}
                </td>
                <td className="border border-gray-300 p-2">
                  {product.categoryId?.name || "No Category"}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleUpdate(product._id)}
                    className="text-blue-800 bg-slate-200 p-2 w-20 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="float-right text-red-600  bg-slate-200 p-2 w-20 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
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
