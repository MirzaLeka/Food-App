const mongoose = require('mongoose');
const validator = require('validator');

const CompanyDeliverySchema = require('./companyDeliverySchema');
const CompanyDetailsSchema = require('./companyDetailsSchema');
const CategoriesSchema = require('./categoriesSchema');


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
      default: [0, 0]
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
  companyDescription: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: '',
    required: false
  },
  companyAvatar: {
    type: String,
    required: false
  },
  companyDetails: CompanyDetailsSchema,
  deliveryDetails: CompanyDeliverySchema,
  cuisines: [ CategoriesSchema ],
  companyOwner: {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    ownerUsername: {
      type: String,
      required: true 
    }
  },
  companyPath: {
    type: String,
    required: true
  },
  companyRating: {
    type: Number,
    default: 3
  }
}); 


CompanySchema.index({companyLocation: '2dsphere'});

CompanySchema.methods.toJSON = function() {

  const company = this;
  const companyObject = company.toObject();

  delete company.companyOwner;
  return companyObject;
}


const Comapny = mongoose.model('company', CompanySchema);
module.exports = Comapny;
