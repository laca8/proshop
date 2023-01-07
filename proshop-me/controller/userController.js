const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')
exports.register = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body
    let userExist = await User.findOne({email:email})
    if(userExist){
        res.status(400)
        throw new Error('user is already exist')
    }
    const user = await User.create({
        name,
        email,
        password
   })
   if(user){
       res.status(201)
       .json({
           _id:user._id,
           name:user.name,
           email:user.email,
           isAdmin:user.isAdmin,
           token:generateToken(user._id)
       })
   }else{
       res.status(400)
       throw new Error('Invalid user data')
   }
});
exports.login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(user && (await user.matchedPassword(password))){
        res.status(201)
        .json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400).json({message:'Invalid Credintials'})
        throw new Error({message:'Invalid Credintials'})
        
    }
})
exports.getProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        res.status(201)
        .json(user)
    }else{
        res.status(404)
        throw new Error('not found')
    }
})
exports.updateProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updateUser = await user.save()
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(404)
        throw new Error('not found')
    }
})
//admin
exports.getUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({})
    res.json(users)
})

//admin
exports.deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        user.remove()
        res.json({message:'user deleted'})
    }else{
        res.status(404)
        throw new Error('not found')
    }
})
//admin
exports.getUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('not found')
    }
})

//admin
exports.updateUsers = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.user.isAdmin || user.isAdmin
        const updateUser = await user.save()
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(updateUser._id)
        })
        res.json(updateUser)
    }else{
        res.status(404)
        throw new Error('not found')
    }
})