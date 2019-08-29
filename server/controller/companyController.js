const router = require('express').Router();
const Company = require('../models/companySchema');
const User = require('../models/userSchema');

const { geocodeAddress } = require('../services/geocode');
const { validateSpatialQuerySearch } = require('../validation/validateCompanyController');
const { authenticateUser } = require('../middlewares/authenticateUser');


// REGISTER new company
router.post('/', authenticateUser, async (req, res) => {

  try {

    const { 
      companyName,
      companyEmail,
      companyAddress, // my current location ?
      companyPhone
    } = req.body;

    const { lat, lng } = await geocodeAddress(companyAddress);
    
    const company = new Company({
      companyName,
      companyEmail,
      companyPhone,
      companyLocation: {
        type: 'Point',
        coordinates: [lat, lng],
        companyAddress
      },
      companyOwner: {
        ownerId: req.user._id,
        ownerUsername: req.user.username
      }
    });

    const newCompany = await company.save();

    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { companiesOwnes: companyName } },
      { new: true, useFindAndModify: false }
    );

    res.send(newCompany);

  } catch (e) {
    res.status(400).send(e.message);
  }

});


// SEE all companies
router.get('/', async (req, res) => {

  try {
    const allCompanies = await Company.find({});
    res.send(allCompanies);
  } catch (e) {
    res.status(400).send();
  }
  
}); 


// UPDATE company
router.put('/:companyId', authenticateUser, async (req, res) => {

  const { companyId: id } = req.params;

  let updates = {};

  if (req.body.companyName) updates.companyName = req.body.companyName;
  if (req.body.companyEmail) updates.companyEmail = req.body.companyEmail;
  if (req.body.companyLocation) updates.companyLocation = req.body.companyLocation;
  if (req.body.companyPhone) updates.companyPhone = req.body.companyPhone;
  if (req.body.companyDelivery) updates.companyDelivery = req.body.companyDelivery;
  if (req.body.companyDetails) updates.companyDetails = req.body.companyDetails;

  try {

    const updatedCompany = await Company.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, useFindAndModify: false });

    res.send(updatedCompany);

  } catch (e) {
    res.status(400).send(e.message);
  }

});


// DELETE company
router.delete('/:companyId', authenticateUser, async (req, res) => {

  const { companyId: id } = req.params;

  try {
    const company = await Company.findOneAndDelete({_id: id, "companyOwner.ownerId": req.user._id});

    if (!company) {
      return res.status(404).send('Company not found');
    }

    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { companiesOwnes: company.companyName } },
      { new: true, useFindAndModify: false }
    );

    res.send(company);

  } catch (e) {
    res.status(400).send(e);
  }
  
});



// SEARCH FOR company by name

// SEACH FOR company by address

// FILTER AND SORT


// FIND all companies nearby
router.get('/all/near-me/:lng/:lat/:maxDistance/:minDistance?', async (req, res) => {

  try {

    const { lng, lat, maxDistance, minDistance = 0 } = req.params;
    const result = validateSpatialQuerySearch(req.params);

    if ( result !== null ) {
      throw Error( result );
    }

    const companies = await Company.find({
      companyLocation: {
       $near: {
        $maxDistance: maxDistance,
        $minDistance: minDistance,
        $geometry: {
         type: 'Point',
         coordinates: [ lng, lat ]
        }
       }
      }
    });

    res.send(companies);

  } catch (e) {
    res.status(400).send(e.message);
  }

});



// ADD food item
router.put('/add-food-item/:companyId', authenticateUser, async (req, res) => {

  const { companyId: id } = req.params;

  try {

    const company = await Company.findOneAndUpdate(
      { _id: id },
      { $push: { companyProducts: req.body } },
      { new: true, useFindAndModify: false });

    res.send(company);

  } catch (e) {
    res.status(400).send(e.message);
  }

});


// UPDATE food item
router.patch('/update-food-item/:companyId/:itemId', authenticateUser, async (req, res) => {

  const { companyId: id, itemId } = req.params;

  try {

    const company = await Company.findOneAndUpdate(
      { _id: id },
      { $set: { companyProducts: { 
        _id: itemId,
        foodName: req.body.foodName || foodName 
        } }
      },
      { new: true, useFindAndModify: false });

    res.send(company);

  } catch (e) {
    res.status(400).send(e.message);
  }

});


// REMOVE food item
router.put('/remove-food-item/:companyId/:itemId', authenticateUser, async (req, res) => {

  const { companyId: id, itemId } = req.params;

  try {

    const company = await Company.findOneAndUpdate(
      { _id: id },
      { $pull: { companyProducts: { _id: itemId } } },
      { new: true, useFindAndModify: false });

    res.send(company);

  } catch (e) {
    res.status(400).send(e.message);
  }

});


module.exports = router;
