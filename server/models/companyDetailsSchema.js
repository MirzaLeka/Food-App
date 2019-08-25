const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyDetailsSchema = new Schema({
  avatar: {
    type: String,
    required: false
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: '',
    required: false
  },
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
