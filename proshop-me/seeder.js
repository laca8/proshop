const dotenv = require('dotenv')
const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const users = require('./data/users')
const products = require('./data/products')
const path = require('path')
const connectDB = require('./config/db')
dotenv.config({path:'./config/.env'})
connectDB()
const importData = async () =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        const createdUser =  await User.insertMany(users) // keda ana 3amlt documents users in User model
        const adminUser = createdUser[0]._id
        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        })
        await Product.insertMany(sampleProducts)
        console.log('Data Imported');
        process.exit()
    } catch (error) {
        console.error(`${error}`);
        process.exit(1)
    }
}
const destroyData = async () =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log('Data Destroy');
        process.exit()
    } catch (err) {
        console.error(`${err}`);
        process.exit(1)
    }
}
if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}