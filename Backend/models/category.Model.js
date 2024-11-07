const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    categoryId:{
        type:String
    },
    
},{timestamps:true,versionKey:false})
module.exports = mongoose.model("categories",categorySchema)