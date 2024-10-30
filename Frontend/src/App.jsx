import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/Themecontext";
import Category from "./pages/Category";
import AddProduct from "./pages/AddProduct";
import Product from "./pages/Product";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/product" element={<Product />} />
            {/* <Route path="/editproduct" element={<EditProduct />} /> */}
            <Route path="/editproduct/:id" element={<EditProduct />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
