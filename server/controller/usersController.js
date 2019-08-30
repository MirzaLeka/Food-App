
const router = require('express').Router();
const moment = require('moment');

const User = require('../models/userSchema');
const Company = require('../models/companySchema');
const Order = require('../models/orderSchema');
const { sendEmail } = require('../services/sendEmail');
const { generateRandomString } = require('../services/generateRandom');
const { authenticateUser } = require('../middlewares/authenticateUser');
const { authenticateAdmin } = require('../middlewares/authenticateAdmin');


// REGISTER new user
router.post('/', async (req, res) => {

    try {
  
      const { username, email, password } = req.body;
  
      const user = new User({
        username,
        email,
        password,
        dateRegistered: moment().format('Do | MMM | YYYY')
      });
  
      await user.save();
      const token = await user.generateAuthToken();
      
      res.header('x-auth', token).send(user);
  
    } catch (e) {
      res.status(400).send(e.message);
    }
  
  });
  
  
  // LOG IN existing user
  router.post('/login', async (req, res) => {
    
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
  
      res.header('x-auth', token).send(user);
  
    } catch (e) {
      res.status(400).send(e);
    }
  
  });
  
  
  // LOG OUT existing user
  router.delete('/logout', authenticateUser, async (req, res) => {
    try {
      await req.user.removeToken(req.token);
      res.status(200).send();
    } catch (e) {
      res.status(400).send(e);
    }
  
  });
  
  
  // SEE user profile
  router.get('/me', authenticateUser, (req, res) => {
    res.send(req.user);
  });
  
  
  // UPDATE user
  router.patch('/me', authenticateUser, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password', 'avatar', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
  
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
  });


  // DEACTIVE account
  router.delete('/me', authenticateUser, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (e) {
        res.status(500).send();
    }
  });
  

  /* Admin only endpoints */

  // DELETE a company
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

  
   // DELETE all companies
   router.delete('/terminate/company', authenticateAdmin, async (req, res) => {
    try {
      const result = await Company.deleteMany({});
      await User.updateMany( { $set:{ companiesOwnes: [] } } );
      res.send(result);
    } catch (e) {
      res.status(400).send(e.message);
    }
  
  }); 


    // DELETE a user
  router.delete('/terminate/user/:userId', authenticateAdmin, async (req, res) => {

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


  // DELETE all users
  router.delete('/terminate/user/all', authenticateAdmin, async (req, res) => {
    try {

      await Company.deleteMany({});
      await Order.deleteMany({});
      const result = await User.deleteMany({});

      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }

  });


  // UPDATE user role
  router.put('/update-role/:userId', async (req, res) => {

    const { userId } = req.params;
    const { role } = req.body;

    try {

      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $set: role },
        { new: true, useFindAndModify: false });

      if (!user) {
        return res.status(404).send('User not found');
      }

      // send email to user about new role
      
      req.send(user);

    } catch (e) {
      res.status(400).send(e.message);
    }

  });


module.exports = router;
  