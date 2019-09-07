const mongoose = require('mongoose');
const FoodItemSchema = require('./foodItemSchema');

const Schema = mongoose.Schema;

const TrendingItemSchema = new Schema({
  trendingItems: [ FoodItemSchema ],
  companyPath: {
    type: String,
    required: true
  }
});

module.exports = TrendingItemSchema;

// https://docs.mongodb.com/manual/reference/operator/aggregation/sample/
