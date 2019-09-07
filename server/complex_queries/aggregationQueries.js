
const queryBySearchText = (searchText, sort, limit) => [
  { $match: { companyName: searchText } },
  { $sort: { companyName: sort } },
  { $limit: limit }
];

const queryByCategoryName = (cuisinesList, sort, limit) => [
  { $match: { 'cuisines.categoryName' : { $in : cuisinesList } } },
  { $sort: { companyName: sort } },
  { $limit: limit }
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
  { $limit: limit }
];


module.exports = {
  queryBySearchText,
  queryByCategoryName,
  queryBySearchTextAndCategoryName
};
