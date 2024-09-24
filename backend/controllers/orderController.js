import nodemailer from 'nodemailer'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
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

    // Create a transporter for sending emails using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Assuming you use Gmail
      auth: {
        user: 'dewdermint@gmail.com', // Replace with your email
        pass: 'nsoa qdlq gnge afsn', // Replace with your email password or app password
      },
    })

    // Email content for the user
    const userMailOptions = {
      from: 'dewdermint@gmail.com',
      to: req.user.email, // User's email address
      subject: 'Your Order Confirmation',
      text: `Thank you for your order! \n\nOrder Items:\n${orderItems
        .map((item) => `${item.name} - ${item.qty} x RS - ${item.price}`)
        .join('\n')}\n\nShipping Address:\n${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}\nTotal Price: RS - ${totalPrice}`,
    }

    // Email content for the admin
    const adminMailOptions = {
      from: 'dewdermint@gmail.com',
      to: 'dewdermint@gmail.com', // Admin email
      subject: 'New Order Created',
      text: `A new order has been created.\n\nOrder Items:\n${orderItems
        .map((item) => `${item.name} - ${item.qty} x RS - ${item.price}`)
        .join('\n')}\n\nDelivery Address:\n${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}\nTotal Price: RS - ${totalPrice}`,
    }

    // Send email to the user
    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.log(`Error sending email to user: ${error}`)
      } else {
        console.log(`Email sent to user: ${info.response}`)
      }
    })

    // Send email to the admin
    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.log(`Error sending email to admin: ${error}`)
      } else {
        console.log(`Email sent to admin: ${info.response}`)
      }
    })


    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
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

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
}
