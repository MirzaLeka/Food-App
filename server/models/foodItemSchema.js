const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
  foodName: {
    type: String,
    trim: true,
    unique: [true, 'Duplicate food item name'],
    minlength: [3, 'Food name requires at least 3 characters'],
    maxlength: [100, 'Food name cannot exceed 100 characters'],
    required: [true, 'Food name field is required']
  },
  foodPrice: {
    type: Number,
    min: [0, 'Price must be 0 or greater'],
    required: [true, 'Price field is required']
  },
  foodCategory: {
    type: String,
    trim: true,
    minlength: [3, 'Category requires at least 3 characters'],
    maxlength: [25, 'Category cannot exceed 25 characters'],
    required: [true, 'Category field is required']
  },
  avatar: {
    type: Buffer,
    required: false
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: '',
    required: false
  }
});

module.exports = FoodItemSchema;
