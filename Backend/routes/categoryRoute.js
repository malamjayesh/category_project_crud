const express = require("express");
const {createCategory,getCategories,deleteCategory,updateCategory} = require("../controller/categoryController");
const router = express.Router();

router.post("/addcategory",createCategory)
router.get("/getcategory",getCategories)
router.delete("/deletecategory/:id",deleteCategory)
router.put("/updatecategory/:id",updateCategory)
module.exports = router;