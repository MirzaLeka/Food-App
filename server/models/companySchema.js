const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  companyName: {
    type: String,
    unique: true,
    trim: true,
    minlength: [3, 'Comapny name requires at least 3 characters'],
    required: [true, 'Comapny name is field required']
  },
  companyEmail: {
    type: String,
    // required: [true, 'Email field is required'],
    // unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  companyAddress: {
    type: { type: String },
    coordinates: [],
    address: String
    // unique: true,
    // trim: true,
    // minlength: [5, 'Address requires at least 5 characters'],
    // required: [true, 'Address field is required']
  },
  companyPhone: {
    type: Number,
    // unique: true,
    // trim: true,
    // min: [9, 'Phone number requires at least 9 numbers'],
    // required: [true, 'Phone number field is required']
  },
  companyPassword: {
    type: String,
    trim: true,
    minlength: [8, 'Password requires at least 8 characters'],
    validate(value) {
      if (value.toLowerCase() === 'password') {
          throw new Error('Password cannot be a word "password"')
      }
    },
    // required: [true, 'Password field is required']
  },
  companyAvatar: {
    type: Buffer,
    required: false
  },
  averageDeliveryTime: {
    type: Number,
    // min: [60_000, 'Delivery time cannot be less than a minute long'],
    // required: true
  },
 // timestamps: { createdAt: true, updatedAt: true }
}); 

const Comapny = mongoose.model('company', CompanySchema);

module.exports = Comapny;
