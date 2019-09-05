const { isCreditCard } = require('validator');

module.exports.validateCreditCard = props => {

  if(!validateCardHolderField(props)) {
    return 'Card holder field is required!';
  }   

  if(!validateCardNumberField(props)) {
    return 'Card number field is required!';
  }  

  if(!validateNumber(props.cardNumber)) {
    return 'Card number must cannot include not a number values!';
  }

  if(!validateCardNumber(props)) {
    return 'Card number is invalid!';
  }

  if(!validateSecurityCodeField(props)) {
    return 'Security code field is required!';
  }   

  if(!validateSecurityCodeRamge(props)) {
    return 'Security code field is required!';
  }   

  if(!validateNumber(props.securityCode)) {
    return 'Security code must cannot include not a number values!';
  }

  return null;
};

function validateCardHolderField( { cardHolder } ) {
  
  if ( !cardHolder ) return false;  
  return true; 
}
  
function validateCardNumberField( { cardNumber } ) {
  
  if ( !cardNumber ) return false;  
  return true; 
}

function validateNumber( number ) {
  
  if ( isNaN(Number(number)) ) return false;  
  return true; 
}

function validateCardNumber( { cardNumber } ) {
  
  if ( isCreditCard(cardNumber) ) return true;  
  return false; 
}

function validateSecurityCodeField( { securityCode } ) {
  
  if ( !securityCode ) return false;  
  return true; 
}
  
function validateSecurityCodeRamge( { securityCode } ) {
  
  if ( securityCode < 100 || securityCode > 999 ) return false;  
  return true; 
}
