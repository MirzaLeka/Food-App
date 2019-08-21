const router = require('express').Router();
const Company = require('../models/companySchema');

const { geocodeAddress } = require('../services/geocode');
const { validateSpatialQuerySearch } = require('../validation/validateCompanyController');
const { authenticateCompany } = require('../middlewares/authenticateCompany');
const { sendEmail } = require('../services/sendEmail');

const randomstring = require('randomstring');

// REGISTER new company
router.post('/create', async (req, res) => {

  try {

    const { 
      companyName,
      companyEmail,
      companyAddress,
      companyPhone,
      companyPassword,
    } = req.body;

    const { lat, lng } = await geocodeAddress(companyAddress);
    
    const company = new Company({
      companyName,
      companyEmail,
      companyLocation: {
        type: 'Point',
        coordinates: [lat, lng],
        companyAddress,
      },
      companyPhone,
      companyPassword
    });

    await company.save();
    const token = await company.generateAuthToken();
    res.header('x-auth', token).send(company);


  } catch (e) {
    res.status(400).send(e.message);
  }

});


// LOG IN as company
router.post('/login', async (req, res) => {
  
  try {
    const { companyEmail, companyPassword } = req.body;
    const company = await Company.findByCredentials(companyEmail, companyPassword);
    const token = await company.generateAuthToken();

    res.header('x-auth', token).send(company);

  } catch (e) {
    res.status(400).send(e);
  }

});


// LOG OUT as company
router.delete('/logout', authenticateCompany, async (req, res) => {
  try {
    await req.company.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }

});


// SEE your company details
router.get('/company/me', authenticateCompany, (req, res) => {
  res.send(req.company);
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
router.patch('/company/me', authenticateCompany, async (req, res) => {
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
router.put('/update-company-details/:companyId', authenticateCompany, async (req, res) => {

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


// REQUEST Password Reset
router.put('/request-reset', async (req, res) => {
  
  const { companyEmail } = req.body;

  const randomLength = Math.floor(Math.random() * 20) + 10;
  const authString = randomstring.generate(randomLength);

  try {

    const comany = await Company.findOneAndUpdate(
      { companyEmail }, 
      { $set: { authString } },
      { new: true, useFindAndModify: false } );

    if (!comany) {
      return res.sendStatus(404);
    }

    const { companyName } = company;

    sendEmail( companyName, companyEmail, authString, 'request password reset', null);
    res.send(comany);

  } catch (e) {
    res.status(400).send(e.message);
  }

});


// CHECK authString
router.put('/check-auth-string', async (req, res) => {
  
  const { companyEmail, authString } = req.body;

  try {
  
    const company = await Company.findOneAndUpdate(
      { companyEmail, authString }, 
      { $set: { authString: '' } },
      { new: true, useFindAndModify: false } );

    if (!company) {
      return company.sendStatus(404);
    }  

    res.send(company);

  } catch (e) {
    res.status(400).send(e.message);
  }

});


// RESET password
router.patch('/company/me/password', async (req, res) => {

  const { companyEmail, companyPassword } = req.body;

  try {
  
    const company = await Company.findOne({companyEmail});

    if (!company) {
      return res.sendStatus(404);
    }  

    company.companyPassword = companyPassword;

    await company.save();
    res.send(company);

  } catch (e) {
    res.status(400).send(e.message);
  }

});


module.exports = router;
