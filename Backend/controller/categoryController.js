const Category = require("../models/category.Model");
const createCategory = async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    const existingCategory = await Category.findOne({ name, categoryId });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = await Category.create({
      name,
      categoryId,
    });

    res.status(201).json({
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('categoryId', 'name');
    res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get categories", error });
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(200).json({
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
}
module.exports = {
  createCategory,
  getCategories,
  deleteCategory
};
