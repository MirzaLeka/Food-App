const router = require('express').Router();
const Company = require('../models/companySchema');
const User = require('../models/userSchema');
const { authenticateAdmin } = require('../middlewares/authenticateAdmin');


// TERMINATE a company
router.delete('/terminate/:companyId', authenticateAdmin, async (req, res) => {

    const { companyId: id } = req.params;

    try {
      const company = await Company.findOneAndDelete({ _id: id });
      if (!company) {
        return res.status(404).send();
      }

      await User.findOneAndUpdate(
        { _id: "company.companyOwner.ownerId" }, 
        { $pull: { companiesOwnes: { _id: id } } },
        { new: true, useFindAndModify: false }
      );

      // send email to user that his company is terminated

      res.status(200).send(company);
    } catch (e) {
      res.status(400).send(e);
    }
  
  });


  // DELETE a user
router.delete('/terminate/users/:userId', authenticateAdmin, async (req, res) => {

  const { userId: _id } = req.params;

  try {
    const user = await Users.findOneAndDelete({ _id })

    if (!user) {
      return res.status(404).send();
    }

    await Company.deleteMany({ "companyOwner.ownerId": _id });

    // send email to user that his account is terminated

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }

});


  // DELETE all companies
router.delete('/terminate/company', authenticateAdmin, async (req, res) => {

    try {
      const result = await Company.deleteMany({});
      await Users.updateMany( { $set:{ companiesOwnes: [] } } );

      // await Users.update( { $set: { companiesOwnes: [] } } )

      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }
  
  });


    // DELETE all users
router.delete('/terminate/users/all', authenticateAdmin, async (req, res) => {
    try {

      await Company.deleteMany({});
      const result = await User.deleteMany({});

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


// UPDATE user role

module.exports = router;
