
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


const getAllCompanies = async () => {

  try {

    const selection = 'companyName companyDescription companyAvatar companyPath -_id';

    const allCompanies = await Company.find({}).select(selection).limit(10);
    return allCompanies;

  } catch (e) {
    throw Error(e);
  }

}


const getCompanyByCompanyPath = async companyPath => {

  try {

    const company = await Company.findOne({ companyPath });

    if (!company) {
      throw Error('Company not found!');
    }

    return company;

  } catch (e) {
    throw Error(e);
  }

}

module.exports = { createCompany, getAllCompanies, getCompanyByCompanyPath }
