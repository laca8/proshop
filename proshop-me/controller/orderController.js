const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body
  
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      return
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
  
      const createdOrder = await order.save()
      res.json(createdOrder)
    }
  })
exports.getOrderById = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.status(201).json(order)
    }else{
        res.status(404)
        throw new Error('not found')
    }
})
//private/admin
exports.deleteOrder = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')
    if(order){
        order.remove()
        res.json('order removed')
    }else{
        res.status(404)
        throw new Error('not found')
    }
});
exports.getMyOrder = asyncHandler(async(req,res)=>{
    const orders = await Order.find({user:req.user._id})
    res.json(orders)
})
//private/admin
exports.getOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({}).populate('user','id name')
    res.json(orders)
})

//desc    update order to paid
//route   get /api/order/:id/pay
//access  private
exports.updateOrderToPaid = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)

    }else{
        res.status(404)
        throw new Error('not found')
    }
})
// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })