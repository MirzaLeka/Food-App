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
  country: {
    type: String,
    trim: true,
    minlength: [1, 'Country name requires at least 1 character'],
    maxlength: [50, 'Country name cannot exceed 50 characters'],
    required: [true, 'Country name field is required']
  },
  zipcode: {
    type: Number,
    min: [10000, 'Zipcode cannot contrain less than 5 digits'],
    max: [999999, 'Zipcode cannot contrain more than 6 digits'],
    required: [true, 'Zipcode cannot name field is required']
  }
});

module.exports = CreditCardSchema;
