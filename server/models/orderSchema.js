const mongoose = require('mongoose');
const CreditCardSchema = require('./creditCardSchema');
const FoodItem = require('./foodItemSchema');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerName: {
    type: String,
    trim: true,
    minlength: [3, 'Customer name requires at least 3 characters'],
    required: [true, 'Customer name is field required']
  },
  customerLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
    customerAddress: {
      type: String,
      trim: true,
      minlength: [3, 'Address requires at least 3 characters'],
      required: [true, 'Address field is required']
    }
  },
  customerPhone: {
    type: String,
    trim: true,
    minlength: [9, 'Phone number requires at least 9 numbers'],
    required: [true, 'Phone number field is required']
  },
  quantity: Number,
  price: {
    type: Number,
    min: [0, 'Price cannot be less than zero']
  },
  products: [FoodItem],
  companyName: {
    type: String,
    trim: true,
    minlength: [3, 'Company name requires at least 3 characters'],
    required: [true, 'Company name is field required']
  },
  orderCreated: {
    type: String,
    default: null
  },
  orderId: String,
  creditCard: CreditCardSchema
}); 

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
