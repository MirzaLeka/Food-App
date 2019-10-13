
const queryBySortOptions = (sortParam, sortValue, limit, skip) => [
  { $match: { } },
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
  { $skip: skip },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, '_id': 0 } 
  }
];


const queryBySearchText = (searchText, sortParam, sortValue, limit, skip) => [
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
  { $skip: skip },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, '_id': 0 } 
  }
];


const queryByCategoryName = (cuisinesList, sortParam, sortValue, limit, skip) => [
  { $match: { 'cuisines.categoryName' : { $in : cuisinesList } } },
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
  { $skip: skip },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, '_id': 0 } 
  }
];


const queryBySearchTextAndCategoryName = (searchText, cuisinesList, sortParam, sortValue, limit, skip) => [
  { 
    $match: {
      $and: [ 
        { companyName: searchText }, 
        { 'cuisines.categoryName' : { $in : cuisinesList } }, 
      ]
    }
  },
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
  { $skip: skip },
  { $limit: limit },
  { $project: { 
    'companyName': 1, 'companyDescription': 1,
    'companyAvatar': 1, 'companyPath': 1,
    'companyRating': 1, '_id': 0 } 
  }
];


module.exports = {
  queryBySearchText,
  queryByCategoryName,
  queryBySearchTextAndCategoryName,
  queryBySortOptions
};
