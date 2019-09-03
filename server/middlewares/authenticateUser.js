const User = require('../models/userSchema');
const { validateJWTToken } = require('../validation/validateUsersController');

module.exports.authenticateUser = (req, res, next) => {

  const token = req.header('x-auth');

  try {
    
    const result = validateJWTToken(token);
    if (result === false) {
      throw Error(`Invalid token!`);
    }

  } catch (e) {
    res.status(400).send(e.message);
  }

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
  
    req.user = user;
    req.token = token;
    next();

   }).catch(() => {
     res.status(401).send();
   }) 
 }
 