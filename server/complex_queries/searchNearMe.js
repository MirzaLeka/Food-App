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


const queryByGeoLocationOnWorldMap = (lat, lng, maxDistance, minDistance) => [
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [ lat, lng ] },
      distanceField: 'dist.calculated',
      maxDistance,
      minDistance,
      spherical: true
    },
  },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, 'dist.calculated': 1, 
    'companyLocation.coordinates': 1, '_id': 1 } 
  }
];


const queryByGeoLocationAndCategoryNameOnWorldMap = (lat, lng, maxDistance, minDistance, cuisinesList) => [
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
  queryByGeoLocationAndCategoryName,
  queryByGeoLocationOnWorldMap,
  queryByGeoLocationAndCategoryNameOnWorldMap
};
