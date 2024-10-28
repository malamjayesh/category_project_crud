import React, { useEffect, useState } from "react";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getcategory");
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("categoryId", categoryId);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/addproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setName("");
      setImage(null);
      setPrice("");
      setDescription("");
      setCategoryId("");
    } catch (error) {
      console.error("Error adding product", error);
    }
  };
  return (
    <div className="flex justify-center items-center mt-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Product Name"
          className="border border-gray-300 rounded-md p-2 text-lg w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="border border-gray-300 rounded-md p-2 text-lg w-full mb-4"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="border border-gray-300 rounded-md p-2 text-lg w-full mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="border border-gray-300 rounded-md p-2 text-lg w-full mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          className="border border-gray-300 rounded-md p-2 text-lg w-full mb-4"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose a category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
