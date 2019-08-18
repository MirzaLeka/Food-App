const fetch = require('node-fetch');

module.exports.geocodeAddress = async address => {

  address = encodeURIComponent(address);
  const { GOOGLE_GEOCODE_KEY } = process.env;

  try {

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_GEOCODE_KEY}`)
    return await response.json();

  } catch(e) {
    console.log(e);
  } 

}
    
