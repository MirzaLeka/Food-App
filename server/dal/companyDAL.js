
const Company = require('../models/companySchema');
const User = require('../models/userSchema');

const { geocodeAddress } = require('../services/geocode');
const { generateCompanyPath } = require('../services/formatString');

const createCompany = async (companyDTO, userId, username) => {

  try {

    const { 
      companyName,
      companyEmail,
      companyAddress,
      companyPhone,
      companyDescription,
      companyAvatar
    } = companyDTO; 
    
    const { lat, lng } = await geocodeAddress(companyAddress);
        
    const company = new Company({
      companyName,
      companyEmail,
      companyPhone,
      companyDescription,
      companyAvatar,
      companyLocation: {
        type: 'Point',
        coordinates: [lat, lng],
        companyAddress
      },
      companyOwner: {
        ownerId: userId,
        ownerUsername: username
      },
      companyPath: generateCompanyPath(companyName)
    });
    
    const newCompany = await company.save();
    
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { companiesOwnes: companyName } },
      { new: true, useFindAndModify: false }
    );
    
    return newCompany;

  } catch (e) {
    throw Error(e);
  }

}

module.exports = { createCompany }
