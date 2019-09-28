const mongoose = require('mongoose');
const Company = require('./companySchema');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: [6, 'Username requires at least 6 characters.'],
    maxlength: [25, 'Please keep username no longer than 25 characters.'],
    required: [true, 'Username field required']
  },
  email: {
    type: String,
    required: [true, 'Email field required'],
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    trim: true,
    minlength: [8, 'Password requires at least 8 characters'],
    validate(value) {
      if (value.toLowerCase() === 'password') {
          throw new Error('Password cannot be a word "password"')
      }
    },
    required: [true, 'Password field required']
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200
  },
  role: {
    type: String,
    default: 'Owner'
  },
  companiesOwnes: [ String ],
  dateRegistered: {
    type: String,
    default: null
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
   }],
  avatar: {
    type: String
  },
  authString: String,
  isVerified: Boolean
}); 


UserSchema.methods.toJSON = function() {

  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.authString;
  delete userObject.isVerified;
  delete userObject.password;

  return userObject;
}


UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  user.tokens = user.tokens.concat([{access, token}]); 
    
  return user.save().then(() => {
    return token;
  });
}


UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)  
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

}


UserSchema.statics.findByCredentials = function (email, password) {
  const User = this;

  return User.findOne({email}).then((foundUser) => {

    if (!foundUser) {
      return Promise.reject('User not found');
    }

    return new Promise((resolve, reject) => {

      bcrypt.compare(password, foundUser.password, (err, result) => {

        if (err) {
          console.log(err); 
        } 
 
        if (result) {
          resolve(foundUser);
        } else {
          reject('Passwords do not match');
        }
 
      });

     });

   });

}


UserSchema.methods.removeToken = function(token) {
  const user = this;

 return user.updateOne({
    $pull: {
      tokens: {token}
    }
  });
};


UserSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
      
        if (err) {
          console.log(err); 
        } 

        user.password = hash;
        next();
      });
    });

  } else {
    next();
  }

});


UserSchema.pre('remove', async function (next) {
  const user = this
  await Company.deleteMany({ "companyOwner.ownerId": user._id })
  next();
});


const User = mongoose.model('user', UserSchema);

module.exports = User;
