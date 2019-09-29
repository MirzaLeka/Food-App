const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyDetailsSchema = new Schema({
  openHours: {
    type: [ {} ],
    required: false
  }
});

module.exports = CompanyDetailsSchema;
