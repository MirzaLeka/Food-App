
const queryBySearchText = (searchText, sort, limit) => [
  { $match: { companyName: searchText } },
  { $sort: { companyName: sort } },
  { $limit: limit },
  { $project: { 'companyName': 1, 'companyDescription': 1, 'companyAvatar': 1, 'companyPath': 1, '_id': 0 } }
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
