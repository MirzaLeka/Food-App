const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetailsSchema = new Schema({
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
  },
  rating: {
    type: Number,
    required: false
  },
});

module.exports = DetailsSchema;
