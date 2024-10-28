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
      // Use `.populate("categoryId")` to retrieve the category details
      const products = await Product.find().populate("categoryId", "name"); // populate with only the category name
      res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
      console.error("Error fetching products", error);
      res.status(500).json({ message: "Failed to get products" });
    }
  };
module.exports = {
    AddProduct,
    getProducts
}