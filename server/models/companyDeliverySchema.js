const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyDeliverySchema = new Schema({
  companyStatus: {
    type: String,
    default: 'Open'
  },
  companyDeliveryStatus: {
    type: String,
    default: 'Available'
  },
  openHours: {
    type: Array,
    required: false
  },
  deliveryHours: {
    type: Array,
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
