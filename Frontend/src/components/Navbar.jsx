import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoMoon } from "react-icons/go";
import { IoIosSunny } from "react-icons/io";
import { ThemeContext } from "../context/Themecontext";
function Navbar() {
  const { theme, handleTheme } = useContext(ThemeContext);
  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "white" : "black";
  }, [theme]);
  return (
    <nav className="bg-indigo-900 p-4">
      <div className="flex justify-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/category" className="text-white hover:text-orange-500">
              Category
            </Link>
          </li>
          <li>
            <Link to="/addproduct" className="text-white hover:text-orange-500">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/product" className="text-white hover:text-orange-500">
              Product
            </Link>
          </li>
          <li>
            {/* <Link
              to="/editproduct"
              className="text-white hover:text-orange-500"
            >
              Edit Product
            </Link> */}
          </li>
          <li></li>
          {theme === "light" ? (
            <IoIosSunny
              size={30}
              className="cursor-pointer flex justify-self-end text-white"
              onClick={handleTheme}
            />
          ) : (
            <GoMoon
              size={30}
              className="cursor-pointer flex justify-self-end text-white"
              onClick={handleTheme}
            />
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
