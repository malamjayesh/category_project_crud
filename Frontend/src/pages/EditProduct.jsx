import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams(); // Retrieve the id from the URL
  const navigate = useNavigate();

  // State to hold product details
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch product details and categories
    const fetchData = async () => {
      try {
        const productRes = await axios.get(
          `http://localhost:5000/api/getsingleproduct/${id}` // Use the retrieved ID
        );
        const categoryRes = await axios.get(
          "http://localhost:5000/api/getcategory"
        );

        // Set product and category data
        setProduct({
          ...productRes.data.product,
          categoryId: productRes.data.product.categoryId._id,
        });
        setCategories(categoryRes.data.categories);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchData();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("categoryId", product.categoryId);
    if (product.image) formData.append("image", product.image);

    try {
      await axios.put(
        `http://localhost:5000/api/updateproduct/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      navigate(`/product`);
    } catch (error) {
      console.error("Error updating product", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-5">Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <label className="block mb-2">Price</label>
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <label className="block mb-2">Category</label>
        <select
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full mb-4"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
