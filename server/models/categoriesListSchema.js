const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesListSchema = new Schema({
  categoryName: { 
    type: String,
    trim: true,
    minlength: [3, 'Categoory name requires at least 3 characters'],
    required: [true, 'Categoory name is field required']
  }
}); 

const CategoriesList = mongoose.model('categoriesList', CategoriesListSchema);
module.exports = CategoriesList;
