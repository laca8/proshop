const express = require('express')
const dotenv = require('dotenv')
const Product = require('./models/Product')
const path = require('path')
const connectDB = require('./config/db')
const user = require('./routes/userRoutes')
const product = require('./routes/productRoutes')
const order = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const Order =require('./models/Order')
const asyncHandler = require('express-async-handler')
const {protect,admin} = require('./middleware/authMiddleware')
//const {notFound,errorHandler} = require('./middleware/errorHandler')
const app = express()
//db 
connectDB()
dotenv.config({path:'./config/.env'});
app.use(express.json())
app.use(express.urlencoded({extended:false})) 

app.use('/api/users',user)
app.use('/api/products',product)
app.use('/api/orders',order)
app.use('/api/upload', uploadRoutes)

app.get('/api/productsTop',asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
}))
//err
app.use((err,req,res,next)=>{
    const statusCode  = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
    })
  })
  __dirname = path.resolve()
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'/client/build')))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}else{
  app.get('/',(req,res)=>{
    res.send('Api is running...')
  })
}
app.get('/api/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
})
const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
})