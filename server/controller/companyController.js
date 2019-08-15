const router = require('express').Router();
const Company = require('../Models/companySchema');

router.post('/create', async (req, res) => {

  try {

    const { 
      companyName,
      companyEmail,
      companyAddress: { lat, long, address },
      companyPhone,
      companyPassword,
      averageDeliveryTime
    } = req.body;

    // samo sto ti neces passati lat i long nego adresu pa adresu konvertovati u lat i long

    /*
    {
  "companyName" : "company",
  "companyEmail": "companyr@email.com",
  "companyAddress": ["48", "17"],
  "companyPhone": 033123456,
  "companyPassword": "abcdefghijkl",
  "averageDeliveryTime": 90000
}*/

    const company = new Company({
      companyName,
      companyEmail,
      companyAddress: {
        type: 'Point',
        coordinates: [lat, long],
        address
      },
      companyPhone,
      companyPassword,
      averageDeliveryTime
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

module.exports = router;
