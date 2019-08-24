const router = require('express').Router();
const Company = require('../models/companySchema');
const User = require('../models/userSchema');
const { authenticateAdmin } = require('../middlewares/authenticateAdmin');


// TERMINATE a company
router.delete('/terminate/:companyId', authenticateAdmin, async (req, res) => {

    const { companyId: id } = req.params;

    try {
      const company = await Company.findOneAndDelete({_id: id});
      if (!company) {
        return res.status(404).send();
      }

      await User.findOneAndUpdate(
        { _id: company.ownerId }, // will have to dig out owner
        { $inc: { companiesOwms: -1 } },
        { new: true, useFindAndModify: false }
      );

      // and wipe all companies user had and all food items company had

      // send email to user that his company is terminated

      res.status(200).send(company);
    } catch (e) {
      res.status(400).send(e);
    }
  
  });


  // DELETE a user
router.delete('/terminate/users/:userId', authenticateAdmin, async (req, res) => {

  const { userId: id } = req.params;

  try {
    const company = await Company.findOneAndDelete({_id: id});
    if (!company) {
      return res.status(404).send();
    }

    // and wipe all companies user had and all food items company had

    // send email to user that his account is terminated

    res.status(200).send(company);
  } catch (e) {
    res.status(400).send(e);
  }

});


  // DELETE all companies
router.delete('/terminate/company', authenticateAdmin, async (req, res) => {
    try {
      const result = await Company.deleteMany({});

      // deletes all food items along side with it. this can't be undone

      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }
  
  });


    // DELETE all users
router.delete('/terminate/users/all', authenticateAdmin, async (req, res) => {
    try {
      const result = await User.deleteMany({});

      // deletes users, companies and food items

      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }
  
  });


  // SEE all users
router.get('/users/all', authenticateAdmin, async (req, res) => {

  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send();
  }
  
}); 

module.exports = router;
