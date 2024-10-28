const express = require("express");
const {AddProduct,getProducts, DeleteProduct} = require("../controller/addproductController")

const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
const upload = multer({storage})
router.post("/addproduct",upload.single("image"),AddProduct)
router.get("/getproducts",getProducts)
router.delete("/deleteproduct/:id", DeleteProduct)
module.exports = router