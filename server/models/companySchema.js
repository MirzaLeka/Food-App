const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


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


CompanySchema.methods.toJSON = function() {
  const company = this;
  const { _id, companyName, companyEmail, companyLocation, companyPhone } = company.toObject();

  return { _id, companyName, companyEmail, companyLocation, companyPhone };
}


CompanySchema.methods.generateAuthToken = function() {
  const company = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  company.tokens = company.tokens.concat([{access, token}]); 
    
  return company.save().then(() => {
    return token;
  });
}


CompanySchema.statics.findByToken = function(token) {
  const company = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)  
  } catch (e) {
    return Promise.reject();
  }

  return company.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

}


CompanySchema.statics.findByCredentials = function (email, password) {
  const Company = this;

  return Company.findOne({email}).then((company) => {

    if (!company) {
      return Promise.reject('Company not found');
    }

    return new Promise((resolve, reject) => {

      bcrypt.compare(password, companyPassword, (err, result) => {

        if (err) {
          console.log(err); 
        } 
 
        if (result) {
          resolve(company);
        } else {
          reject('Passwords do not match');
        }
 
      });

     });

   });

}


CompanySchema.methods.removeToken = function(token) {
  const company = this;

 return company.updateOne({
    $pull: {
      tokens: {token}
    }
  });
};


CompanySchema.pre('save', function(next) {
  const company = this;

  if (company.isModified('password')) {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(companyPassword, salt, (err, hash) => {
      
        if (err) {
          console.log(err); 
        } 

        company.password = hash;
        next();
      });
    });

  } else {
    next();
  }

});



CompanySchema.index({companyLocation: '2dsphere'});

const Comapny = mongoose.model('company', CompanySchema);
module.exports = Comapny;
