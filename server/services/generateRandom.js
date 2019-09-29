const randomstring = require('randomstring');

module.exports.generateRandomString = ( maxLength, minLength ) => {
  const randomLength = Math.floor(Math.random() * maxLength) + minLength;
  return randomstring.generate(randomLength);
}

module.exports.generateRating = ( minRating, maxRating ) => {
  const randomRating = Math.floor(Math.random() * maxRating ) + minRating;  
  return randomRating;
};
