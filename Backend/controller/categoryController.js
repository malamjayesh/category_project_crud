const Category = require("../models/category.Model");
const createCategory = async (req, res) => {
    const {name,categoryId} = req.body;
    try {
        const newCategory = await Category.create({
            name,
            categoryId
        })
        res.status(201).json({message:"Category created successfully",newCategory})
    } catch (error) {
        res.status(500).json({message:"Failed to create category"})
    }
}
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({message:"Categories fetched successfully",categories})
    } catch (error) {
        res.status(500).json({message:"Failed to get categories"})
    }
}

module.exports = {
    createCategory,
    getCategories,
    
}
