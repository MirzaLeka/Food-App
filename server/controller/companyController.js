const router = require('express').Router();
const Company = require('../models/companySchema');

const { geocodeAddress } = require('../services/geocode');
const { validateSpatialQuerySearch } = require('../validation/validateCompanyController');
const { authenticateUser } = require('../middlewares/authenticateUser');

// REGISTER new company
router.post('/new', authenticateUser, async (req, res) => {

  try {

    const { 
      companyName,
      companyEmail,
      companyAddress,
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
        companyAddress,
      }
    });

    await company.save();

    // user.companiesOwms++

    res.send(company);

  } catch (e) {
    res.status(400).send(e.message);
  }

});



// SEE all companies
router.get('/all', async (req, res) => {

  try {
    const allCompanies = await Company.find({});
    res.send(allCompanies);
  } catch (e) {
    res.status(400).send();
  }
  
}); 


// UPDATE your company profile
router.patch('/company/me', authenticateUser, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['companyName', 'companyEmail', 'companyPassword', 'companyPhone', 'companyAddress'];
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


// UPDATE your company details
router.put('/update-company-details/:companyId', authenticateUser, async (req, res) => {

  const { companyId: id } = req.params;
  const { deliveryUpdates, detailsUpdates } = req.body;

  try {

    const updatedCompany = await Company.findOneAndUpdate(
      {_id: id},
      {$set: {
        companyDelivery: deliveryUpdates,
        companyDetails: detailsUpdates
      }},
      {new: true, useFindAndModify: false});

    res.send(updatedCompany);

  } catch (e) {
    res.status(400).send(e.message);
  }

});

// DELETE Company
// user.companiesOwms++


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


module.exports = router;
