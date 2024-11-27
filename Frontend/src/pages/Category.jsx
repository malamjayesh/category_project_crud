import React, { useEffect, useState } from "react";
import axios from "axios";
function Category() {
  const [input, setInput] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getcategory");
        // console.log("Fetched categories:", res.data);
        setCategories(res.data.categories);
      } catch (error) {
        console.log("Error fetching categories:", error.message);
      }
    };
    fetchData();
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Please enter a category name");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/addcategory", {
        name: input,
        categoryId: selectedCategoryId || null,
      });
      console.log("Response after adding category:", res.data);
      if (res.status === 201 && res.data.newCategory) {
        setCategories((prevCategories) => [
          ...prevCategories,
          res.data.newCategory,
        ]);
        setInput("");
        setSelectedCategoryId("");
      } else {
        console.log("Unexpected response structure:", res.data);
      }
    } catch (error) {
      console.log("Error adding category:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletecategory/${id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
    } catch (error) {
      console.log("Error deleting category:", error.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the category name"
            className="top-10 border border-gray-300 rounded-md p-2 text-lg w-full focus:border-blue-500 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md p-2 text-lg mb-4 w-full"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="" disabled>
              Choose a parent category (optional)
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 w-full mt-10 hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="container mx-auto p-5 mt-10">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-center">
                Category
              </th>
              <th className="border border-gray-300 p-2 text-center">Name</th>
              <th
                className="border border-gray-300 p-2 text-center w-32"
                style={{ minWidth: "200px" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b border-gray-300">
                <td className="border border-gray-300 p-2">
                  {category.categoryId
                    ? category.categoryId.name
                    : "No parent category"}
                </td>
                <td className="border border-gray-300 p-2">{category.name}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="text-blue-600 bg-slate-200 p-3 w-20 rounded-lg text-md mt-1">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-600  bg-slate-200 p-3 w-20 rounded-lg text-md mt-1 float-right "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Category;
