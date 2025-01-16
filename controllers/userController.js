const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const GetAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find()
    res.status(200).json(users)
})

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400).json({message:"Please fill in all fields"})
    }
    const emailtaken = await User.findOne({email})
    if(emailtaken){
        res.status(400).json({message:"Email is already taken"})
    }
    const hashedPassword = await bcrypt.hash(password,6)
    const user = await User.create({username,email,password:hashedPassword})
    res.status(201).json(user)
    console.log(user)
    if(!user){
        res.status(400).json({message:"Invalid user data"})
    }
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400).json({message:"Please fill in all fields"})
    }
    const user = await User.findOne({email})
    const pass = await bcrypt.compare(password, user.password)
    if(user && pass){
        const token = jwt.sign({
            user:{
            id:user.id,
            username:user.username,
            email:user.email
            }
        },
        process.env.SECRET_TOKEN) //{expiresIn: "1m"}
        res.status(200).json({token})
    }
    else{
        res.status(400).json({message:"Invalid email or password"})
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Current User Info",
        user: req.user, 
    });
});


module.exports = {registerUser, loginUser,currentUser}