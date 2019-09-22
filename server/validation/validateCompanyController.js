const { isEmail } = require('validator');
const { ObjectID } = require('mongodb');


module.exports.validateObjectID = id => {

  if (ObjectID.isValid(id)) {
    return true;
  }
  return false;
}


module.exports.validateSpatialQueryRequiredFields = props => {

  if ( !validateMaxDistanceFieldIsRequired(props) ) {
    return 'Maximum distance field is required!';
  } 

  if ( !validateUserLocationIsRequired(props) ) {
    return 'User address must be provided!';
  }

  return null;
}


module.exports.validateSpatialQuerySearch = props => {

  if ( !validateNumberValues(props) ) {
    return 'Distance and coordinates must be number values!';
  } 

  if ( !validatePropsFloor(props) ) {
    return 'Both minimum and maximum distance must be positive numbers!';
  }

  if ( !validatePropsRange(props) ) {
    return 'Maximum distance must be greater than the minimum!';
  }

  return null;
}


function validateMaxDistanceFieldIsRequired({ maxDistance }) {
  if (!maxDistance) return false;
  return true;
}

function validateUserLocationIsRequired({ address, lat, lng }) {
  if (!address && (!lat || !lng)) return false;
  return true;
}


function validateNumberValues( { lat, lng, maxDistance, minDistance = 0 } ) {
  
  if ( isNaN(Number(lat)) || isNaN(Number(lng)) || isNaN(Number(maxDistance)) || isNaN(Number(minDistance)) ) return false;  
  return true; 
}

function validatePropsFloor({ maxDistance, minDistance = 0 }) {

  if ( Number(maxDistance) < 0 || Number(minDistance) < 0) return false;
  return true;
}

function validatePropsRange({ maxDistance, minDistance = 0 }) {

  if (Number(maxDistance) < Number(minDistance)) return false;
  return true;
}

/* Create Company */

 module.exports.validateCompanyName = ({ companyName }) => {
  if (!companyName) return false;
  return true;
}

module.exports.validateCompanyNameSpecialCharacters = ({ companyName }) => {
  const format = /[!@#$%^*()_+`\=\[\]{};"\\|<>\/?]+/;
  if (format.test(companyName)) return false;
  return true;
}

module.exports.validateCompanyNameRange = ({ companyName }) => {
  if (companyName.length < 3 || companyName.length > 30) return false;
  return true;
}

module.exports.validateCompanyEmail = ({ companyEmail }) => {
  if (!companyEmail) return false;
  return true;
} 

module.exports.validateCompanyEmailValue = ({ companyEmail }) => {
  if (!isEmail(companyEmail)) return false;
  return true;
}

module.exports.validateCompanyAddress = ({ companyAddress }) => {
  if (!companyAddress) return false;
  return true;
}

module.exports.validateCompanyAddressRange = ({ companyAddress }) => {
  if (companyAddress.length < 3 || companyAddress.length > 45) return false;
  return true;
}

module.exports.validateCompanyPhoneNumber = ({ companyPhone }) => {
  if (!companyPhone) return false;
  return true;
}

module.exports.validateCompanyPhoneNumberValues = ({ companyPhone }) => {
  if ( isNaN(Number(companyPhone)) ) return false;
  return true;
}

module.exports.validateCompanyPhoneNumberRange = ({ companyPhone }) => {
  if (companyPhone.length < 9 || companyPhone.length > 45) return false;
  return true;
}

module.exports.validateCompanyDescriptionRange = ({ companyDescription }) => {
  if (companyDescription.length > 500) return false;
  return true;
}
