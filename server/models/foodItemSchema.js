const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
  itemName: {
    type: String,
    trim: true,
    minlength: [3, 'Food name requires at least 3 characters'],
    maxlength: [100, 'Food name cannot exceed 100 characters'],
    required: [true, 'Food name field is required']
  },
  itemPrice: {
    type: Number,
    min: [0, 'Price cannot be lower than zero'],
    required: [true, 'Price field is required']
  },
  itemAvatar: {
    type: String,
    required: false
  },
  itemDescription: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: '',
    required: false
  }
});

module.exports = FoodItemSchema;
