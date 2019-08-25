const router = require('express').Router();
const moment = require('moment');
const Order = require('../models/orderSchema');


// ADD new order
router.post('/', async (req, res) => {

  try {

    const 
      { customerName, customerAddress,
        customerPhone, products,
        companyName,
        price, quantity, 
        creditCard: {
          cardHolder,
          cardNumber,
          securityCode,
          expirationDate
        }
    
    } = req.body;

    // create a story
    const order = new Order({
      customerName,
      customerAddress,
      customerPhone,
      companyName,
      products,
      price,
      quantity,
      orderCreated: moment().format('YYYY M DD H mm s')
    });

    const newOrder = await order.save();

    // increase user's stories count when user creates new story
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $inc: { storiesCreated: 1 } },
      { new: true, useFindAndModify: false }
    );
    
    res.send(newOrder);

  } catch (e) {
    res.send(e);
  }
  
});


// UPDATE order
router.put('/stories/:id', async (req, res) => {

  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send(`Invalid id, ${id}.`);
  }

  try {

    const updatedStory = await Story.findOneAndUpdate(
      {_id: id, _creator: req.user._id},
      {$set: req.body},
      {new: true, useFindAndModify: false});
  
    if (!updatedStory) {
      return res.status(404).send();
    }  

    res.send(updatedStory)
  
  } catch (e) {
    res.status(400).send(e);
  }

});


// CANCEL order
router.delete('/cancel/:orderId', async (req, res) => {

  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send(`Invalid id, ${id}.`);
  }  

  try {
    const deletedStory = await Story.findOneAndDelete({_id: id, _creator: req.user._id});

    if (!deletedStory) {
      return res.status(404).send();
    }

    res.send(deletedStory);
  } catch (e) {
    res.status(400).send(e);
  }
  
});


module.exports = router;


// const router = require('express').Router();

// ORDER
// /new
// /cancel/:orderId
// update/:oderId
// see list of orders => company only

// support ?

// module.exports = router;
