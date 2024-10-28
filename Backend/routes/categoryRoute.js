const express = require("express");
const {createCategory,getCategories,deleteCategory,updateCategory} = require("../controller/categoryController");
const router = express.Router();

router.post("/addcategory",createCategory)
router.get("/getcategory",getCategories)
module.exports = router;