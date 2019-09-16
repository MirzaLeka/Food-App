const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyDetailsSchema = new Schema({
  rating: {
    type: Number,
    required: false
  },
  openHours: {
    type: [ {} ],
    required: false
  },
  cuisine: {
    type: [ String ],
    required: false
  }
});

module.exports = CompanyDetailsSchema;
