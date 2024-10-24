require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig")
const categoryRoute = require("./routes/categoryRoute")
const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use("/api",categoryRoute)
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server started at port num : ${PORT}`);
})