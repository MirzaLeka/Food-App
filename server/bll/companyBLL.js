
const { 
  validateCompanyName,
  validateCompanyNameSpecialCharacters,
  validateCompanyNameRange,
  validateCompanyEmail,
  validateCompanyEmailValue,
  validateCompanyAddress,
  validateCompanyAddressRange,
  validateCompanyPhoneNumber,
  validateCompanyPhoneNumberValues,
  validateCompanyPhoneNumberRange,
  validateCompanyDescriptionRange
} = require('../validation/validateCompanyController');

module.exports.validateCreateCompany = props => {

  if(!validateCompanyName(props)) {
    return 'Company name field is required!';
  }
  
  if(!validateCompanyNameSpecialCharacters(props)) {
    return `Company name cannot contain any of the following special characters: [!@#$%^*()_+\`\=\[\]{};"\\|<>\/?]+ `;
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

  if (!validateCompanyDescriptionRange(props)) {
    return 'Company description cannot exceed 500 characters!';
  }
  
  return null;
}
  