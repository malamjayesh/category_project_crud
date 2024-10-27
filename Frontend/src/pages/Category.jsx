import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

function Category() {
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("http://localhost:5000/api/getcategory");
      console.log(res.data);
      setCategories(res.data.categories);
    };
    fetchdata();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/addcategory", {
        name: input,
        categoryId: categories[0]._id,
      });
      console.log(res.data);
      setInput("");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/deletecategory/${id}`
      );
      if (res.status === 200) {
        alert("Category deleted successfully");
        setCategories(categories.filter((category) => category._id !== id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the text"
            className="top-10  border border-gray-300 rounded-md p-2 text-lg w-full focus:border-blue-500 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select className="border border-gray-300 rounded-md p-2 text-lg mb-4 w-full">
            <option value="" disabled selected>
              Choose a category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                <button>
                  <MdDelete size={30} />
                </button>
                {category.name}
              </option>
            ))}
          </select>
          <ul className="space-y-2 mt-4">
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-center border p-2 rounded-md"
              >
                <span className="text-blue-900">{category.name}</span>
                <button
                  className="text-orange-500 hover:text-red-600"
                  onClick={() => handleDelete(category._id)}
                >
                  <MdDelete size={24} />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 w-full mt-10 hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
export default Category;
