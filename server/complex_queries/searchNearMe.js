const queryByGeoLocation = (lat, lng, sortParam, sortValue, maxDistance, minDistance, limit) => [
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
      $cond: {
        if: { $eq : [ sortParam, 'byRating' ] }, 
          then: '$companyRating',
          else: '$companyName' 
      }
    } }
  },
  { $sort: { sortField: sortValue } },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, 'dist.calculated': 1, '_id': 1 } 
  }
];


const queryByGeoLocationAndPaginate = (lat, lng, maxDistance, minDistance, limit) => [
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [ lat, lng ] },
      distanceField: 'dist.calculated',
      maxDistance,
      minDistance,
      spherical: true
    },
  },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, 'dist.calculated': 1, '_id': 1 } 
  }
];


const queryByGeoLocationAndCategoryName = (lat, lng, sortParam, sortValue, maxDistance, minDistance, cuisinesList, limit) => [
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
      $cond: {
      if: { $eq : [ sortParam, 'byRating' ] }, 
        then: '$companyRating',
        else: '$companyName' 
      }
    } }
  },
  { $sort: { sortField: sortValue } },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, 'dist.calculated': 1, '_id': 1 } 
  }
];


module.exports = {
  queryByGeoLocation,
  queryByGeoLocationAndPaginate,
  queryByGeoLocationAndCategoryName
};
