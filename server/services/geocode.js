const axios = require('axios');

const { GOOGLE_GEOCODE_KEY } = process.env;

module.exports.geocodeAddress = async address => {

  address = encodeURIComponent(address);

  try {

    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_GEOCODE_KEY}`);
    return response.data.results[0].geometry.location;

  } catch(e) {
    throw Error(e);
  } 

}


module.exports.reverseGeoCode = async (lat, lng) => {

  try {

    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_GEOCODE_KEY}`);
    const fullLocation = response.data.results[0].formatted_address.split(',')
    return fullLocation[0];

  } catch(e) {
    throw Error(e);
  } 

}
    
