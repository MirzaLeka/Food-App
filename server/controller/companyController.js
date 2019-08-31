const router = require('express').Router();
const Company = require('../models/companySchema');
const User = require('../models/userSchema');
const CategoriesList = require('../models/categoriesListSchema');

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
  const { companyName, companyEmail, companyPhone, deliveryDetails, companyDetails } = req.body;

  let updates = {};

  if (companyName) updates.companyName = companyName;
  if (companyEmail) updates.companyEmail = companyEmail;
  if (companyPhone) updates.companyPhone = companyPhone;
  if (deliveryDetails) updates.deliveryDetails = deliveryDetails;
  if (companyDetails) updates.companyDetails = companyDetails;
 
  if (companyLocation) {
    const { companyAddress } = companyLocation;
    const { lat, lng } = await geocodeAddress(companyAddress);

    companyLocation.type = 'Point';
    companyLocation.companyAddress = companyAddress;
    companyLocation.coordinates = [lat, lng];

    updates.companyLocation = companyLocation;
  }

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



// ADD category
router.put('/add-food-item/:companyId', authenticateUser, async (req, res) => {

  const { companyId: id } = req.params;
  const { categoryName } = req.body;

  try {

    // const company = await Company.findOneAndUpdate(
    //   { _id: id },
    //   { $push: { companyProducts: req.body } },
    //   { new: true, useFindAndModify: false });

    const company = await Company.findOneAndUpdate(
      { _id: id },
      { $push: { cuisines: req.body } },
      { new: true, useFindAndModify: false });

    const categoriesList = new CategoriesList({ categoryName });
    await categoriesList.save();

    res.send(company);

  } catch (e) {
    res.status(400).send(e.message);
  }

});


// ADD item to category
router.patch('/add-food-item/:companyId/:categoryId', authenticateUser, async (req, res) => {

  const { companyId: id, categoryId } = req.params;

  try {

    // const c = await Company.findOne({ _id: id }).select('companyCategories');
    // console.log(c);

    // const d = await c.findOne({ _id: categoryId });
    // console.log(d);

    // const company = await Company.findOneAndUpdate(
    //   { _id: id, 'companyCategories._id': categoryId },
    //   { $push: { categoryProducts: req.body } },
    //   { new: true, useFindAndModify: false });

    // const company = await Company.findOne(
    //   { _id: id }, 
    //   { 'companyCategories.categoryProducts': [] },
    //   { $push:  { categoryProducts: req.body  } }
    //   // { 'companyCategories.categoryName': 'Pasta' }
    //   // { 'companyCategories.categoryName': 'Pasta', 'companyCategories._id': '5d69b6ee8d42c83774d26787' });
    // );

    // const company = await Company.aggregate(
    //   [
    //     // Match the document containing the array element
    //     { "$match": { "companyCategories._id" : categoryId } },
    //   ]
    // );

    const company = await Company.findOneAndUpdate(
      { 
      // _id: id,
      'cuisines._id': categoryId
      }, {
      $push: { 'cuisines.$.categoryProducts': req.body }
      },
      { new: true, useFindAndModify: false }
    
    )

    res.send(company);

  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }

});



// UPDATE food item
// router.patch('/update-food-item/:companyId/:itemId', authenticateUser, async (req, res) => {

//   const { companyId: id, itemId } = req.params;

//   try {

//     const company = await Company.findOneAndUpdate(
//       { _id: id },
//       { $set: { companyProducts: { 
//         _id: itemId,
//         foodName: req.body.foodName || foodName 
//         } }
//       },
//       { new: true, useFindAndModify: false });

//     res.send(company);

//   } catch (e) {
//     res.status(400).send(e.message);
//   }

// });


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
