const User = require('../models/userSchema');

module.exports.authenticateUser = (req, res, next) => {
  const token = req.header('x-auth');

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
 