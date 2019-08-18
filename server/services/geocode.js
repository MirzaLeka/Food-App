const axios = require('axios');

module.exports.geocodeAddress = async address => {

  address = encodeURIComponent(address);
  const { GOOGLE_GEOCODE_KEY } = process.env;

  try {

    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_GEOCODE_KEY}`);
    return response.data.results[0].geometry.location;

  } catch(e) {
    console.log(e);
  } 

}
    
