
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


  // DELETE user
  router.delete('/me', authenticateUser, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (e) {
        res.status(500).send();
    }
  });
  
  
   // DELETE all companies -- admin only
   router.delete('/admin/company', authenticateAdmin, async (req, res) => {
    try {
      const result = await Company.deleteMany({});
      await User.updateMany( { $set:{ companiesOwnes: [] } } );
      res.send(result);
    } catch (e) {
      res.status(400).send(e.message);
    }
  
  }); 


  // DELETE all users
  router.delete('/terminate/users/all', authenticateAdmin, async (req, res) => {
    try {

      await Company.deleteMany({});
      await Order.deleteMany({});
      const result = await User.deleteMany({});

      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }

  });


  // REQUEST Password Reset
router.put('/request-reset', async (req, res) => {
  
    const { email } = req.body;
    const authString = generateRandomString(25,10);
  
    try {
  
      const updatedUser = await User.findOneAndUpdate(
        { email }, 
        { $set: { authString } },
        { new: true, useFindAndModify: false } );
  
      if (!updatedUser) {
        return res.sendStatus(404);
      }
  
      // sendEmail(updatedUser.username, updatedUser.email, authString, 'request password reset');
      res.send(updatedUser);
  
    } catch (e) {
      res.status(400).send(e.message);
    }
  
  });
  
  
  // CHECK authString
  router.put('/check-auth-string', async (req, res) => {
    
    const { email, authString } = req.body;
  
    try {
    
      const user = await User.findOneAndUpdate(
        { email, authString }, 
        { $set: { authString: '' } },
        { new: true, useFindAndModify: false } );
  
      if (!user) {
        return res.sendStatus(404);
      }  
  
      res.send(user);
  
    } catch (e) {
      res.status(400).send(e.message);
    }
  
  });
  
  // RESET password
  router.patch('/me/password', async (req, res) => {
  
    const { email, password } = req.body;
  
    try {
    
      const user = await User.findOne({email});
  
      if (!user) {
        return res.sendStatus(404);
      }  
  
      user.password = password;
  
      await user.save();
      res.send(user);
  
    } catch (e) {
      res.status(400).send(e.message);
    }
  
  });

  module.exports = router;
  