const Company = require('../models/companySchema');

module.exports.authenticateCompany = (req, res, next) => {
  const token = req.header('x-auth');

  Company.findByToken(token).then((company) => {
    if (!company) {
      return Promise.reject();
    }
  
    req.company = company;
    req.token = token;
    next();

   }).catch(() => {
     res.status(401).send();
   }) 
 }