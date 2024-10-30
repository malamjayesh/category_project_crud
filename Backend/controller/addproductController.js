const Product = require("../models/addproductModels")
const AddProduct = async (req,res)=>{
    const {name,price,categoryId,description} = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const newProduct = await Product.create({
            name,
            image,
            price,
            categoryId,
            description
        })
        res.status(201).json({message:"Product created successfully",newProduct})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to create product"})
    }
}
const getProducts = async (req, res) => {
    try {
      const products = await Product.find().populate("categoryId", "name"); 
      res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
      console.error("Error fetching products", error);
      res.status(500).json({ message: "Failed to get products" });
    }
  };
const DeleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully", deleteProduct });    
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
}

const getsingleProduct = async (req, res) => {
    console.log("Fetching product with ID:", req.params.id);
    try {
        const product = await Product.findById(req.params.id).populate("categoryId", "name");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ product });
    } catch (error) {
        console.error("Error fetching product by ID", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Add a function to update a product
const updateProduct = async (req, res) => {
    const { name, price, categoryId, description } = req.body;
    const image = req.file ? req.file.path : null;
    const updateData = { name, price, categoryId, description };
    if (image) updateData.image = image;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product", error);
        res.status(500).json({ message: "Failed to update product" });
    }
};

module.exports = {
    AddProduct,
    getProducts,
    DeleteProduct,
    updateProduct,
    getsingleProduct
}