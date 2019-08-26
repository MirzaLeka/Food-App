const { isEmail, isJWT } = require('validator');

module.exports.validateRegisterUser = props => {

  if(!validateUsername(props)) {
    return 'Username field is required!';
  }

  if (!validateUsernameRange(props)) {
    return 'Username must be between 6 and 30 characters long!'
  }

  if (!validateUserEmail(props)) {
    return 'Email field is required!';
  }

  if (!validateUserEmailValue(props)) {
    return 'Please enter valid email address!';
  }

  if (!validateUserPassword(props)) {
    return 'Password field is required!';
  }

  if (!validateUserPasswordRange(props)) {
    return 'Password must be between 8 and 32 characters long!';
  }

  if (!validateUserPasswordValue(props)) {
    return 'Password cannot be equal to word \'password\'!';
  }

  return true;
}

module.exports.validateLogInUser = props => {

  if (!validateUserEmail(props)) {
    return 'Email field is required!';
  }

  if (!validateUserEmailValue(props)) {
    return 'Please enter valid email address!';
  }

  if (!validateUserPassword(props)) {
    return 'Password field is required!';
  }

  if (!validateUserPasswordRange(props)) {
    return 'Password must be between 8 and 32 characters long!';
  }

  if (!validateUserPasswordValue(props)) {
    return 'Password cannot be equal to word \'password\'!';
  }

  return true;
}


module.exports.validateJWTToken = token => {

  if (!validateToken(token)) {
    return 'Invalid token!';
  }
  return true;
}



function validateUsername({ username }) {
  if (!username) return false;
  return true;
}

function validateUsernameRange({ username }) {
  if (username.length < 3 || companyName.length > 30) return false;
  return true;
}

function validateUserEmail({ email }) {
  if (!email) return false;
  return true;
} 

function validateUserEmailValue({ email }) {
  if (!isEmail(email)) return false;
  return true;
}

function validateUserPassword({ password }) {
  if (!password) return false;
  return true;
}

function validateUserPasswordRange({ password }) {
  if (password.length < 8 || password.length > 32) return false;
  return true;
}

function validateUserPasswordValue({ password }) {
  if (password.toLowerCase() === 'password') return false;
  return true;
}

function validateToken(token) {
  if (!isJWT(token)) return false;
  return true;
}
