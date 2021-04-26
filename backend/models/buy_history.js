const mongoose = require('mongoose')

const buy_historySchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,

  },
  date: {
    type: Date,
    required: true,

  },
  paymentType: {
    type: String,
    required: true,
  },
  detail: {
    type: Array,
    required: true,
  },
  build: {
    type: Boolean,
    required: false,
  },
  total: {
    type: Number,
    required: true,
  },
  address:{
    type: String,
    required:true,
  },

})

module.exports = mongoose.model('buy_history', buy_historySchema)