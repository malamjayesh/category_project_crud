import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Category from "./pages/Category";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
