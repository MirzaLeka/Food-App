const router = require('express').Router();
const moment = require('moment');
const Order = require('../models/orderSchema');
const Company = require('../models/companySchema');
const { geocodeAddress } = require('../services/geocode');
const { generateRandomString } = require('../services/generateRandom');
const { validateCreditCard } = require('../validation/validateOrderController');
const { formatCreditCardNumber } = require('../services/formatString');


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

    if (creditCard) {

      const output = validateCreditCard(creditCard);

      if ( output !== null ) {
        throw Error(output);
      }

      let { cardNumber } = creditCard;
      const formatted = formatCreditCardNumber(cardNumber);

      creditCard.cardNumber = formatted;
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


// UPDATE order
router.put('/:orderId', async (req, res) => {

  const { orderId } = req.params;
  const { customerName, customerLocation, customerPhone, quantity, price } = req.body;

  let updates = {};

  if (customerName) updates.customerName = req.body.customerName;
  if (customerPhone) updates.customerPhone = customerPhone;
  if (quantity) updates.quantity = quantity;
  if (price) updates.price = price;

  if (customerLocation) {
    const { customerAddress } = companyLocation;
    const { lat, lng } = await geocodeAddress(customerAddress);

    companyLocation.type = 'Point';
    companyLocation.customerAddress = customerAddress;
    companyLocation.coordinates = [lat, lng];
    
    updates.companyLocation = companyLocation;
  }

  try {

    const updatedCompany = await Company.findOneAndUpdate(
      { _id: orderId },
      { $set: updates },
      { new: true, useFindAndModify: false });

    res.send(updatedCompany);

  } catch (e) {
    res.status(400).send(e.message);
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
