const router = require('express').Router();
const Company = require('../Models/companySchema');
const { geocodeAddress } = require('../services/geocode');

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
        coordinates: [lat, lng], // should i switch these ?
        companyAddress,
      },
      companyPhone,
      companyPassword
    });

    await company.save();
    res.send(company);    

  } catch (e) {
    res.status(400).send(e.message);
  }

});

router.get('/all', async (req, res) => {

  try {
    const allCompanies = await Company.find({});
    res.send(allCompanies);
  } catch (e) {
    res.status(400).send();
  }
  
}); 


router.get('/all/near-me/:lng/:lat/:maxDistance/:minDistance?', async (req, res) => {

  const { lng, lat, maxDistance, minDistance = 0 } = req.params;

  try {

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
    res.status(400).send(e);
  }

});

module.exports = router;
