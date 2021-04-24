const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  PDname: {
    type: String,
    required: true,
    //unique: true
  },
  price: {
    type: Number,
    required: true,
    
  },
  count: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  detail:{
    type: Object,
    required: false
  },
  review:{
    type: String,
    require: false
  }
})

module.exports = mongoose.model('product', productSchema)