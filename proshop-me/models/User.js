const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        required:true,
        type:Boolean,
        default:false,
    },

},
{
    timestamps:true
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
userSchema.methods.matchedPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

module.exports = mongoose.model('user',userSchema)