const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
  foodName: {
    type: String,
    trim: true,
    minlength: [3, 'Meal name requires at least 3 characters'],
    maxlength: [100, 'Meal name cannot exceed 100 characters'],
    required: [true, 'Meal name field is required']
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
  foodDetails: DetailsSchema,
  _companySellerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _companySellerName: {
    type: String,
    required: true 
  }
});

const FoodItem = mongoose.model('foodItem', FoodItemSchema);

module.exports = FoodItem;
