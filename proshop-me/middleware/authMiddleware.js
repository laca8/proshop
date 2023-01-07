const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
exports.protect = asyncHandler(async (req,res,next)=>{

    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
           try {
               token = req.headers.authorization.split(' ')[1]
               const decoded = jwt.verify(token,'laca')
               console.log(decoded);
               req.user = await User.findById(decoded.id)
               next()
           } catch (error) {
            res.status(401)
            throw new Error('Not authorized , no token')
           }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized , no token')
    }
     
})
exports.admin = async (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('user is not authorized')
    }
}