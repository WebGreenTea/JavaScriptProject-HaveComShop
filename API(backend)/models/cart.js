const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    //unique: true
  },
  productID: {
    type: String,
    required: true,
  },
  count:{
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('cart', cartSchema)