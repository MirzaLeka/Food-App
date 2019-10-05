const router = require('express').Router();
const { s3, AWS_BUCKET } = require('../services/awsSetup');
const sharp = require('sharp')

const Company = require('../models/companySchema');
const User = require('../models/userSchema');
const CategoriesList = require('../models/categoriesListSchema');
const TrendingItems = require('../models/trendingFoodItems');

const { geocodeAddress, reverseGeoCode } = require('../services/geocode');
const { generateRandomString } = require('../services/generateRandom');
const { imageUpload } = require('../services/uploadFile');

const { authenticateUser } = require('../middlewares/authenticateUser');
const { validateSpatialQuerySearch, validateObjectID, validateSpatialQueryRequiredFields } = require('../validation/validateCompanyController');
const { queryBySearchText, queryByCategoryName, queryBySearchTextAndCategoryName, queryBySortOptions } = require('../complex_queries/searchForCompany');
const { queryByGeoLocation, queryByGeoLocationAndPaginate, queryByGeoLocationAndCategoryName } = require('../complex_queries/searchNearMe');

let { companyDTO } = require('../dto/companyDTO');
const { validateCreateCompany } = require('../bll/companyBLL');
const { createCompany, getAllCompanies, getCompanyByCompanyPath } = require('../dal/companyDAL');


// Create new company
router.post('/', authenticateUser, async (req, res) => {

  try {

    companyDTO = req.body;  

    const output = validateCreateCompany(companyDTO);

    if (output !== null) {
      throw Error(output);
    }

    const newCompany = await createCompany(companyDTO, req.user._id, req.user.username);

    res.send(newCompany);

  } catch (e) {
    res.status(400).send({ error: e.message });
  }

});


// SEE all companies
router.get('/', async (req, res) => {

  try {

    const allCompanies = await getAllCompanies();
    res.send(allCompanies);

  } catch (e) {
    res.status(400).send({ error: e.message });
  }
  
}); 


// SEE one company
router.get('/:companyPath', async (req, res) => {

  try {

    const { companyPath } = req.params;

    const company = await getCompanyByCompanyPath(companyPath);
    res.send(company);

  } catch (e) {
    if (e.message.includes('not found')) {
      res.status(404).send({ error: e.message });
    } else {
      res.status(400).send({ error: e.message });
    }
    
  }
  
}); 


// UPDATE company
router.put('/:companyId', authenticateUser, async (req, res) => {

  try {

    const { companyId: id } = req.params;
    const { companyName, companyEmail, companyPhone, deliveryDetails, companyDetails } = req.body;

    const result = validateObjectID(id);
    if ( result === false ) {
      throw Error(`Invalid id: ${id}`);
    }
    

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

    const updatedCompany = await Company.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, useFindAndModify: false });

    res.send(updatedCompany);

  } catch (e) {
    res.status(400).send({ error: e.message });
  }

});


// DELETE company
router.delete('/:companyId', authenticateUser, async (req, res) => {

  try {

    const { companyId: id } = req.params;

    const result = validateObjectID(id);
    if ( result === false ) {
      throw Error(`Invalid id: ${id}`);
    }

    const company = await Company.findOneAndDelete({_id: id, 'companyOwner.ownerId': req.user._id});

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
    res.status(400).send({ error: e.message });
  }
  
});


// SEARCH for company
router.post('/search', async (req, res) => {

  try {

    const { companyName, categories = [], sortOptions = [], limit = 10 } = req.body;
    let [ sortParam = 'Rated', sortValue = 1 ] = sortOptions;

    sortParam = sortParam.toLowerCase().includes('rated') ? 'byRating' : 'byName';

    let company;
    const selection = 'companyName companyDescription companyAvatar companyPath companyRating -_id';

    if ( categories.length === 0 && sortOptions.length === 0 && !companyName ) {
      company = await Company.find({}).select(selection).limit(limit);

    } else if ( categories.length === 0 && !companyName ) {
      company = await Company.aggregate(queryBySortOptions(sortParam, sortValue, limit));

    } else if ( !companyName ) {
      company = await Company.aggregate(queryByCategoryName(categories, sortParam, sortValue, limit));
    }

    else {
      const includesChar =  companyName + '{1,}';
      const searchText = new RegExp(includesChar, 'i');

      if ( categories.length === 0 && companyName ) {
        company = await Company.aggregate(queryBySearchText(searchText, sortParam, sortValue, limit));

      } else { 
        company = await Company.aggregate(queryBySearchTextAndCategoryName(searchText, categories, sortParam, sortValue, limit));
        
      }
    }

    res.send(company);

  } catch (e) {
    res.status(400).send({ error: e.message });
  }

});


router.post('/get/my/current/location/', async (req, res) => {
  
  try {

    const { lat, lng } = req.body;

    if (!lat || !lng) {
      throw Error('User\'s location is requried!');
    }

    const address = await reverseGeoCode(lat, lng);
    res.send({ address });

  } catch (e) {
    res.status(400).send({ error: e.message });
  }
})


