const { isEmail } = require('validator');
const { ObjectID } = require('mongodb');

module.exports.validateCreateCompany = props => {

  if(!validateCompanyName(props)) {
    return 'Company name field is required!';
  }

  if (!validateCompanyNameRange(props)) {
    return 'Company name must be between 3 and 30 characters long!'
  }

  if (!validateCompanyEmail(props)) {
    return 'Company email field is required!';
  }

  if (!validateCompanyEmailValue(props)) {
    return 'Please enter valid email address!';
  }

  if (!validateCompanyPassword(props)) {
    return 'Company password field is required!';
  }

  if (!validateCompanyPasswordRange(props)) {
    return 'Company password must be between 8 and 32 characters long!';
  }

  if (!validateCompanyPasswordValue(props)) {
    return 'Company password cannot be equal to word \'password\'!';
  }

  if (!validateCompanyAddress(props)) {
    return 'Company address field is required!';
  } 

  if (!validateCompanyAddressRange(props)) {
    return 'Company address must be between 3 and 45 characters long!'
  }

  if (!validateCompanyPhoneNumber(props)) {
    return 'Company phone number is requried!';
  }

  if (!validateCompanyPhoneNumberValues(props)) {
    return 'Company phone number must cannot include not a number values!';
  }

  if (!validateCompanyPhoneNumberRange(props)) {
    return 'Company phone number must be between 9 and 45 characters long!';
  }

  return true;
}


module.exports.validateObjectID = id => {

  if (ObjectID.isValid(id)) {
    return true;
  }
  return false;
}


module.exports.validateSpatialQuerySearch = props => {

  if ( !validateNumberValues(props) ) {
    return 'Number values required!';
  } 

  if ( !validatePropsFloor(props) ) {
    return 'Both minimum and maximum distance must be positive numbers!';
  }

  if ( !validatePropsRange(props) ) {
    return 'Maximum distance must be greater than the minimum!';
  }

  return null;
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

function validateCompanyName({ companyName }) {
  if (!companyName) return false;
  return true;
}

function validateCompanyNameRange({ companyName }) {
  if (companyName.length < 3 || companyName.length > 30) return false;
  return true;
}

function validateCompanyEmail({ companyEmail }) {
  if (!companyEmail) return false;
  return true;
} 

function validateCompanyEmailValue({ companyEmail }) {
  if (!isEmail(companyEmail)) return false;
  return true;
}

function validateCompanyPassword({ companyPassword }) {
  if (!companyPassword) return false;
  return true;
}

function validateCompanyPasswordRange({ companyPassword }) {
  if (companyPassword.length < 8 || companyPassword.length > 32) return false;
  return true;
}

function validateCompanyPasswordValue({ companyPassword }) {
  if (companyPassword.toLowerCase() === 'password') return false;
  return true;
}

function validateCompanyAddress({ companyAddress }) {
  if (!companyAddress) return false;
  return true;
}

function validateCompanyAddressRange({ companyAddress }) {
  if (companyAddress.length < 3 || companyAddress.length > 45) return false;
  return true;
}

function validateCompanyPhoneNumber({ companyPhone }) {
  if (!companyPhone) return false;
  return true;
}

function validateCompanyPhoneNumberValues({ companyPhone }) {
  if ( isNaN(Number(companyPhone)) ) return false;
  return true;
}

function validateCompanyPhoneNumberRange({ companyPhone }) {
  if (companyPhone.length < 9 || companyPhone.length > 45) return false;
  return true;
}

function validateCompanyEmail({ companyEmail }) {
  if (!companyEmail) return false;
  return true;
}
