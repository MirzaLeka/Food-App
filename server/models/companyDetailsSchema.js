const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyDetailsSchema = new Schema({
  companyAvatar: {
    type: Buffer,
    required: false
  },
  companyDescription: {
    type: String,
    required: false
  },
  companyRating: {
    type: Number,
    required: false
  },
});

module.exports = CompanyDetailsSchema;
