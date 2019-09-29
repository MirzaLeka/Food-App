
const queryBySearchText = (searchText, sortParam, sortValue, limit) => [
  { $match: { companyName: searchText } },
  { $addFields: {  
      'sortField': {
        $cond: {
          if: { $eq : [ sortParam, 'byRating' ] }, 
          then: '$companyRating',
          else: '$companyName' 
        }
      }
    }
  },
  { $sort: { sortField: sortValue } },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, '_id': 0 } 
  }
];

const queryByCategoryName = (cuisinesList, sort, limit) => [
  { $match: { 'cuisines.categoryName' : { $in : cuisinesList } } },
  { $sort: { companyName: sort } },
  { $limit: limit },
  { $project: { 'companyName': 1, 'companyDescription': 1, 'companyAvatar': 1, 'companyPath': 1, '_id': 0 } }
];

const queryBySearchTextAndCategoryName = (searchText, cuisinesList, sort, limit) => [
  { 
    $match: {
      $and: [ 
        { companyName: searchText }, 
        { 'cuisines.categoryName' : { $in : cuisinesList } }, 
      ]
    }
  },
  { $sort: { companyName: sort } },
  { $limit: limit },
  { $project: { 'companyName': 1, 'companyDescription': 1, 'companyAvatar': 1, 'companyPath': 1, '_id': 0 } }
];


module.exports = {
  queryBySearchText,
  queryByCategoryName,
  queryBySearchTextAndCategoryName
};