// SEARCH for companies nearby
router.post('/search/near-me/', async (req, res) => {

  try {

    const { address, maxDistance, minDistance = 0, categories = [], sortOptions = [], limit = 10 } = req.body;
    let [ sortParam = 'Rated', sortValue = 1 ] = sortOptions;

    sortParam = sortParam.toLowerCase().includes('rated') ? 'byRating' : 'byName';

    const output = validateSpatialQueryRequiredFields(req.body);

    if (output !== null) {
      throw Error(output);
    }

    const { lat, lng } = await geocodeAddress(address);
    const result = validateSpatialQuerySearch({maxDistance, minDistance, lat, lng});

    if (result !== null) {
      throw Error(result);
    }

    let company;

    if ( categories.length === 0 && sortOptions.length === 0 ) {
      company = await Company.aggregate(queryByGeoLocationAndPaginate(lat, lng, maxDistance, minDistance, limit)); 
     
    } else if ( categories.length === 0 ) {
      company = await Company.aggregate(queryByGeoLocation(lat, lng, sortParam, sortValue, maxDistance, minDistance, limit)); 

    } else {
      company = await Company.aggregate(queryByGeoLocationAndCategoryName(lat, lng, sortParam, sortValue, maxDistance, minDistance, categories, limit));
    }

    res.send(company);

  } catch (e) {
    res.status(400).send({ error: e.message });
  }

});



// SEE all categories
router.get('/categories/all', async (req, res) => {

  try {
    const allCategories = await CategoriesList.find({}).distinct('categoryName');
    res.send(allCategories);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
  
}); 



// ADD category
router.put('/add-category/:companyId', authenticateUser, async (req, res) => {

  try {

    const { companyId: id } = req.params;
    const { categoryName } = req.body;
  
    const result = validateObjectID(id);
    if ( result === false ) {
      throw Error(`Invalid id: ${id}`);
    }

    const company = await Company.findOneAndUpdate(
      { _id: id },
      { $push: { cuisines: req.body } },
      { new: true, useFindAndModify: false });

    const categoriesList = new CategoriesList({ categoryName });
    await categoriesList.save();

    res.send(company);

  } catch (e) {
    res.status(400).send({ error: e.message });
  }

});


// REMOVE Category
router.put('/remove-category/:companyId/:categoryId', authenticateUser, async (req, res) => {

  try {

    const { companyId: id, categoryId } = req.params;

    const result1 = validateObjectID(id);
    const result2 = validateObjectID(categoryId);
  
    if ( result1 === false || result2 === false ) {
      throw Error(`One or more ids are invalid.`);
    }

    const company = await Company.findOneAndUpdate(
      { _id: id },
      { $pull: { cuisines: { _id: categoryId } } },
      { new: true, useFindAndModify: false });

    res.send(company);

  } catch (e) {
    res.status(400).send({ error: e.message });
  }

});


// ADD item to category
router.patch('/add-food-item/:companyId/:categoryId', authenticateUser, async (req, res) => {

  try {

    const { companyId: id, categoryId } = req.params;

    const result1 = validateObjectID(id);
    const result2 = validateObjectID(categoryId);
  
    if ( result1 === false || result2 === false ) {
      throw Error(`One or more ids are invalid.`);
    }

    const company = await Company.findOneAndUpdate(
      { _id: id, 'cuisines._id': categoryId }, 
      { $push: { 'cuisines.$.categoryProducts': req.body } },
      { new: true, useFindAndModify: false });


    const { companyName, companyPath } = company;
    const trendingItem = { ...req.body, companyName, companyPath };
    
    await TrendingItems.create(trendingItem);

    res.send(company);

  } catch (e) {
    res.status(400).send({ error: e.message });
  }

});


// REMOVE item from category
router.patch('/remove-food-item/:companyId/:categoryId/:itemId', authenticateUser, async (req, res) => {

  try {

    const { companyId: id, categoryId, itemId } = req.params;

    const result1 = validateObjectID(id);
    const result2 = validateObjectID(categoryId);
    const result3 = validateObjectID(itemId);
  
    if ( result1 === false || result2 === false || result3 === false ) {
      throw Error(`One or more ids are invalid.`);
    }

    const company = await Company.findOneAndUpdate(
      { _id: id, 'cuisines._id': categoryId }, 
      { $pull: { 'cuisines.$.categoryProducts': { _id: itemId } } },
      { new: true, useFindAndModify: false });

    res.send(company);

  } catch (e) {
    res.status(400).send({ error: e.message });
  }

});


// GET n random (trending) food items
router.get('/trending/food/items', async (req, res) => {
  
  try {

    const trendingItems = await TrendingItems.aggregate([ { $sample: { size: 4 } } ]);
    res.send(trendingItems);

  } catch (e) {
    res.status(400).send({ error: e.message })
  }

});


// UPLOAD avatar for anything
router.post('/upload/single/image', authenticateUser, imageUpload.single('avatar'), async (req, res) => {

  try {

    const buffer = await sharp(req.file.buffer).resize({ width: 640, height: 480 }).png().toBuffer();
    const fileName = `${req.user._id}/${generateRandomString(30, 15)}.png`;
  
    const params = {
      Body: buffer,
      Bucket: AWS_BUCKET,
      ContentType: 'image/png',
      Key: fileName
    };
  
    await s3.upload(params).promise();
    
    res.send({ message: 'Upload successful!', fileName })

  } catch (e) {
    res.status(400).send({ error: e.message });
  }

}, (e, req, res, next) => {
  res.status(400).send({ error: e.message });
});


module.exports = router;
