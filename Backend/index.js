require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig")
const categoryRoute = require("./routes/categoryRoute")
const path = require("path")
const productRoute = require("./routes/addproductRoute")
const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use(express.static("uploads")); 
app.use("/uploads", express.static("uploads"));

app.use("/api",categoryRoute)
app.use("/api",productRoute)
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server started at port num : ${PORT}`);
})