const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupportTicketSchema = new Schema({
  title: {
    type: String,
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters'],
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email field is required'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    required: true
  },
  avatar: {
    type: String,
    required: false
  }
});

const SupportTicket = mongoose.model('foodItem', SupportTicketSchema);

module.exports = SupportTicket;
