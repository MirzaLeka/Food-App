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
router.patch('/:companyId', authenticateUser, async (req, res) => {

  const { companyId: id } = req.params;
  const 
    { companyName, companyEmail,
      companyLocation, companyPhone,
      deliveryUpdates, detailsUpdates
    } = req.body;

  try {

    const updatedCompany = await Company.findOneAndUpdate(
      {_id: id},
      {$set: {
        companyName, companyEmail,
        companyLocation, companyPhone,
        companyDelivery: deliveryUpdates,
        companyDetails: detailsUpdates
      }},
      {new: true, useFindAndModify: false});

    res.send(updatedCompany);

  } catch (e) {
    res.status(400).send(e.message);
  }


  // const updates = Object.keys(req.body);

  // const allowedUpdates = ['companyName', 'companyEmail', 'companyPhone', 'companyAddress'];
  // const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  // if (!isValidOperation) {
  //     return res.status(400).send({ error: 'Invalid updates!' })
  // }

  // try {
  //     updates.forEach((update) => req.user[update] = req.body[update]);
  //     await req.user.save();
  //     res.send(req.user);
  // } catch (e) {
  //     res.status(400).send(e);
  // }
});


// DELETE company
router.delete('/:companyId', authenticateUser, async (req, res) => {

  const { companyId: id } = req.params;

  try {
    const company = await Company.findOneAndDelete({_id: id, "companyOwner.ownerId": req.user._id});

    if (!company) {
      return res.status(404).send();
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


// // UPDATE your company details
// router.put('/update-company-details/:companyId', authenticateUser, async (req, res) => {

//   const { companyId: id } = req.params;
//   const { deliveryUpdates, detailsUpdates } = req.body;

//   try {

//     const updatedCompany = await Company.findOneAndUpdate(
//       {_id: id},
//       {$set: {
//         companyDelivery: deliveryUpdates,
//         companyDetails: detailsUpdates
//       }},
//       {new: true, useFindAndModify: false});

//     res.send(updatedCompany);

//   } catch (e) {
//     res.status(400).send(e.message);
//   }

// });



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


// ADD 
// UPDATE 
// DELETE 
// SEE ALL FOOD ITEMS


module.exports = router;
