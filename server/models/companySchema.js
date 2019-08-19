const mongoose = require('mongoose');
const validator = require('validator');

const CompanyDeliverySchema = require('./companyDeliverySchema');
const DetailsSchema = require('./detailsSchema');
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
    required: [true, 'Email field is required'],
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  companyLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
    companyAddress: {
      type: String,
      trim: true,
      minlength: [3, 'Address requires at least 3 characters'],
      required: [true, 'Address field is required']
    }
  },
  companyPhone: {
    type: String,
    unique: true,
    trim: true,
    minlength: [9, 'Phone number requires at least 9 numbers'],
    required: [false, 'Phone number field is required']
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
    required: [false, 'Password field is required']
  },
  companyDetails: DetailsSchema,
  companyDelivery: CompanyDeliverySchema
}); 

CompanySchema.index({companyLocation: '2dsphere'});

const Comapny = mongoose.model('company', CompanySchema);
module.exports = Comapny;
