const asyncHandler = require('express-async-handler')
const Product = require('../models/Product')
exports.getProducts = asyncHandler(async(req,res)=>{
    //pagination
    const pageSize = 2
    const page = Number(req.query.pageNumber) || 1
    //search
    const keyword = req.query.keyword ? {// ?keyord=iphone  || handfree
          name: {
              $regex:req.query.keyword,  //iph = iphone 
              $options:'i' // case insensitive
          }
        } : {}
    //search
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1 )) 
    res.json({products,page,pages: Math.ceil(count / pageSize)})
})
exports.getProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('product not found')
    
    }
})
exports.createProduct = asyncHandler(async(req,res)=>{
    const product = await new Product({
        name:'sample name',
        user:req.user._id,
        category:"electronic",
        image:'./images/sample.jpg',
        description:'test',
        price:0,
        countInStock:0,
        numReviews:0,
        brand:'sample'

    })
    await product.save()
    res.json(product)
})
exports.updateProduct = asyncHandler(async(req,res)=>{
    const {name,image,brand,category,description,price,countInStock,numReviews} = req.body
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name || product.name
        product.image = image || product.image
        product.category = category || product.category
        product.brand = brand || product.brand
        product.price = price || product.price
        product.description = description  || product.description
        product.countInStock = countInStock || product.countInStock
        const updateProduct = await product.save()
        res.json(updateProduct)
    }else{
        res.status(404)
        throw new Error('product not found')
    }
})

exports.deleteProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        product.remove()
        res.json('product deleted')
    }else{
        res.status(404)
        throw new Error('product not found')
    }
})
exports.createProductReview = asyncHandler(async (req,res)=>{
    const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
    }else{
        res.status(404)
        throw new Error('product not found')
    }
})
// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
exports.getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
  })
  