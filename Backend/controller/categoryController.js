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
const deleteCategory = async (req, res) => {
    const {id} = req.params;
    try {
       const del = await Category.findByIdAndDelete(id)
       res.status(200).json({message:"Category deleted successfully",del}) 
    } catch (error) {
        res.status(500).json({message:"Failed to delete category"})
    }
}
const updateCategory = async (req, res) => {
    const {id,name} = req.params;
    try {
        const update = await Category.findByIdAndUpdate(id,req.body,{
            name,
            new:true
        })
        res.status(200).json({message:"Category updated successfully",update})
    } catch (error) {
        res.status(500).json({message:"Failed to update category"})
    }
}
module.exports = {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory
}