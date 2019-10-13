const queryByGeoLocation = (lat, lng, sortParam, sortValue, maxDistance, minDistance, limit, skip) => [
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [ lat, lng ] },
      distanceField: 'dist.calculated',
      maxDistance,
      minDistance,
      spherical: true
    },
  },
  { $addFields: {  
    'sortField': {
      $switch: {
        branches: [
          { case: { $eq: [ sortParam, 'byRating' ] }, then: '$companyRating' },
          { case: { $eq: [ sortParam, 'byName' ] }, then: '$companyName' }
        ],
        default: '$dist.calculated'
      }
    } }
  },
  { $sort: { sortField: sortValue } },
  { $skip: skip },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, 'dist.calculated': 1,
    'companyLocation.coordinates': 1, '_id': 1 } 
  }
];


const queryByGeoLocationAndPaginate = (lat, lng, maxDistance, minDistance, limit, skip) => [
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [ lat, lng ] },
      distanceField: 'dist.calculated',
      maxDistance,
      minDistance,
      spherical: true
    },
  },
  { $skip: skip },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, 'dist.calculated': 1, 
    'companyLocation.coordinates': 1, '_id': 1 } 
  }
];


const queryByGeoLocationAndCategoryName = (lat, lng, sortParam, sortValue, maxDistance, minDistance, cuisinesList, limit, skip) => [
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [ lat, lng ] },
      distanceField: 'dist.calculated',
      maxDistance,
      minDistance,
      spherical: true
    },
  },
  { $match: { 'cuisines.categoryName' : { $in : cuisinesList } } },
  { $addFields: {  
    'sortField': {
      $switch: {
        branches: [
          { case: { $eq: [ sortParam, 'byRating' ] }, then: '$companyRating' },
          { case: { $eq: [ sortParam, 'byName' ] }, then: '$companyName' }
        ],
        default: '$dist.calculated'
      }
    } }
  },
  { $sort: { sortField: sortValue } },
  { $skip: skip },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, 'dist.calculated': 1,
    'companyLocation.coordinates': 1, '_id': 1 } 
  }
];


module.exports = {
  queryByGeoLocation,
  queryByGeoLocationAndPaginate,
  queryByGeoLocationAndCategoryName
};
