const jwt =  require('jsonwebtoken')
const generateToken = (id) =>{
    return jwt.sign({id}, 'laca',{
        expiresIn:'30d'
    })
}
module.exports = generateToken;