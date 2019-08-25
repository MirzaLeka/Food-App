const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyDeliverySchema = new Schema({
  deliveryHours: {
    type: [ {} ],
    required: false
  },
  minimumDeliveryPrice: {
    type: Number,
    required: false
  },
  averageDeliveryTime: {
    type: Number
  }
});

module.exports = CompanyDeliverySchema;
