const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    categoryId:{
        type:String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories' 
    },
    
},{timestamps:true,versionKey:false})
module.exports = mongoose.model("categories",categorySchema)