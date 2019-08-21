const mongoose = require('mongoose');
const CreditCardSchema = require('./creditCardSchema');
const FoodItem = require('./foodItemSchema');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerName: {
    type: String,
    unique: true,
    trim: true,
    minlength: [3, 'Customer name requires at least 3 characters'],
    required: [true, 'Customer name is field required']
  },
  customerAddress: {
    type: { type: String },
    coordinates: [],
    trim: true,
    minlength: [5, 'Address requires at least 5 characters'],
    required: [true, 'Address field is required']
  },
  customerPhone: {
    type: Number,
    unique: true,
    trim: true,
    min: [9, 'Phone number requires at least 9 numbers'],
    required: [true, 'Phone number field is required']
  },
  foodItems: [FoodItem],
  companyName: String,
  orderId: {
    type: String
  },
  creditCard: CreditCardSchema
}); 

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
