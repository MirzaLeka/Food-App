const randomstring = require('randomstring');

module.exports.generateRandomString = ( maxLength, minLength ) => {
  const randomLength = Math.floor(Math.random() * maxLength) + minLength;
  return randomstring.generate(randomLength);
}
