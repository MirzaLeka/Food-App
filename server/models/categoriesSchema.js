const mongoose = require('mongoose');
const FoodItemSchema = require('./foodItemSchema');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  categoryName: { 
    type: String,
    trim: true,
    minlength: [3, 'Categoory name requires at least 3 characters'],
    required: [true, 'Categoory name is field required']
  },
  categoryProducts: [ FoodItemSchema ]
}); 

module.exports = CategoriesSchema;

/*
{
	"foodName": "Pizza Company",
	"foodPrice": 10,
	"foodCategory": "Pizza",
	"description": "You'll love this!"
}
*/