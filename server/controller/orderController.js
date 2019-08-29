const router = require('express').Router();
const moment = require('moment');
const Order = require('../models/orderSchema');
const Company = require('../models/companySchema');
const { geocodeAddress } = require('../services/geocode');
const { generateRandomString } = require('../services/generateRandom');


// ADD new order
router.post('/', async (req, res) => {

  try {

    const 
      { customerName, customerAddress,
        customerPhone, products,
        companyName,
        price, quantity, 
        creditCard
      } = req.body;

    const company = await Company.findOne({ companyName });

    if (!company) {
      return res.status(404).send('Company not found');
    }

    const { lat, lng } = await geocodeAddress(customerAddress);

    const order = new Order({
      customerName,
      customerLocation: {
        type: 'Point',
        coordinates: [lat, lng],
        customerAddress
      },
      customerPhone,
      companyName,
      products,
      price,
      quantity,
      creditCard,
      orderId: generateRandomString(20, 10),
      orderCreated: moment().format('YYYY:M:DD | H:mm:s')
    });

    const newOrder = await order.save();
    res.send(newOrder);

  } catch (e) {
    res.send(e.message);
  }
  
});


// CANCEL order
router.delete('/:orderId', async (req, res) => {

  const { orderId } = req.params;

  try {
    const order = await Order.findOneAndDelete({ orderId });

    if (!order) {
      return res.status(404).send('Order not found');
    }

    res.send(order);

  } catch (e) {
    res.status(400).send(e);
  }
  
});

// ORDER
// update/:oderId
// see list of orders => company only

// support ?

module.exports = router;
