const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditCardSchema = new Schema({
  cardHolder: {
    type: String,
    trim: true,
    minlength: [1, 'Card holder name requires at least 1 character'],
    maxlength: [25, 'Card holder name cannot exceed 25 characters'],
    required: [true, 'Card holder name field is required']
  },
  cardNumber: {
    type: Number,
    required: [true, 'Card number field is required']
  },
  securityCode: {
    type: Number,
    required: [true, 'Security code field is required']
  },
  expirationDate: {
    type: String,
    required: [true, 'Expiration field is required']
  },
  timestamps: { createdAt: true, updatedAt: true }
});

module.exports = CreditCardSchema;