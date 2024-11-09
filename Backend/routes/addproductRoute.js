const express = require("express");
const {AddProduct,getProducts, DeleteProduct, updateProduct, getsingleProduct} = require("../controller/addproductController")
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
router.get("/getsingleproduct/:id", getsingleProduct);
router.put("/updateproduct/:id", upload.single("image"), updateProduct);
module.exports = router
