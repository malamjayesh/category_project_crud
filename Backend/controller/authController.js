const User = require("../models/authModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const register = async (req,res)=>{
    const {name,email,phone,password} = req.body;
    try {
        const Existsuser = await User.findOne({email})
        if (Existsuser) {
            return res.status(400).json({message:"User Already Exists"})
        }
        const hash_pass = await bcrypt.hash(password,10)
        const newUser = await User.create({
            name,
            email,
            phone,
            password:hash_pass
        })
        res.status(201).json({message:"Registration SuccessFully",newUser})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}
const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const ExistsUser = await User.findOne({email})
        if (!ExistsUser) {
            return res.status(400).json({message:"User Not Found"})  
        }
        const isPassValid = await bcrypt.compare(password,ExistsUser.password)
        if (!isPassValid) {
            return res.status(400).json({message:"Invalid Password"})
        }
        const token = jwt.sign({id:ExistsUser._id},process.env.MY_SECRET,{
            expiresIn:"1h"
        })
        res.status(200).json({message:"Login SuccessFully",token})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports = {
    register,
    login
}